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
  EventEmitter,
  Host,
  Inject,
  InjectionToken,
  Input,
  isDevMode,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  isUnset,
  untilComponentDestroyed,
} from '@terminus/ngx-tools/utilities';
import { TsFormFieldComponent } from '@terminus/ui/form-field';
import {
  TsOptionComponent,
  TsOptionSelectionChange,
} from '@terminus/ui/option';
import {
  ControlValueAccessorProviderFactory,
  TsUILibraryError,
} from '@terminus/ui/utilities';
import {
  defer,
  merge,
  Observable,
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

import { TsSelectionListPanelComponent } from './selection-list-panel.component';


// Injection token that determines the scroll handling while the panel is open
export const TS_SELECTION_LIST_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('ts-selection-list-scroll-strategy');

export function TS_SELECTION_LIST_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const TS_SELECTION_LIST_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: TS_SELECTION_LIST_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: TS_SELECTION_LIST_SCROLL_STRATEGY_FACTORY,
};

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A directive that adds selection-list trigger functionality to an input
 *
 * @example
 * <input
 *              [tsSelectionListTrigger]="myReferenceToSelectionListPanel"
 *              [tsSelectionListDisabled]="false"
 *              autocomplete="off"
 *              [reopenAfterSelection]="false"
 * />
 */
@Directive({
  selector: '[tsSelectionListTrigger]',
  host: {
    'class': 'ts-selection-list-trigger',
    '[attr.autocomplete]': 'autocompleteAttribute',
    '[attr.role]': 'selectionListDisabled ? null : "combobox"',
    '[attr.aria-autocomplete]': 'selectionListDisabled ? null : "list"',
    '[attr.aria-activedescendant]': 'activeOption?.id',
    '[attr.aria-expanded]': 'selectionListDisabled ? null : panelOpen.toString()',
    '[attr.aria-owns]': '(selectionListDisabled || !panelOpen) ? null : selectionListPanel?.id',
    // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
    // a little earlier. This avoids issues where IE delays the focusing of the input.
    '(blur)': 'onTouched()',
    '(focusin)': 'handleFocus()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [
    ControlValueAccessorProviderFactory<TsSelectionListTriggerDirective>(TsSelectionListTriggerDirective),
  ],
  exportAs: 'tsSelectionListTrigger',
})
export class TsSelectionListTriggerDirective<ValueType = string> implements ControlValueAccessor, OnDestroy {
  /**
   * Whether the panel can open the next time it is focused. Used to prevent a focused, closed panel from being reopened if
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
  private readonly document: Document;

  /**
   * Whether or not the label state is being overridden
   */
  private manuallyFloatingLabel = false;

  /**
   * Stream of option selections
   */
  public readonly optionSelections: Observable<TsOptionSelectionChange> | Observable<{}> = defer(() => {
    if (this.selectionListPanel && this.selectionListPanel.options) {
      return merge(...this.selectionListPanel.options.map(option => option.selectionChange));
    }

    // If there are any subscribers before `ngAfterViewInit`, the selection list will be undefined.
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
  private readonly scrollStrategy: () => ScrollStrategy;

  /**
   * Subscription to viewport size changes
   */
  private viewportSubscription = Subscription.EMPTY;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-selection-list-trigger-${nextUniqueId++}`;

  /**
   * The currently active option, coerced to TsOptionComponent type
   */
  public get activeOption(): TsOptionComponent | null {
    if (this.selectionListPanel && this.selectionListPanel.keyManager) {
      return this.selectionListPanel.keyManager.activeItem;
    }

    return null;
  }

  /**
   * A stream of actions that should close the panel, including when an option is selected, on blur, and when TAB is pressed.
   */
  public get panelClosingActions(): Observable<TsOptionSelectionChange | null> {
    return merge(
      this.optionSelections,
      this.selectionListPanel.keyManager.tabOut.pipe(filter(() => this.overlayAttached)),
      this.closeKeyEventStream,
      this.overlayRef.backdropClick(),
    ).pipe(
      // Normalize the output so we return a consistent type.
      map(event => (event instanceof TsOptionSelectionChange ? event : null)),
    );
  }

  /**
   * Whether or not the panel is open
   */
  public get panelOpen(): boolean {
    return this.overlayAttached && this.selectionListPanel.showPanel;
  }

  /**
   * Reflect the settings from the parent
   */
  @Input()
  public allowMultiple = false;

  /**
   * The `autocomplete` attribute to be set on the input element.
   */
  // NOTE: Input has specific naming since it is accepting a standard HTML data attribute.
  // tslint:disable: no-input-rename
  @Input('autocomplete')
  public autocompleteAttribute = 'off';

  /**
   * Whether the trigger is disabled. When disabled, the element will act as a regular input and the user won't be able to open the panel.
   */
  @Input('tsSelectionListTriggerDisabled')
  public set selectionListDisabled(value: boolean) {
    this._selectionListDisabled = coerceBooleanProperty(value);
  }
  public get selectionListDisabled(): boolean {
    return this._selectionListDisabled;
  }
  private _selectionListDisabled = false;

  /**
   * The panel to be attached to this trigger
   */
  // Note: Renaming as prefixed name does not add clarity
  // tslint:disable: no-input-rename
  @Input('tsSelectionListTrigger')
  public selectionListPanel!: TsSelectionListPanelComponent;
  // tslint:enable: no-input-rename

  /**
   * Define if the panel should reopen after a selection is made
   */
  @Input()
  public set reopenAfterSelection(value: boolean) {
    this._reopenAfterSelection = value;
  }
  public get reopenAfterSelection(): boolean {
    return this._reopenAfterSelection;
  }
  private _reopenAfterSelection = false;

  /**
   * Emit when the backdrop is clicked
   */
  @Output()
  public readonly backdropClicked = new EventEmitter<void>();


  constructor(
    public elementRef: ElementRef<HTMLInputElement>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
    private viewportRuler: ViewportRuler,
    // tslint:disable-next-line no-any
    @Inject(TS_SELECTION_LIST_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @Host() private formField: TsFormFieldComponent,
  ) {
    // istanbul ignore else
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
    // istanbul ignore else
    if (typeof window !== 'undefined') {
      window.removeEventListener('blur', this.windowBlurHandler);
    }

    this.viewportSubscription.unsubscribe();
    this.componentDestroyed = true;
    this.destroyPanel();
    this.closeKeyEventStream.complete();
  }


  /**
   * Close the panel
   *
   * @param overrideReopenFlag - Whether the panel should reopen
   */
  public closePanel(overrideReopenFlag = false): void {
    this.resetLabel();

    if (!this.overlayAttached) {
      return;
    }

    // istanbul ignore else
    if (this.panelOpen) {
      // Only emit if the panel was visible.
      this.selectionListPanel.closed.emit();
    }

    this.selectionListPanel.isOpen = this.overlayAttached = false;

    // istanbul ignore else
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    // Note that in some cases this can end up being called after the component is destroyed.
    // Add a check to ensure that we don't try to run change detection on a destroyed view.
    if (!this.componentDestroyed) {
      // We need to trigger change detection manually, because `fromEvent` doesn't seem to do it at the proper time.
      // This ensures that the label is reset when the user clicks outside.
      this.changeDetectorRef.detectChanges();
    }

    // Only allow reopening when in multiple mode
    if (this.allowMultiple && this.reopenAfterSelection && !overrideReopenFlag) {
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
   * Handle input into the trigger
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
    // istanbul ignore else
    if (this.previousValue !== value && this.document.activeElement === event.target) {
      this.previousValue = value;
      this.onChange(value);

      // istanbul ignore else
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
    } else if (this.selectionListPanel) {
      const prevActiveItem = this.selectionListPanel.keyManager.activeItem;
      const isArrowKey = keyCode === KEYS.UP_ARROW.code || keyCode === KEYS.DOWN_ARROW.code;

      if (this.panelOpen || keyCode === KEYS.TAB.code) {
        this.selectionListPanel.keyManager.onKeydown(event);
      } else if (isArrowKey && this.canOpen()) {
        this.openPanel();
      }
    }
  }


  /**
   * View -> model callback called when value changes
   */
  // tslint:disable-next-line no-any
  public onChange: (value: any) => void = () => {};


  /**
   * View -> model callback called when the DOM has been touched
   */
  public onTouched = () => {};


  /**
   * Open the panel
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
   * NOTE: This method is called by the forms API to write to the view when programmatic changes from model to view are requested.
   *
   * @param value - The value to write
   */
  public writeValue(value: string): void {}


  /**
   * Attach the overlay
   */
  private attachOverlay(): void {
    if (!this.selectionListPanel && isDevMode()) {
      throw new TsUILibraryError(`TsSelectionListTriggerDirective: Attempting to open an undefined instance of 'ts-selection-list-panel'.`);
    }

    if (this.overlayRef) {
      // Update the panel width in case anything has changed
      this.overlayRef.updateSize({ width: this.getPanelWidth() });
    } else {
      this.portal = new TemplatePortal(this.selectionListPanel.template, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());

      this.overlayRef.keydownEvents().pipe(untilComponentDestroyed(this)).subscribe(event => {
        // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
        // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
        if (event.code === KEYS.ESCAPE.code || (event.code === KEYS.UP_ARROW.code && event.altKey)) {
          this.resetActiveItem();
          this.closeKeyEventStream.next();
        }
      });

      this.viewportSubscription = this.viewportRuler.change().pipe(untilComponentDestroyed(this)).subscribe(() => {
        if (this.panelOpen && this.overlayRef) {
          this.overlayRef.updateSize({ width: this.getPanelWidth() });
        }
      });
    }

    // istanbul ignore else
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.closingActionsSubscription = this.subscribeToClosingActions();
      this.overlayRef.backdropClick().pipe(untilComponentDestroyed(this)).subscribe(() => {
        this.backdropClicked.emit();
      });
    }

    const wasOpen = this.panelOpen;
    this.selectionListPanel.setVisibility();
    this.selectionListPanel.isOpen = this.overlayAttached = true;

    // We need to do an extra `panelOpen` check in here, because the panel won't be shown if there are no options.
    // istanbul ignore else
    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this.selectionListPanel.opened.emit();
    }
  }


  /**
   * Determine whether the panel can be opened
   */
  private canOpen(): boolean {
    const element = this.elementRef.nativeElement;
    return !element.readOnly && !element.disabled && !this.selectionListDisabled;
  }


  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  private clearPreviousSelectedOption(skip: TsOptionComponent): void {
    this.selectionListPanel.options.forEach(option => {
      // NOTE: Loose check (`!=`) needed for comparing classes
      // istanbul ignore else
      // eslint-disable-next-line eqeqeq
      if (option != skip && option.selected) {
        option.deselect();
      }
    });
  }


  /**
   * Destroy the panel
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
    // istanbul ignore else
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
      backdropClass: 'ts-selection-list__backdrop',
      direction: 'ltr',
      hasBackdrop: true,
      positionStrategy: this.getOverlayPositionStrategy(),
      scrollStrategy: this.scrollStrategy(),
      width: this.getPanelWidth(),
    });
  }


  /**
   * Get the overlay position strategy
   *
   * @return The position strategy
   */
  private getOverlayPositionStrategy(): PositionStrategy {
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
    this.selectionListPanel.keyManager.setActiveItem(-1);
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
   * This method closes the panel, and if a value is specified, also sets the associated control to that value.
   * It will also mark the control as dirty if this interaction stemmed from the user.
   *
   * @param event - The event containing the option
   */
  private setValueAndClose(event: TsOptionSelectionChange): void {
    // istanbul ignore else
    if (event && event.source) {
      this.clearPreviousSelectedOption(event.source);
      this.elementRef.nativeElement.focus();
      this.selectionListPanel.emitSelectEvent(event.source);
    }

    this.closePanel();
  }


  /**
   * This method listens to a stream of panel closing actions and resets the stream every time the option list changes
   *
   * @return The subscription
   */
  private subscribeToClosingActions(): Subscription {
    const firstStable = this.ngZone.onStable.asObservable().pipe(take(1));
    const optionChanges = this.selectionListPanel.options.changes.pipe(
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
          this.selectionListPanel.setVisibility();

          return this.panelClosingActions;
        }),
        // When the first closing event occurs...
        take(1),
      )
      // Set the value, close the panel, and complete.
      .subscribe((event: TsOptionSelectionChange | null) => {
        // istanbul ignore else
        if (event && event.source && event.source.value !== undefined) {
          this.setValueAndClose(event);
        } else {
          this.closePanel();
        }
      });
  }

  /**
   * Event handler for when the window is blurred.
   *
   * Needs to be an arrow function in order to preserve the context.
   */
  private windowBlurHandler = (): void => {
    // If the user blurred the window while the selection list is focused, it means that it'll be refocused when they come back. In this
    // case we want to skip the first focus event, if the pane was closed, in order to avoid reopening it unintentionally.
    this.canOpenOnNextFocus = this.document.activeElement !== this.elementRef.nativeElement || this.panelOpen;
  }

}
