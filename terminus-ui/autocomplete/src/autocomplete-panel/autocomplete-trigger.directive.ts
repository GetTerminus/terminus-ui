import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Host,
  Inject,
  InjectionToken,
  Input,
  isDevMode,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  isBoolean,
  isUnset,
  TsDocumentService,
} from '@terminus/ngx-tools';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { TsFormFieldComponent } from '@terminus/ui/form-field';
import { ControlValueAccessorProviderFactory } from '@terminus/ui/utilities';
import {
  defer,
  fromEvent,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import {
  delay,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  countGroupLabelsBeforeOption,
  getOptionScrollPosition,
  TsOptionSelectionChange,
  TsOptionComponent,
} from '@terminus/ui/option';

import { TsAutocompletePanelComponent } from './autocomplete-panel.component';


/**
 * The following style constants are necessary to save here in order to properly calculate the scrollTop of the panel.
 * Because we are not actually focusing the active item, scroll must be handled manually.
 */

// The height of each autocomplete option.
export const AUTOCOMPLETE_OPTION_HEIGHT = 48;

// The total height of the autocomplete panel
export const AUTOCOMPLETE_PANEL_HEIGHT = 256;

// Injection token that determines the scroll handling while the autocomplete panel is open
export const TS_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('mat-autocomplete-scroll-strategy');

export function TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: TS_AUTOCOMPLETE_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,
};

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A directive that adds autocomplete trigger functionality to an input. Used in {@link TsSelectComponent}.
 *
 * TODO: Convert all `getFoo()` functions into proper getters `get foo()`
 *
 * #### QA CSS CLASSES
 * - `qa-autocomplete-trigger`: The trigger input
 *
 * @example
 * <ts-input
 *              [tsAutocompleteTrigger]="myReferenceToAutocompletePanel"
 *              [tsAutocompleteDisabled]="false"
 *              autocomplete="off"
 *              [reopenAfterSelection]="false"
 * ></ts-input>
 */
@Directive({
  selector: '[tsAutocompleteTrigger]',
  host: {
    'class': 'ts-autocomplete-trigger qa-autocomplete-trigger',
    '[attr.autocomplete]': 'autocompleteAttribute',
    '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
    '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
    '[attr.aria-activedescendant]': 'activeOption?.id',
    '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
    '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocompletePanel?.id',
    // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
    // a little earlier. This avoids issues where IE delays the focusing of the input.
    '(focusin)': 'handleFocus()',
    '(blur)': 'onTouched()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [
    ControlValueAccessorProviderFactory<TsAutocompleteTriggerDirective>(TsAutocompleteTriggerDirective),
  ],
  exportAs: 'tsAutocompleteTrigger',
})
// tslint:disable-next-line no-any
export class TsAutocompleteTriggerDirective<ValueType = any> implements ControlValueAccessor, OnDestroy {
  /**
   * Whether the autocomplete can open the next time it is focused. Used to prevent a focused, closed autocomplete from being reopened if
   * the user switches to another browser tab and then comes back.
   */
  private canOpenOnNextFocus = true;

  /**
   * The subscription for closing actions (some are bound to document)
   */
  private closingActionsSubscription!: Subscription;

  /**
   * Stream of keyboard events that can close the panel
   */
  private readonly closeKeyEventStream = new Subject<void>();

  /*
   * Note: In some cases `openPanel` can end up being called after the component is destroyed. This flag is to ensure that we don't try to
   * run change detection on a destroyed view.
   */
  private componentDestroyed = false;

  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Whether or not the label state is being overridden
   */
  private manuallyFloatingLabel = false;

  /**
   * Stream of autocomplete option selections
   */
  public readonly optionSelections: Observable<TsOptionSelectionChange> = defer(() => {
    if (this.autocompletePanel && this.autocompletePanel.options) {
      return merge(...this.autocompletePanel.options.map(option => option.selectionChange));
    }

    // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
    // Return a stream that we'll replace with the real one once everything is in place.
    return this.ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelections));
  });

  /**
   * Store whether the overlay is currently attached
   */
  private overlayAttached = false;

  /**
   * Store a reference to the overlay
   */
  public overlayRef: OverlayRef | null | undefined;

  /**
   * Old value of the native input
   *
   * NOTE: Used to work around issues with the `input` event on IE
   */
  private previousValue: string | number | null | undefined;

  /**
   * Store a reference to the portal
   */
  private portal: TemplatePortal | undefined;

  /**
   * Strategy that is used to position the panel
   */
  private positionStrategy!: FlexibleConnectedPositionStrategy;

  /**
   * The defined scroll strategy
   */
  private scrollStrategy: () => ScrollStrategy;

  /**
   * Subscription to viewport size changes
   */
  private viewportSubscription = Subscription.EMPTY;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-autocomplete-trigger-${nextUniqueId++}`;

  /**
   * GETTERS
   */

  /**
   * The currently active option, coerced to TsOptionComponent type
   */
  public get activeOption(): TsOptionComponent | null {
    if (this.autocompletePanel && this.autocompletePanel.keyManager) {
      return this.autocompletePanel.keyManager.activeItem;
    }

    return null;
  }

  /**
   * A stream of actions that should close the autocomplete panel, including when an option is selected, on blur, and when TAB is pressed.
   */
  public get panelClosingActions(): Observable<TsOptionSelectionChange | null> {
    return merge(
      this.optionSelections,
      this.autocompletePanel.keyManager.tabOut.pipe(filter(() => this.overlayAttached)),
      this.closeKeyEventStream,
      this.getOutsideClickStream(),
      this.overlayRef ? this.overlayRef.detachments().pipe(filter(() => this.overlayAttached)) : of(),
    ).pipe(
      // Normalize the output so we return a consistent type.
      map(event => (event instanceof TsOptionSelectionChange ? event : null)),
    );
  }

  /**
   * Whether or not the autocomplete panel is open
   */
  public get panelOpen(): boolean {
    return this.overlayAttached && this.autocompletePanel.showPanel;
  }

  /**
   * INPUTS
   */

  /**
   * The `autocomplete` attribute to be set on the input element.
   */
  // NOTE: Input has specific naming since it is accepting a standard HTML data attribute.
  // tslint:disable: no-input-rename
  @Input('autocomplete')
  public autocompleteAttribute = 'off';

  /**
   * Whether the autocomplete is disabled. When disabled, the element will act as a regular input and the user won't be able to open the
   * panel.
   */
  @Input('tsAutocompleteDisabled')
  public set autocompleteDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsAutocompleteTriggerDirective: "tsAutocompleteDisabled" value is not a boolean. `
      + `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._autocompleteDisabled = coerceBooleanProperty(value);
  }
  public get autocompleteDisabled(): boolean {
    return this._autocompleteDisabled;
  }
  private _autocompleteDisabled = false;

  /**
   * The autocomplete panel to be attached to this trigger
   */
  // Note: Renaming as prefixed name does not add clarity
  // tslint:disable: no-input-rename
  @Input('tsAutocompleteTrigger')
  public autocompletePanel!: TsAutocompletePanelComponent;
  // tslint:enable: no-input-rename

  /**
   * Define if the autocomplete panel should reopen after a selection is made
   */
  @Input()
  public set reopenAfterSelection(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsAutocompleteTriggerDirective: "reopenAfterSelection" value is not a boolean. `
      + `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._reopenAfterSelection = coerceBooleanProperty(value);
  }
  public get reopenAfterSelection(): boolean {
    return this._reopenAfterSelection;
  }
  private _reopenAfterSelection = false;


  constructor(
    public elementRef: ElementRef<HTMLInputElement>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
    private viewportRuler: ViewportRuler,
    // tslint:disable-next-line no-any
    @Inject(TS_AUTOCOMPLETE_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @Host() private formField: TsFormFieldComponent,
  ) {
    if (typeof window !== 'undefined') {
      ngZone.runOutsideAngular(() => {
        window.addEventListener('blur', this.windowBlurHandler);
      });
    }

    this.scrollStrategy = scrollStrategy;
    this.document = this.documentService.document;
  }


  /**
   * Clean up subscriptions and destroy the panel
   */
  public ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('blur', this.windowBlurHandler);
    }

    this.viewportSubscription.unsubscribe();
    this.componentDestroyed = true;
    this.destroyPanel();
    this.closeKeyEventStream.complete();
  }


  /**
   * Close the autocomplete suggestion panel
   *
   * @param overrideReopenFlag - Whether the panel should reopen
   */
  public closePanel(overrideReopenFlag?: boolean): void {
    this.resetLabel();

    if (!this.overlayAttached) {
      return;
    }

    if (this.panelOpen) {
      // Only emit if the panel was visible.
      this.autocompletePanel.closed.emit();
    }

    this.autocompletePanel.isOpen = this.overlayAttached = false;

    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.closingActionsSubscription.unsubscribe();
    }

    // Note that in some cases this can end up being called after the component is destroyed.
    // Add a check to ensure that we don't try to run change detection on a destroyed view.
    if (!this.componentDestroyed) {
      // We need to trigger change detection manually, because `fromEvent` doesn't seem to do it at the proper time.  This ensures that the
      // label is reset when the user clicks outside.
      this.changeDetectorRef.detectChanges();
    }

    if (this.reopenAfterSelection && !overrideReopenFlag) {
      this.openPanel();
    }
  }


  /**
   * Handle the focus event
   */
  public handleFocus(): void {
    if (!this.canOpenOnNextFocus) {
      this.canOpenOnNextFocus = true;
    } else if (this.canOpen()) {
      this.previousValue = this.elementRef.nativeElement.value;
      this.attachOverlay();
      this.floatLabel(true);
    }
  }


  /**
   * Handle input into the autocomplete trigger
   *
   * @param event - The keyboard event
   */
  public handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    let value: number | string | null = target.value;

    // Based on `NumberValueAccessor` from forms
    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }

    // If the input has a placeholder, IE will fire the `input` event on page load, focus and blur, in addition to when the user actually
    // changed the value. To filter out all of the extra events, we save the value on focus and between `input` events, and we check
    // whether it changed. See: https://connect.microsoft.com/IE/feedback/details/885747/
    if (this.previousValue !== value && this.document.activeElement === event.target) {
      this.previousValue = value;
      this.onChange(value);

      if (this.canOpen()) {
        this.openPanel();
      }
    }
  }


  /**
   * Handle keydown events
   *
   * @param event - The keyboard event
   */
  public handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.code;

    // Prevent the default action on all escape key presses. This is here primarily to bring IE in line with other browsers. By default,
    // pressing escape on IE will cause it to revert the input value to the one that it had on focus, however it won't dispatch any events
    // which means that the model value will be out of sync with the view.
    if (keyCode === KEYS.ESCAPE.code) {
      event.preventDefault();
    }

    if (this.activeOption && keyCode === KEYS.ENTER.code && this.panelOpen) {
      this.activeOption.selectViaInteraction();
      this.resetActiveItem();
      event.preventDefault();
    } else if (this.autocompletePanel) {
      const prevActiveItem = this.autocompletePanel.keyManager.activeItem;
      const isArrowKey = keyCode === KEYS.UP_ARROW.code || keyCode === KEYS.DOWN_ARROW.code;

      if (this.panelOpen || keyCode === KEYS.TAB.code) {
        this.autocompletePanel.keyManager.onKeydown(event);
      } else if (isArrowKey && this.canOpen()) {
        this.openPanel();
      }

      if (isArrowKey || this.autocompletePanel.keyManager.activeItem !== prevActiveItem) {
        this.scrollToOption();
      }
    }
  }


  /**
   * View -> model callback called when value changes
   */
  // tslint:disable-next-line no-any
  public onChange: (value: any) => void = () => {};


  /**
   * View -> model callback called when autocomplete has been touched
   */
  public onTouched = () => {};


  /**
   * Open the autocomplete suggestion panel
   */
  public openPanel(): void {
    this.attachOverlay();
    this.floatLabel();
  }


  /**
   * Register the onChange function
   *
   * NOTE: Implemented as part of ControlValueAccessor
   *
   * @param fn - The new onChange function
   */
  public registerOnChange(fn: (value: string) => {}): void {
    this.onChange = fn;
  }


  /**
   * Register the onTouched function
   *
   * NOTE: Implemented as part of ControlValueAccessor
   *
   * @param fn - The new onTouched function
   */
  public registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }


  /**
   * Set the disabled state
   *
   * NOTE: Implemented as part of ControlValueAccessor
   *
   * @param isDisabled - Whether the element should be set to disabled
   */
  public setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }


  /**
   * Function used to write the value by the model
   *
   * NOTE: Implemented as part of ControlValueAccessor
   *
   * @param value - The value to write
   */
  public writeValue(value: string): void {
    Promise.resolve(null).then(() => this.setTriggerValue(value));
  }


  /**
   * Attach the overlay
   */
  private attachOverlay(): void {
    if (!this.autocompletePanel && isDevMode()) {
      throw Error('TsAutocompleteTriggerDirective: Attempting to open an undefined instance of `ts-autocomplete-panel`.');
    }

    if (this.overlayRef) {
      // Update the panel width in case anything has changed
      this.overlayRef.updateSize({width: this.getPanelWidth()});
    } else {
      this.portal = new TemplatePortal(this.autocompletePanel.template, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());

      // Use the `keydownEvents` in order to take advantage of the overlay event targeting provided by the CDK overlay.
      this.overlayRef.keydownEvents().subscribe(event => {
        // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
        // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
        if (event.code === KEYS.ESCAPE.code || (event.code === KEYS.UP_ARROW.code && event.altKey)) {
          this.resetActiveItem();
          this.closeKeyEventStream.next();
        }
      });

      this.viewportSubscription = this.viewportRuler.change().subscribe(() => {
        if (this.panelOpen && this.overlayRef) {
          this.overlayRef.updateSize({width: this.getPanelWidth()});
        }
      });
    }

    const overlayNotAttached = !this.overlayRef.hasAttached();
    if (this.overlayRef && overlayNotAttached) {
      this.overlayRef.attach(this.portal);
      this.closingActionsSubscription = this.subscribeToClosingActions();
    }

    const wasOpen = this.panelOpen;
    this.autocompletePanel.setVisibility();
    this.autocompletePanel.isOpen = this.overlayAttached = true;

    // We need to do an extra `panelOpen` check in here, because the
    // autocomplete won't be shown if there are no options.
    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this.autocompletePanel.opened.emit();
    }
  }


  /**
   * Determine whether the panel can be opened
   */
  private canOpen(): boolean {
    const element = this.elementRef.nativeElement;
    return !element.readOnly && !element.disabled && !this.autocompleteDisabled;
  }


  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  private clearPreviousSelectedOption(skip: TsOptionComponent): void {
    this.autocompletePanel.options.forEach(option => {
      // istanbul ignore else
      // NOTE: Loose check (`!=`) needed for comparing classes
      // eslint-disable-next-line eqeqeq
      if (option != skip && option.selected) {
        option.deselect();
      }
    });
  }


  /**
   * Destroy the autocomplete suggestion panel
   */
  private destroyPanel(): void {
    // istanbul ignore else
    if (this.overlayRef) {
      this.closePanel();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }


  /**
   * In 'auto' mode, the label will animate down as soon as focus is lost.  This causes the value to jump when selecting an option with the
   * mouse. This method manually floats the label until the panel can be closed.
   *
   * @param shouldAnimate - Whether the label should be animated when it is floated
   */
  private floatLabel(shouldAnimate = false): void {
    if (this.formField && this.formField.floatLabel === 'auto') {
      if (shouldAnimate) {
        this.formField.animateAndLockLabel();
      } else {
        this.formField.floatLabel = 'always';
      }

      this.manuallyFloatingLabel = true;
    }
  }


  /**
   * Return the connected element
   *
   * @return The ElementRef
   */
  private getConnectedElement(): ElementRef {
    return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
  }


  /**
   * Returns the width of the input element, so the panel width can match it
   */
  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }


  /**
   * Create a config for an overlay
   *
   * @return The overlay config
   */
  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.scrollStrategy(),
      width: this.getPanelWidth(),
      direction: 'ltr',
    });
  }


  /**
   * Get the overlay position strategy
   *
   * @return The position strategy
   */
  private getOverlayPosition(): PositionStrategy {
    this.positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    return this.positionStrategy;
  }


  /**
   * Stream of clicks outside of the autocomplete panel
   *
   * @return The observable of clicks
   */
  // tslint:disable-next-line no-any
  private getOutsideClickStream(): Observable<any> {
    if (!this.document) {
      return of(null);
    }

    return merge(
      fromEvent<MouseEvent>(this.document, 'click'),
      fromEvent<TouchEvent>(this.document, 'touchend'),
    )
      .pipe(filter(event => {
        const clickTarget = event.target as HTMLElement;
        const formField = this.formField ?  this.formField.elementRef.nativeElement : null;

        return this.overlayAttached
              && clickTarget !== this.elementRef.nativeElement
              && (!formField || !formField.contains(clickTarget))
              && (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
      }));
  }


  /**
   * Return the panel width
   *
   * @return The width
   */
  private getPanelWidth(): number | string {
    return this.getHostWidth();
  }


  /**
   * Resets the active item to -1 so arrow events will activate the correct options, or to 0 if the consumer opted into it
   */
  private resetActiveItem(): void {
    this.autocompletePanel.keyManager.setActiveItem(-1);
  }


  /**
   * If the label has been manually elevated, return it to its normal state
   */
  private resetLabel(): void  {
    // istanbul ignore else
    if (this.manuallyFloatingLabel) {
      this.formField.floatLabel = 'auto';
      this.manuallyFloatingLabel = false;
    }
  }


  /**
   * Scroll to an option
   *
   * Given that we are not actually focusing active options, we must manually adjust scroll to reveal options below the fold. First, we find
   * the offset of the option from the top of the panel. If that offset is below the fold, the new scrollTop will be the offset - the panel
   * height + the option height, so the active option will be just visible at the bottom of the panel. If that offset is above the top of
   * the visible panel, the new scrollTop will become the offset. If that offset is visible within the panel already, the scrollTop is not
   * adjusted.
   */
  private scrollToOption(): void {
    const index = this.autocompletePanel.keyManager.activeItemIndex || 0;
    const labelCount = countGroupLabelsBeforeOption(index, this.autocompletePanel.options, this.autocompletePanel.optionGroups);

    const newScrollPosition = getOptionScrollPosition(
      index + labelCount,
      // FIXME: can this height be dynamic like the TsSelectComponent? https://github.com/GetTerminus/terminus-ui/issues/1153
      AUTOCOMPLETE_OPTION_HEIGHT,
      this.autocompletePanel.getScrollTop(),
      AUTOCOMPLETE_PANEL_HEIGHT,
    );

    this.autocompletePanel.setScrollTop(newScrollPosition);
  }


  /**
   * Set the value of the trigger
   *
   * @param value - The value to set
   */
  // tslint:disable-next-line no-any
  private setTriggerValue(value: any): void {
    const displayFn = this.autocompletePanel && this.autocompletePanel.displayWith;
    const toDisplay = displayFn ? displayFn(value) : value;

    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and should not fall back to an empty string.
    const inputValue = isUnset(toDisplay) ? toDisplay : '';

    // If it is used within a {@link TsFormFieldComponent}, we should set it through the property so it can go through change detection
    if (this.formField) {
      this.formField.control.value = inputValue;
    } else {
      this.elementRef.nativeElement.value = inputValue;
    }
  }


  /**
   * This method closes the panel, and if a value is specified, also sets the associated control to that value.
   * It will also mark the control as dirty if this interaction stemmed from the user.
   *
   * @param event - The event containing the option
   */
  private setValueAndClose(event: TsOptionSelectionChange): void {
    this.clearPreviousSelectedOption(event.source);
    this.setTriggerValue(event.source.value);
    this.onChange(event.source.value);
    this.elementRef.nativeElement.focus();
    this.autocompletePanel.emitSelectEvent(event.source);

    this.closePanel();
  }


  /**
   * This method listens to a stream of panel closing actions and resets the stream every time the option list changes
   *
   * @return The subscription
   */
  private subscribeToClosingActions(): Subscription {
    const firstStable = this.ngZone.onStable.asObservable().pipe(take(1));
    const optionChanges = this.autocompletePanel.options.changes.pipe(
      tap(() => this.positionStrategy.reapplyLastPosition()),
      // Defer emitting to the stream until the next tick, because changing bindings in here will cause "changed after checked" errors.
      delay(0),
    );

    // When the zone is stable initially, and when the option list changes...
    return merge(firstStable, optionChanges)
      .pipe(
        // Create a new stream of panelClosingActions, replacing any previous streams that were created, and flatten it so our stream only
        // emits closing events...
        switchMap(() => {
          this.resetActiveItem();
          this.autocompletePanel.setVisibility();

          return this.panelClosingActions;
        }),
        // When the first closing event occurs...
        take(1),
      )
      // Set the value, close the panel, and complete.
      .subscribe((event: TsOptionSelectionChange | null) => {
        if (event && event.source && event.source.value !== undefined) {
          this.setValueAndClose(event);
        }
      });
  }


  /**
   * Event handler for when the window is blurred.
   *
   * Needs to be an arrow function in order to preserve the context.
   */
  private windowBlurHandler = (): void => {
    // If the user blurred the window while the autocomplete is focused, it means that it'll be
    // refocused when they come back. In this case we want to skip the first focus event, if the
    // pane was closed, in order to avoid reopening it unintentionally.
    this.canOpenOnNextFocus = this.document.activeElement !== this.elementRef.nativeElement || this.panelOpen;
  }

}
