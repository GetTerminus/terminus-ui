// NOTE: Our templates need to call a method to use the `chipFormatUIFn` if one exists
// tslint:disable: template-no-call-expression
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  NgControl,
} from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import {
  hasRequiredControl,
  isFunction,
  isString,
  TsDocumentService,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import {
  A,
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
} from '@terminus/ngx-tools/keycodes';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import { TS_SPACING } from '@terminus/ui/spacing';
import { inputHasChanged, TsStyleThemeTypes } from '@terminus/ui/utilities';
import {
  BehaviorSubject,
  defer,
  merge,
  Observable,
  of,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { TsOptgroupComponent } from '@terminus/ui/option';
import {
  allOptionsAreSelected,
  countGroupLabelsBeforeOption,
  getOptionScrollPosition,
  someOptionsAreSelected,
  toggleAllOptions,
} from '@terminus/ui/option';
import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptionComponent,
  TsOptionSelectionChange,
} from '@terminus/ui/option';
import { tsSelectAnimations } from './select-animations';
import { TsSelectTriggerComponent } from './select-trigger.component';


/**
 * The following style constants are necessary to save here in order to properly calculate the alignment of the selected option over the
 * trigger element.
 */

// The max height of the select's overlay panel
export const SELECT_PANEL_MAX_HEIGHT = 256;

// The panel's padding on the x-axis
export const SELECT_PANEL_PADDING_X = 16;

// The panel's x axis padding if it is indented (e.g. there is an option group)
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;

// The height of the select items in `em` units
export const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Distance between the panel edge and the option text in multi-selection mode.
 *
 * Calculated as:
 * (SELECT_PANEL_PADDING_X * 1.5) + 20 = 44
 * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
 * The checkbox width is 16px.
 */
export const SELECT_MULTIPLE_PANEL_PADDING_X = 0;

/**
 * The select panel will only "fit" inside the viewport if it is positioned at this value or more away from the viewport boundary
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 8;

const DEFAULT_DEBOUNCE_DELAY = 200;
const DEFAULT_DELIMITER = ',';

/**
 * Expose the formatter function type
 */
export type TsSelectFormatFn = (v: any) => string;

/**
 * Used to sort selected options.
 *
 * Function used to sort the values ina aselect in multiple mode. Follows the same logic as `Array.prototype.sort`.
 */
export type TsSelectSortComparatorFunction = (
  a: TsOptionComponent,
  b: TsOptionComponent,
  options: TsOptionComponent[],
) => number;

/**
 * Comparison function to specify which option is displayed
 */
export type TsSelectOptionCompareWith = (o1: any, o2: any) => boolean;

/**
 * The default compare with function used when the consumer does not define one
 */
export const DEFAULT_COMPARE_WITH: TsSelectOptionCompareWith = (o1: any, o2: any) => o1 === o2;

/**
 * The select panel will only "fit" inside the viewport if it is positioned at this value or more away from the viewport boundary
 */
export const TS_SELECT_PANEL_VIEWPORT_PADDING = 8;

/**
 * The event object that is emitted when the select value has changed
 */
export class TsSelectChange<T = unknown> {
  constructor(
    // Reference to the select that emitted the change event
    public source: TsSelectComponent,
    // The current value
    public value: any,
  ) {}
}

/**
 * Interface requirements for a selected option
 */
export interface TsSelectOption {
  isDisabled?: boolean;
  children?: TsSelectOption[];
}

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A component to create a select menu
 *
 * #### QA CSS CLASSES
 * - `qa-select-trigger`: The trigger that opens the select
 * - `qa-select-value-text`: The container for the select trigger text content
 * - `qa-select-arrow-wrapper`: The container for the select arrow
 * - `qa-select-panel`: The panel for select options
 * - `qa-select-toggle-all`: The checkbox to toggle all selections
 * - `qa-select-selected-count`: The current count of selected items
 *
 * @example
 * <ts-select
 *              [allowMultiple]="true"
 *              [compareWith]="myCompareFn"
 *              delimiter=","
 *              [hideRequiredMarker]="true"
 *              hint="My hint!"
 *              id="my-id"
 *              [isDisabled]="true"
 *              [isFilterable]="true"
 *              [isRequired]="true"
 *              label="My label!"
 *              placeholder="My placeholder!"
 *              [showProgress]="true"
 *              [sortComparator]="myComparator"
 *              tabIndex="-1"
 *              theme="primary"
 *              [validateOnChange]="true"
 *              value="My value!"
 *              (closed)="panelWasClosed($event)"
 *              (duplicateSelection)="duplicateWasSelected($event)"
 *              (opened)="panelWasOpened($event)"
 *              (optionDeselected)="optionWasDeselected($event)"
 *              (optionSelected)="optionWasSelected($event)"
 *              (queryChange)="searchQueryChanged($event)"
 *              (selectionChange)="aSelectionWasChanged($event)"
 *              (valueChange)="theValueWasChanged($event)"
 * ></ts-select>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/select</example-url>
 */
@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'ts-select',
    '[class.ts-select--required]': 'isRequired',
    '[class.ts-select--disabled]': 'isDisabled',
    '[attr.aria-owns]': 'panelOpen ? optionIds : null',
    '[attr.aria-required]': 'isRequired.toString()',
    '[attr.aria-multiselectable]': 'allowMultiple',
    '[attr.tabindex]': 'tabIndex',
    '(keydown)': 'handleKeydown($event)',
  },
  animations: [
    tsSelectAnimations.transformPanel,
  ],
  providers: [
    {
      provide: TsFormFieldControl,
      useExisting: TsSelectComponent,
    },
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsSelectComponent,
    },
    // Since we handle all option selection/deselection functionality we tell the underlying MatCheckbox to do nothing on click.
    {
      provide: MAT_CHECKBOX_CLICK_ACTION,
      useValue: 'noop',
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelect',
})
export class TsSelectComponent implements
  OnInit,
  AfterContentInit,
  OnChanges,
  OnDestroy,
  TsFormFieldControl<any> {

  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Define the flex layout gap
   */
  public flexGap: string = TS_SPACING.small[0];

  /**
   * Subject used to alert the parent {@link FormFieldComponent} when the label gap should be recalculated
   *
   * Implemented as part of TsFormFieldControl.
   */
  readonly labelChanges: Subject<void> = new Subject<void>();

  /**
   * Manages keyboard events for options in the panel.
   */
  private keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * The y-offset of the overlay panel in relation to the trigger's top start corner.
   * This must be adjusted to align the selected option text over the trigger text.
   * when the panel opens. This will be changed based on the y-position of the selected option.
   */
  public offsetY = 0;

  /**
   * The IDs of child options to be passed to the aria-owns attribute.
   */
  public optionIds = '';

  /*
   * Store the dimensions of the option
   */
  private optionRect: ClientRect | undefined;

  /**
   * Combined stream of all of the child options' change events
   */
  readonly optionSelectionChanges: Observable<TsOptionSelectionChange> = defer(() => {
    return merge(...this.options.map((option) => option.selectionChange));
  });

  /**
   * Emits when the panel element is finished transforming in.
   */
  public panelDoneAnimatingStream = new Subject<string>();

  /**
   * Whether or not the overlay panel is open
   */
  public panelOpen = false;

  /**
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the top "start" of the origin by default (overlapping
   * the trigger completely).
   */
  public positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  /**
   * The scroll position of the overlay panel, calculated to center the selected option.
   */
  private scrollTop = 0;

  /**
   * Store the search query
   */
  public searchQuery = '';

  /**
   * Manage selections
   *
   */
  public selectionModel!: SelectionModel<TsOptionComponent>;

  // Since the FormFieldComponent is inside this template, we cannot use a provider to pass this component instance to the form field.
  // Instead, we pass it manually through the template with this reference.
  selfReference = this;

  /*
   * Implemented as part of TsFormFieldControl.
   */
  readonly stateChanges: Subject<void> = new Subject<void>();

  /**
   * The value of the select panel's transform-origin property
   */
  public transformOrigin = 'top';

  /**
   * The cached font-size of the trigger element
   */
  public triggerFontSize = 0;

  /**
   * The last measured value for the trigger's client bounding rect
   */
  public triggerRect: ClientRect | undefined;

  /**
   * Define the default component ID
   */
  readonly uid = `ts-select-${nextUniqueId++}`;

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Margin between select panel edge and viewport edge
   */
  public viewportMarginSpacing = 100;


  /**
   * VIEW ACCESS
   */

  /**
   * Access the container element
   */
  @ViewChild('containerElement')
  public containerElement!: ElementRef;

  /**
   * Access the user-supplied override of the trigger element
   */
  @ContentChild(TsSelectTriggerComponent)
  public customTrigger: TsSelectTriggerComponent | undefined;

  /**
   * Access to the actual HTML element
   */
  @ViewChild('input')
  public inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Access the label element
   */
  @ViewChild('labelElement')
  public labelElement!: ElementRef;

  /**
   * Access the trigger that opens the select
   */
  @ViewChild('trigger')
  public trigger!: ElementRef;

  /**
   * Access a list of all the defined select options
   */
  @ContentChildren(TsOptionComponent, { descendants: true })
  public options!: QueryList<TsOptionComponent>;

  /**
   * Access all of the defined groups of options
   */
  @ContentChildren(TsOptgroupComponent)
  public optionGroups!: QueryList<TsOptgroupComponent>;

  /**
   * Access the overlay pane containing the options
   */
  @ViewChild(CdkConnectedOverlay)
  public overlayDir!: CdkConnectedOverlay;

  /**
   * Access the panel containing the select options
   */
  @ViewChild('panel')
  public panel!: ElementRef;


  /**
   * GETTERS
   */

  /**
   * Whether all options are selected
   */
  public get allOptionsSelected(): boolean {
    return allOptionsAreSelected(this.options);
  }

  /**
   * Whether the select has a value
   */
  public get empty(): boolean {
    return this.selectionModel && this.selectionModel.isEmpty();
  }

  /**
   * Whether the input has focus
   */
  public get focused(): boolean {
    const el = this.inputElement && this.inputElement.nativeElement;
    return (this.document.activeElement === el) || this.panelOpen;
  }

  /**
   * Calculates the amount of items in the select. This includes options and group labels.
   */
  private get itemCount(): number {
    return this.options.length + this.optionGroups.length;
  }

  /**
   * Calculates the height of the options
   *
   * Only called if at least one option exists
   */
  private get itemHeight(): number {
    // Try to use the 2nd option in case the first option is blank or a filter etc. Fall back to the first item if needed.
    const options = this.options.toArray();
    const option = options[1] || options[0];
    return option.elementRef.nativeElement.offsetHeight;
  }

  /**
   * Whether at least 1 option is selected, but not all options
   */
  public get someOptionsSelected(): boolean {
    return someOptionsAreSelected(this.options);
  }

  /**
   * Determine if the label should float
   */
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty || this.searchQuery.length > 0;
  }

  /**
   * The value displayed in the select trigger
   */
  public get selectTriggerValue(): string {
    if (this.allowMultiple) {
      const selectedOptions = this.selectionModel.selected.map((option) => option.viewValue);
      return selectedOptions.join(`${this.delimiter} `);
    }
    return this.selectionModel.selected[0].viewValue;
  }

  /**
   * The currently selected option or options
   */
  public get selected(): TsOptionComponent | TsOptionComponent[] {
    return this.allowMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
  }


  /**
   * INPUTS
   */

  /**
   * Define if multiple selections are allowed
   */
  @Input()
  public allowMultiple = false;

  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   *
   * Learn more about `compareWith` in the Angular docs:
   * https://angular.io/api/forms/SelectControlValueAccessor#customizing-option-selection
   */
  @Input()
  public set compareWith(fn: TsSelectOptionCompareWith) {
    if (typeof fn !== 'function' && isDevMode()) {
      console.warn(`TsSelectComponent: "compareWith" must be a function. Falling back to the default.`);
      this._compareWith = DEFAULT_COMPARE_WITH;
    }

    this._compareWith = fn;

    // A different comparator means the selection could change so we need to reinitialize any selections
    if (this.selectionModel) {
      this.initializeSelection();
    }
  }
  public get compareWith(): TsSelectOptionCompareWith {
    return this._compareWith;
  }
  private _compareWith: TsSelectOptionCompareWith = DEFAULT_COMPARE_WITH;

  /**
   * Define the delimiter used in the list of selected options
   */
  @Input()
  public set delimiter(value: string) {
    this._delimiter = isString(value) ? value : DEFAULT_DELIMITER;
  }
  public get delimiter(): string {
    return this._delimiter;
  }
  private _delimiter: string = DEFAULT_DELIMITER;

  /**
   * Define if the required marker should be hidden
   */
  @Input()
  public hideRequiredMarker = false;

  /**
   * Define a hint for the input
   */
  @Input()
  public set hint(value: string | undefined) {
    this._hint = value;
  }
  public get hint(): string | undefined {
    return this._hint;
  }
  private _hint: string | undefined;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if the control should be disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define if the select is filterable
   */
  @Input()
  public isFilterable = false;

  /**
   * Define if the control is required
   */
  @Input()
  public set isRequired(value: boolean) {
    this._isRequired = value;
  }
  public get isRequired(): boolean {
    const ctrl = this.ngControl && this.ngControl.control;
    const requiredFormControl = !!ctrl && hasRequiredControl(ctrl);
    return this._isRequired || requiredFormControl;
  }
  private _isRequired = false;

  /**
   * Define the label text
   */
  @Input()
  public set label(value: string | undefined) {
    this._label = value;
  }
  public get label(): string | undefined {
    return this._label;
  }
  private _label: string | undefined;

  /**
   * Placeholder to be shown if no value has been selected
   */
  @Input()
  public set placeholder(value: string | undefined) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  public get placeholder(): string | undefined {
    return this._placeholder;
  }
  private _placeholder: string | undefined;

  /**
   * Define if the input should currently be showing a progress spinner
   */
  @Input()
  public showProgress = false;

  /**
   * Function used to sort the values in a select in multiple mode
   *
   * Follows the same logic as `Array.prototype.sort`.
   *
   * See {@link TsSelectSortComparatorFunction}
   */
  @Input()
  public sortComparator: TsSelectSortComparatorFunction | undefined;

  /**
   * Define the tab index for the component
   */
  @Input()
  public set tabIndex(value: string | number) {
    this._tabIndex = coerceNumberProperty(value);
  }
  public get tabIndex(): string | number {
    return this._tabIndex;
  }
  private _tabIndex: string | number = 0;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange = false;

  /**
   * Value of the select control
   */
  @Input()
  public set value(newValue: any) {
    if (newValue !== this._value) {
      this._value = newValue;
    }
  }
  public get value(): any {
    return this._value;
  }
  private _value: any;


  /**
   * EMITTERS
   */

  /**
   * Event for when the panel is closed
   */
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();

  /**
   * Event for when a duplicate selection is made
   */
  @Output()
  readonly duplicateSelection: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the panel is opened
   */
  @Output()
  readonly opened: EventEmitter<void> = new EventEmitter();

  /**
   * Event for when an option is removed
   */
  @Output()
  readonly optionDeselected: EventEmitter<TsSelectChange> = new EventEmitter();

  /**
   * Event for when an option is selected
   */
  @Output()
  readonly optionSelected: EventEmitter<TsSelectChange> = new EventEmitter();

  /**
   * Event for when the query has changed
   */
  @Output()
  readonly queryChange: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the selections change
   */
  @Output()
  readonly selectionChange: EventEmitter<TsSelectChange> = new EventEmitter();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   *
   * Needed for {@link TsFormFieldComponent}.
   */
  @Output()
  readonly valueChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private viewportRuler: ViewportRuler,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private documentService: TsDocumentService,
    private elementRef: ElementRef,
    @Self() @Optional() public ngControl: NgControl,
  ) {
    this.document = this.documentService.document;

    // This is the assigned FormControl or NgModel
    // istanbul ignore else
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }


  /**
   * Trigger change detection when the underlying form changes
   */
  public ngOnInit(): void {
    // TODO: re-initialize the selection model if this.allowMultiple changes (rather than throw error like material)
    this.selectionModel = new SelectionModel<TsOptionComponent>(this.allowMultiple);

    // Seed the control value
    // NOTE: When the consumer is using an ngModel, the value is not set on the first cycle.
    // We need to push it to the next event loop. When using a FormControl the value is there on the first run.
    // istanbul ignore else
    if (this.ngControl && this.ngControl['form']) {
      // Support dynamic form control updates
      // istanbul ignore else
      if (this.ngControl.valueChanges) {
        this.ngControl.valueChanges
          .pipe(untilComponentDestroyed(this))
          .subscribe((newValue) => {
            // istanbul ignore else
            if (newValue) {
              this.setSelectionByValue(newValue);
            }
          });
      }
    }
  }


  /**
   * Initialize the key manager and set up change listeners
   */
  public ngAfterContentInit(): void {
    this.initKeyManager();

    // NOTE: Known bug: This event will come through twice for each selection.
    // NOTE: Selection model is created during OnInit so it cannot be null here
    // tslint:disable: no-non-null-assertion
    this.selectionModel.onChange!.pipe(
      untilComponentDestroyed(this),
    ).subscribe((event) => {
      event.added.forEach((option) => {
        option.select();
        this.optionSelected.emit(new TsSelectChange(this, option.value));
      });

      event.removed.forEach((option) => {
        option.deselect();
        this.optionDeselected.emit(new TsSelectChange(this, option.value));
      });
    });
    // tslint:enable: no-non-null-assertion

    // If the array changes, reset options
    this.options.changes.pipe(
      startWith(null),
      untilComponentDestroyed(this),
    ).subscribe(() => {
      this.resetOptions();
      this.initializeSelection();
    });
  }


  /**
   * Trigger updates when the label is dynamically changed
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // Let the parent FormField know that it should update the ouline gap for the new label
    // istanbul ignore else
    if ((!!(inputHasChanged(changes, 'label')) && !changes.label.firstChange)) {
      // Trigger change detection first so that the FormField will be working with the latest version
      this.changeDetectorRef.detectChanges();
      this.labelChanges.next();
    }
  }


  /**
   * Cleanup
   */
  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }


  /**
   * Stub in onChange
   *
   * Needed for ControlValueAccessor (View -> model callback called when value changes)
   */
  // istanbul ignore next
  public onChange: (value: any) => void = () => {};


  /**
   * Stub in onTouched
   *
   * Needed for ControlValueAccessor (View -> model callback called when select has been touched)
   */
  // istanbul ignore next
  public onTouched = () => {};


  /**
   * Toggles the overlay panel open or closed.
   */
  public toggle(): void {
    // istanbul ignore else
    if (!this.isDisabled) {
      this.panelOpen ? this.close() : this.open();
    }
  }


  /**
   * Open the overlay panel
   */
  public open(): void {
    if (this.isDisabled || !this.options || !this.options.length || this.panelOpen) {
      return;
    }

    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    // Note: The computed font-size will be a string pixel value (e.g. "16px").
    // `parseInt` ignores the trailing 'px' and converts this to a number.
    this.triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size'], 10);

    this.panelOpen = true;
    this.keyManager.withHorizontalOrientation(null);
    this.highlightCorrectOption();
    this.changeDetectorRef.markForCheck();

    // Set the font size on the panel element once it exists.
    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        // istanbul ignore else
      if (this.triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement) {
        this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this.triggerFontSize}px`;
      }

      this.optionRect = this.options.first.elementRef.nativeElement.getBoundingClientRect();
      this.calculateOverlayPosition();
    });

    // Alert the consumer
    this.opened.emit();
  }


  /**
   * Close the overlay panel
   */
  public close(): void {
    if (this.panelOpen) {
      this.panelOpen = false;
      this.keyManager.withHorizontalOrientation('ltr');
      this.changeDetectorRef.markForCheck();
      this.onTouched();
      this.updateValueAndValidity();
      // Alert the consumer
      this.closed.emit();
    }
  }


  /**
   * Callback that is invoked when the overlay panel has been attached
   */
  public onAttached(): void {
    this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      this.changeDetectorRef.detectChanges();
      this.setPanelScrollTop(this.scrollTop);
    });
  }


  /**
   * Handles all keydown events on the select
   *
   * @param event - The KeyboardEvent
   */
  public handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled) {
      return;
    }

    this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);
  }


  /**
   * Handle keyboard events when the select panel is closed
   *
   * @param event - The KeyboardEvent
   */
  private handleClosedKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const arrowKeys = [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW];
    const isArrowKey = arrowKeys.some((v) => v === keyCode);
    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    // Open the select on ALT + arrow key to match the native <select>
    if (isOpenKey || ((this.allowMultiple || event.altKey) && isArrowKey)) {
      // Prevent the page from scrolling down when space is pressed
      event.preventDefault();
      this.open();
    } else if (!this.allowMultiple) {
      this.keyManager.onKeydown(event);
    }
  }

  /**
   * Handle keyboard events when the select panel is open
   *
   * @param event - The KeyboardEvent
   */
  private handleOpenKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const manager = this.keyManager;
    const target: HTMLElement = event.target as HTMLElement;
    const isFilter = this.isFilterable && target.tagName.toLowerCase() === 'input';

    if (keyCode === HOME || keyCode === END) {
      // Focus the first/last item with HOME/END respectively
      event.preventDefault();
      keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
    } else if (isArrowKey && event.altKey) {
      // Close the select on ALT+ARROW to match the native <select>
      event.preventDefault();
      this.close();
    } else if ((keyCode === ENTER || (keyCode === SPACE && !isFilter)) && manager.activeItem) {
      // Select the active item with SPACE or ENTER
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
    } else if (this.allowMultiple && keyCode === A && event.ctrlKey) {
      // Select all with CTRL+A
      event.preventDefault();
      const hasDeselectedOptions = this.options.some((opt) => !opt.isDisabled && !opt.selected);

      this.options.forEach((option) => {
        // istanbul ignore else
        if (!option.isDisabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const shouldSelect = this.allowMultiple && isArrowKey && event.shiftKey;

      if (isArrowKey && event.shiftKey) {
        if (keyCode === DOWN_ARROW) {
          manager.setNextItemActive();
        } else {
          manager.setPreviousItemActive();
        }
      } else {
        manager.onKeydown(event);
      }
      if (shouldSelect && manager.activeItem) {
        manager.activeItem.selectViaInteraction();
      }
    }
  }


  /**
   * Drops current option subscriptions and IDs and resets from scratch
   */
  private resetOptions(): void {
    this.optionSelectionChanges.pipe(
      takeUntil(this.options.changes),
      untilComponentDestroyed(this),
    ).subscribe((event) => {
      // istanbul ignore else
      this.onSelect(event.source, event.isUserInput);

      // istanbul ignore else
      if (event.isUserInput && !this.allowMultiple && this.panelOpen) {
        this.close();
        this.focus();
      }
    });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map((option) => option.stateChanges))
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.changeDetectorRef.markForCheck();
        this.stateChanges.next();
      });

    this.setOptionIds();
  }

  /**
   * Handle the selection when an option is clicked
   *
   * @param option - The selected option
   * @param isUserInput - Whether this selection happened from a user's click
   */
  private onSelect(option: TsOptionComponent, isUserInput: boolean): void {
    const wasSelected = this.selectionModel.isSelected(option);

    // If not in multiple selection mode, clear any existing selection first
    if (option.value == null && !this.allowMultiple) {
      option.deselect();
      this.selectionModel.clear();
      this.propagateChanges(option.value);
    } else {
      option.selected ? this.selectionModel.select(option) : this.selectionModel.deselect(option);

      // istanbul ignore else
      if (isUserInput) {
        this.keyManager.setActiveItem(option);
      }

      // istanbul ignore else
      if (this.allowMultiple) {
        this.sortValues();

        if (isUserInput) {
          // In case the user selected the option with their mouse, we
          // want to restore focus back to the trigger, in order to
          // prevent the select keyboard controls from clashing with
          // the ones from `TsOptionComponent`.
          this.focus();
        }
      }
    }

    // Only propogate if the selected option is not already in the selectionModel
    if (wasSelected !== this.selectionModel.isSelected(option)) {
      this.propagateChanges();
    }

    this.stateChanges.next();
  }


  /**
   * Records option IDs to pass to the aria-owns property
   */
  private setOptionIds(): void {
    this.optionIds = this.options.map((option) => option.id).join(' ');
  }


  /**
   * Set up a key manager to listen to keyboard events on the overlay panel
   */
  private initKeyManager(): void {

    this.keyManager = new ActiveDescendantKeyManager<TsOptionComponent>(this.options)
      .withTypeAhead()
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr');


    this.keyManager.tabOut.pipe(
      untilComponentDestroyed(this),
    ).subscribe(() => {
      // Restore focus to the trigger before closing. Ensures that the focus
      // position won't be lost if the user got focus into the overlay.
      this.focus();
      this.close();
    });

    this.keyManager.change.pipe(untilComponentDestroyed(this)).subscribe(() => {
      if (this.panelOpen && this.panel) {
        this.scrollActiveOptionIntoView();
      } else if (!this.panelOpen && !this.allowMultiple && this.keyManager.activeItem) {
        this.keyManager.activeItem.selectViaInteraction();
      }
    });
  }


  /**
   * Focus the correct element
   *
   * When in standard select mode we should focus the select itself.
   */
  public focus(): void {
    this.elementRef.nativeElement.focus();
  }


  /**
   * Sort the selected values in the selectedModel based on their order in the panel
   */
  private sortValues(): void {
    // istanbul ignore else
    if (this.allowMultiple) {
      const options = this.options.toArray();

      this.selectionModel.sort((a, b) => {
        return this.sortComparator ? this.sortComparator(a, b, options) : options.indexOf(a) - options.indexOf(b);
      });

      this.stateChanges.next();
    }
  }


  /**
   * Emit a change event to set the model value
   *
   * @param fallbackValue - A fallback value to use when no selection exists
   */
  private propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.allowMultiple) {
      valueToEmit = (this.selected as TsOptionComponent[]).map((option) => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as TsOptionComponent).value : fallbackValue;
    }

    this.value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this.onChange(valueToEmit);
    this.selectionChange.emit(new TsSelectChange(this, valueToEmit));
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Call FormControl updateValueAndValidity function to ensure value and valid status get updated.
   */

  private updateValueAndValidity() {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.updateValueAndValidity();
    }
  }


  /**
   * Sets the select's value. Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * NOTE: Currently we are not using this, but it still must be present since this component is acting as a CVA.
   *
   * @param value - New value to be written to the model
   */
  public writeValue(value: any): void {}


  /**
   * Save a callback function to be invoked when the select's value changes from user input.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param fn - Callback to be triggered when the value changes
   */
  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }


  /**
   * Save a callback function to be invoked when the select is blurred by the user.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param fn - Callback to be triggered when the component has been touched
   */
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }


  /**
   * Disables the select.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param isDisabled - If the component is disabled
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }


  /**
   * Initialize any existing selections into the selectionModel
   */
  private initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this.setSelectionByValue(this.ngControl ? this.ngControl.value : this.value);
    });
  }


  /**
   * Sets the selected option based on a value.
   * If no option can be found with the designated value, the select trigger is cleared.
   *
   * @param value - The value to use to look up options
   */
  private setSelectionByValue(value: any | any[]): void {
    if (this.allowMultiple && value) {
      value = coerceArray(value);
      this.selectionModel.clear();
      value.forEach((currentValue: any) => this.selectOptionByValue(currentValue));
      this.sortValues();
    } else {
      this.selectionModel.clear();
      const correspondingOption = this.selectOptionByValue(value);

      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      if (correspondingOption) {
        this.keyManager.setActiveItem(correspondingOption);
      }
    }

    this.changeDetectorRef.markForCheck();
  }


  /**
   * Find and select an option based on its value
   *
   * @param value - The value to use when searching for a matching option
   * @return Option that has the corresponding value
   */
  private selectOptionByValue(value: any): TsOptionComponent | undefined {
    const correspondingOption = this.options.find((option: TsOptionComponent) => {
      try {
        // Treat null as a special reset value.
        return option.value != null && this.compareWith(option.value,  value);
      } catch (error) {
        // istanbul ignore else
        if (isDevMode()) {
          // Notify developers of errors in their comparator.
          console.warn(error);
        }
        return false;
      }
    });

    if (correspondingOption) {
      this.selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }


  /**
   * Scroll the active option into view
   */
  private scrollActiveOptionIntoView(): void {
    const activeOptionIndex = this.keyManager.activeItemIndex || 0;
    const labelCount = countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
    const total = getOptionScrollPosition(
      activeOptionIndex + labelCount,
      this.itemHeight,
      this.getPanelScrollTop(),
      SELECT_PANEL_MAX_HEIGHT,
    );

    this.setPanelScrollTop(total);
  }


  /**
   * Calculate the scroll position and x- and y- offsets of the overlay panel
   */
  private calculateOverlayPosition(): void {
    const itemHeight = this.itemHeight;
    const items = this.itemCount;
    const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
    const scrollContainerHeight = items * itemHeight;

    // The farthest the panel can be scrolled before it hits the bottom
    const maxScroll = scrollContainerHeight - panelHeight;

    // If no value is selected we open the popup to the first item.
    // NOTE: Since we are checking the `empty` value first, we know that the selection model is not empty
    // tslint:disable: no-non-null-assertion
    let selectedOptionOffset = this.empty ? 0 : this.getOptionIndex(this.selectionModel.selected[0])!;
    // tslint:enable: no-non-null-assertion

    // Make sure we take into account optgroups also
    selectedOptionOffset += countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);

    // We must maintain a scroll buffer so the selected option will be scrolled to the
    // center of the overlay panel rather than the top.
    const scrollBuffer = panelHeight / 2;
    this.scrollTop = this.calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
    this.offsetY = this.calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);

    this.checkOverlayWithinViewport(maxScroll);
  }


  /**
   * Calculate the scroll position of the select's overlay panel
   *
   * This attempts to center the selected option in the panel. If the option is too high or too low in the panel to be scrolled to the
   * center, it clamps the scroll position to the min or max scroll positions respectively.
   *
   * @param selectedIndex - The index of the item to scroll to
   * @param scrollBuffer - The amount to buffer the scroll
   * @param maxScroll - The maximum amount the panel can scroll
   */
  private calculateOverlayScroll(selectedIndex: number, scrollBuffer: number, maxScroll: number): number {
    const itemHeight = this.itemHeight;
    const optionOffsetFromScrollTop = itemHeight * selectedIndex;
    const halfOptionHeight = itemHeight / 2;

    // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the scroll container, then subtracts the scroll
    // buffer to scroll the option down to the center of the overlay panel. Half the option height must be re-added to the scrollTop so the
    // option is centered based on its middle, not its top edge.
    const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
    return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
  }


  /**
   * Calculates the y-offset of the select's overlay panel in relation to the top start corner of the trigger.
   * It has to be adjusted in order for the selected option to be aligned over the trigger when the panel opens.
   *
   * @param selectedIndex - The index of the selected item
   * @param scrollBuffer - The number of pixels to buffer the scroll by
   * @param maxScroll - The farthest the panel can scroll
   * @return The overlay's Y offset
   */
  private calculateOverlayOffsetY(selectedIndex: number, scrollBuffer: number, maxScroll: number): number {
    // NOTE: scrollBuffer is half of the panel height - which is really half of SELECT_PANEL_MAX_HEIGHT (when many options exist)
    // NOTE: maxScroll is the height of all options minus the height of the panel
    const itemHeight = this.itemHeight;
    const optionHeightAdjustment = (itemHeight - (this.triggerRect ? this.triggerRect.height : 0)) / 2;
    const maxOptionsDisplayed = Math.floor(SELECT_PANEL_MAX_HEIGHT / itemHeight);

    // scrollbuffer - options
    let optionOffsetFromPanelTop: number;

    if (this.scrollTop === 0) {
      optionOffsetFromPanelTop = selectedIndex * itemHeight;
    } else if (this.scrollTop === maxScroll) {
      const firstDisplayedIndex = this.itemCount - maxOptionsDisplayed;
      const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;

      // The first item is partially out of the viewport. Therefore we need to calculate what
      // portion of it is shown in the viewport and account for it in our offset.
      const partialItemHeight = itemHeight - (this.itemCount * itemHeight - SELECT_PANEL_MAX_HEIGHT) % itemHeight;

      // Because the panel height is longer than the height of the options alone,
      // there is always extra padding at the top or bottom of the panel. When
      // scrolled to the very bottom, this padding is at the top of the panel and
      // must be added to the offset.
      optionOffsetFromPanelTop = selectedDisplayIndex * itemHeight + partialItemHeight;
    } else {
      // If the option was scrolled to the middle of the panel using a scroll buffer,
      // its offset will be the scroll buffer minus the half height that was added to
      // center it.
      optionOffsetFromPanelTop = scrollBuffer - itemHeight / 2;
    }

    // The final offset is the option's offset from the top, adjusted for the height difference,
    // multiplied by -1 to ensure that the overlay moves in the correct direction up the page.
    // The value is rounded to prevent some browsers from blurring the content.
    return Math.round(optionOffsetFromPanelTop * -1 - optionHeightAdjustment);
  }


  /**
   * Check that the attempted overlay position will fit within the viewport.
   *
   * If it will not fit, tries to adjust the scroll position and the associated y-offset so the panel can open fully on-screen.
   * If it still won't fit, sets the offset back to 0 to allow the fallback position to take over.
   *
   * @param maxScroll - The maximum amount to allow the panel to scroll
   */
  private checkOverlayWithinViewport(maxScroll: number): void {
    const itemHeight = this.itemHeight;
    const viewportSize = this.viewportRuler.getViewportSize();
    // Space between top of trigger and top of viewport
    const topSpaceAvailable = this.triggerRect ? (this.triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING) : 0;
    // Viewport height - trigger bottom - viewport padding
    const bottomSpaceAvailable = viewportSize.height - (this.triggerRect ? this.triggerRect.bottom : 0) - SELECT_PANEL_VIEWPORT_PADDING;
    const panelHeightTop = Math.abs(this.offsetY);
    // 256 when maxed out
    const totalPanelHeight = Math.min(this.itemCount * itemHeight, SELECT_PANEL_MAX_HEIGHT);
    // total panel - offsetY - trigger height
    const panelHeightBottom = totalPanelHeight - panelHeightTop - (this.triggerRect ? this.triggerRect.height : 0);

    if (panelHeightBottom > bottomSpaceAvailable) {
      this.adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
    } else if (panelHeightTop > topSpaceAvailable) {
     this.adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
    } else {
      this.transformOrigin = this.getOriginBasedOnOption();
    }
  }


  /**
   * Adjust the overlay panel up to fit in the viewport
   *
   * @param panelHeightBottom - The height of the panel bottom
   * @param bottomSpaceAvailable - The amount of available space at the bottom
   */
  private adjustPanelUp(panelHeightBottom: number, bottomSpaceAvailable: number): void {
    // Browsers ignore fractional scroll offsets, so we need to round.
    const distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);

    // Scrolls the panel up by the distance it was extending past the boundary, then
    // adjusts the offset by that amount to move the panel up into the viewport.
    this.scrollTop -= distanceBelowViewport;
    // Don't allow the offset to be set below 0
    this.offsetY = (this.offsetY - distanceBelowViewport) < 0 ? 0 : this.offsetY - distanceBelowViewport;
    this.transformOrigin = this.getOriginBasedOnOption();

    // If the panel is scrolled to the very top, it won't be able to fit the panel
    // by scrolling, so set the offset to 0 to allow the fallback position to take effect.
    // istanbul ignore else
    if (this.scrollTop <= 0) {
      this.scrollTop = 0;
      this.offsetY = 0;
      this.transformOrigin = `50% bottom 0px`;
    }
  }


  /**
   * Adjusts the overlay panel down to fit in the viewport
   *
   * @param panelHeightTop - The height of the panel top
   * @param topSpaceAvailable - The amount of available space at the top
   * @param maxScroll - The maximum amount the panel can be scrolled
   */
  private adjustPanelDown(panelHeightTop: number, topSpaceAvailable: number, maxScroll: number) {
    // Browsers ignore fractional scroll offsets, so we need to round.
    const distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);

    // Scrolls the panel down by the distance it was extending past the boundary, then
    // adjusts the offset by that amount to move the panel down into the viewport.
    this.scrollTop += distanceAboveViewport;
    // Don't allow the offset to be set below 0
    this.offsetY = (this.offsetY + distanceAboveViewport) < 0 ? 0 : this.offsetY + distanceAboveViewport;
    this.transformOrigin = this.getOriginBasedOnOption();

    // If the panel is scrolled to the very bottom, it won't be able to fit the
    // panel by scrolling, so set the offset to 0 to allow the fallback position
    // to take effect.
    // istanbul ignore else
    if (this.scrollTop >= maxScroll) {
      this.scrollTop = maxScroll;
      this.offsetY = 0;
      this.transformOrigin = `50% top 0px`;
      return;
    }
  }


  /**
   * Set the transform origin point based on the selected option
   *
   * @return The transform origin CSS string
   */
  private getOriginBasedOnOption(): string {
    const itemHeight = this.itemHeight;
    const optionHeightAdjustment = (itemHeight - (this.triggerRect ? this.triggerRect.height : 0)) / 2;
    const originY = Math.abs(this.offsetY) - optionHeightAdjustment + itemHeight / 2;

    return `50% ${originY}px 0px`;
  }


  /**
   * Get the index of the provided option in the option list
   *
   * @param option - The option whose index should be found
   * @return The index of the option
   */
  private getOptionIndex(option: TsOptionComponent): number | undefined {
    return this.options.reduce((result: number | undefined, current: TsOptionComponent, index: number) => {
      return result === undefined ? (option === current ? index : undefined) : result;
    }, undefined);
  }


  /**
   * Highlight the selected item.
   *
   * If no option is selected, it will highlight the first item instead.
   */
  private highlightCorrectOption(): void {
    // istanbul ignore else
    if (this.keyManager) {
      if (this.empty) {
        this.keyManager.setFirstItemActive();
      } else {
        this.keyManager.setActiveItem(this.selectionModel.selected[0]);
      }
    }
  }


  /**
   * Toggle the selection all options
   *
   * If any are selected, it will unselect all & vice-versa.
   */
  public toggleAllOptions(): void {
    toggleAllOptions(this.options);
  }


  /**
   * Ensure the correct element gets focus when the primary container is clicked.
   *
   * Implemented as part of TsFormFieldControl.
   */
  public onContainerClick(): void {
    this.focus();

    // istanbul ignore else
    if (!this.isDisabled) {
      this.open();
    }
  }


  /**
   * Get the panel's scrollTop
   *
   * @return The scrollTop number
   */
  private getPanelScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }


  /**
   * Set the panel's scrollTop
   *
   * This allows us to manually scroll to display options above or below the fold, as they are not actually being focused when active.
   *
   *
   * @param scrollTop - The number to set scrollTop to
   */
  private setPanelScrollTop(scrollTop: number): void {
    // istanbul ignore else
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

}
