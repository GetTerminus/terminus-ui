import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  AfterViewInit,
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
  ValidationErrors,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

import {
  BehaviorSubject,
  defer,
  merge,
  Observable,
  of,
  Subject,
} from 'rxjs';

import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { MatChipList } from '@angular/material';
import {
  arrayContainsObject,
  hasRequiredControl,
  inputHasChanged,
  isFunction,
  isString,
  TsDocumentService,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import { countGroupLabelsBeforeOption, getOptionScrollPosition } from '@terminus/ui/option';
import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptionComponent,
  TsOptionSelectionChange,
} from '@terminus/ui/option';
import { TsOptgroupComponent } from '@terminus/ui/option';
// import { DEFAULT_COMPARE_WITH, TsSelectOptionCompareWith } from '@terminus/ui/select';
// import { TsSelectTriggerComponent } from '@terminus/ui/select';
import { TS_SPACING } from '@terminus/ui/spacing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { debounceTime, distinctUntilChanged, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { TsAutocompletePanelComponent, TsAutocompletePanelSelectedEvent } from './autocomplete-panel/autocomplete-panel.component';
import { TsAutocompleteTriggerDirective } from './autocomplete-panel/autocomplete-trigger.directive';

/**
 * The following style constants are necessary to save here in order to properly calculate the alignment of the selected option over the
 * trigger element.
 */

// The max height of the select's overlay panel
export const AC_PANEL_MAX_HEIGHT = 256;
// The panel's padding on the x-axis
export const AC_PANEL_PADDING_X = 16;
// The panel's x axis padding if it is indented (e.g. there is an option group)
export const AC_PANEL_INDENT_PADDING_X = AC_PANEL_PADDING_X * 2;
// The height of the select items in `em` units
export const AC_ITEM_HEIGHT_EM = 3;

/**
 * Distance between the panel edge and the option text in multi-selection mode.
 *
 * Calculated as:
 * (AC_PANEL_PADDING_X * 1.5) + 20 = 44
 * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
 * The checkbox width is 16px.
 */
export const AC_MULTIPLE_PANEL_PADDING_X = 0;

/**
 * The select panel will only "fit" inside the viewport if it is positioned at this value or more away from the viewport boundary
 */
export const AC_PANEL_VIEWPORT_PADDING = 8;

export interface KeyboardEvent {
  [key: string]: any;
}

export interface MouseEvent {
  [key: string]: any;
}

// Unique ID for each instance
let nextUniqueId = 0;

/**
 * Define a type for allowed {@link TsAutocompleteComponent} formatter function
 */
export type TsAutocompleteFormatterFn = (value: any) => string;


/**
 * Define a type for allowed {@link TsAutocompleteComponent} comparator function
 */
export type TsAutocompleteComparatorFn = (value: any) => string;


export class TsAutocompleteSelectedEvent extends MatAutocompleteSelectedEvent {}

const DEFAULT_MINIMUM_CHARACTER_COUNT = 3;

/**
 *  The formatter function type
 */
export type TsAutocompleteFormatFn = (v: any) => string;

/**
 * The event object that is emitted when the select value has changed
 */
export class TsAutocompleteChange {
  constructor(
    // Reference to the autocomplete that emitted the change event
    public source: TsAutocompleteComponent,
    // The current value
    public value: any,
  ) { }
}

/**
 * The autocomplete UI Component
 *
 * @deprecated in favor of the new TsInputComponent. Target 11.x
 *
 * #### QA CSS CLASSES
 * - `qa-autocomplete`: The primary container
 * - `qa-autocomplete-input`: The input element
 * - `qa-autocomplete-spinner`: The progress indicator
 * - `qa-autocomplete-chip`: An individual selection 'chip'
 * - `qa-autocomplete-options`: The container for the list of options
 * - `qa-autocomplete-option`: An individual option from the list
 * - `qa-autocomplete-hint`: The input hint
 * - `qa-autocomplete-validation-messages`: The container for validation messages
 *
 * @example
 * <ts-autocomplete
 *              debounceDelay="300"
 *              displayWith="(v) => v.name"
 *              hint="Begin typing to search.."
 *              label="Select options:"
 *              multiple="(v) => v.id"
 *              name="product selections"
 *              options="[{}, {}, ...]"
 *              selectionsControl="myForm.get('myControl')"
 *              [showProgress]="inProgress"
 *              theme="primary"
 *              initialSelections="[{}]"
 *              (optionSelected)="mySelected($event)"
 *              (optionRemoved)="myRemoved($event)"
 *              (selection)="mySelection($event)"
 *              (query)="myQuery($event)"
 * ></ts-autocomplete>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/autocomplete</example-url>
 */
@Component({
  selector: 'ts-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    class: 'ts-autocomplete',
    '[class.ts-autocomplete--required]': 'isRequired',
    '[class.ts-autocomplete--disabled]': 'isDisabled',
    '[attr.aria-owns]': 'panelOpen ? optionIds : null',
    '[attr.aria-required]': 'isRequired.toString()',
    '[attr.aria-multiselectable]': 'allowMultiple',
    '[attr.tabindex]': 'tabIndex',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [
    {
      provide: TsFormFieldControl,
      useExisting: TsAutocompleteComponent,
    },
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsAutocompleteComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsAutocomplete',
})
export class TsAutocompleteComponent implements OnInit,
  AfterContentInit,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  TsFormFieldControl<any> {

  /**
   * Define the FormControl
   */
  public autocompleteFormControl = new FormControl([]);

  /**
   * An array of selected values
   */
  public autocompleteSelections: string[] = [];

  /**
   * Store a reference to the document object
   */
  private document: Document;

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
   * Define the flex gap spacing
   */
  public flexGap = TS_SPACING.small[0];

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
  readonly uid = `ts-autocomplete-${nextUniqueId++}`;

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Store the search query
   */
  public searchQuery!: string;

  /**
   * Margin between select panel edge and viewport edge
   */
  public viewportMarginSpacing = 100;

  // /**
  //  * Define if the chips/selections should be selectable
  //  */
  // public selectableChips = false;

  // /**
  //  * Store the selected options
  //  */
  // public selectedOptions: OptionType[] = [];

  // /**
  //  * Store the formatter function for the UI display
  //  */
  // private uiFormatFn!: (value: OptionType) => string;


  /**
   * VIEW ACCESS
   */

  /**
   * Access the trigger that opens the autocomplete
   */
  @ViewChild('auto')
  public autocompletePanel!: TsAutocompletePanelComponent;

  /**
   * Access the trigger that opens the autocomplete
   */
  @ViewChild(TsAutocompleteTriggerDirective)
  public autocompleteTrigger!: TsAutocompleteTriggerDirective;

  /**
   * Access to the chip list in autocomplete mode
   */
  @ViewChild('chipList')
  public chipList: MatChipList | undefined;

  /**
   * Access the container element
   */
  @ViewChild('containerElement')
  public containerElement!: ElementRef;

  /**
   * Access the user-supplied override of the trigger element
   */
  // @ContentChild(TsSelectTriggerComponent)
  // public customTrigger: TsSelectTriggerComponent | undefined;

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
   * Whether the select has a value
   */
  public get empty(): boolean {
    return !this.autocompleteFormControl.value.length;
  }

  /**
   * Whether the input has focus
   */
  public get focused(): boolean {
    const el = this.inputElement && this.inputElement.nativeElement;
    return (this.document.activeElement === el) || this.panelOpen;
  }

  /**
   * Calculates the amount of items in the select.
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
    // Try to use the 2nd option in case the first option is blank. Fall back to the first item if needed.
    const options = this.options.toArray();
    const option = options[1] || options[0];
    return option.elementRef.nativeElement.offsetHeight;
  }

  /**
   * The value displayed in the select trigger
   */
  public get selectTriggerValue(): string {
    return this.autocompleteFormControl.value;
  }

  /**
   * Determine if the label should float
   */
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
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
   * Define if should allow duplicate selections
   */
  @Input()
  public allowDuplicateSelections = false;

  /**
   * Define if the panel should reopen after a selection is made
   *
   * NOTE: Though it is technically 're-opening', it happens fast enough so that it doesn't appear to close at all.
   */
  @Input()
  public reopenAfterSelection = false;


  /**
   * Define a function to retrieve the UI value for an option
   */
  @Input()
  public set chipFormatUIFn(value: TsAutocompleteFormatterFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._chipFormatUIFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsSelectComponent: 'chipFormatUIFn' must be passed a 'TsAutocompleteFormatFn'.`);
      }
    }
  }
  public get chipFormatUIFn(): TsAutocompleteFormatterFn {
    return this._chipFormatUIFn;
  }
  private _chipFormatUIFn!: TsAutocompleteFormatterFn;


  /**
   * Define a debounce delay for the query stream
   */
  @Input()
  public set debounceDelay(value: number) {
    this._debounceDelay = coerceNumberProperty(value);
  }
  public get debounceDelay(): number {
    return this._debounceDelay;
  }
  private _debounceDelay: number = 200;


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
   * Define a minimum character count for queries
   */
  @Input()
  public set minimumCharacters(value: number) {
    this._minimumCharacters = coerceNumberProperty(value, DEFAULT_MINIMUM_CHARACTER_COUNT);
  }
  public get minimumCharacters(): number {
    return this._minimumCharacters;
  }
  private _minimumCharacters = DEFAULT_MINIMUM_CHARACTER_COUNT;

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
   * Define the placeholder/label
   */
  @Input()
  public label: string | undefined;

  /**
   * Define if multiple selections are allowed by passing in a comparator function
   */
  @Input()
  public set multiple(v: TsAutocompleteComparatorFn) {
    if (!v) {
      return;
    }

    if (isFunction(v)) {
      this.comparatorFn = v;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsAutocompleteComponent: 'multiple' must be passed a 'TsAutocompleteComparatorFn' function.`);
      }
    }
  }
  public get multiple(): TsAutocompleteComparatorFn {
    return this.comparatorFn;
  }
  private comparatorFn!: TsAutocompleteComparatorFn;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string | undefined;

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
   * Emit the selected chip
   */
  @Output()
  public optionSelected: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Event for when an option is removed
   */
  @Output()
  readonly optionDeselected: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Emit the current selection
   */
  @Output()
  public selection: EventEmitter<string[]> = new EventEmitter();

  /**
   * Emit the query string
   */
  @Output()
  public query: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the autocomplete query has changed
   */
  @Output()
  readonly queryChange: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the selections change
   */
  @Output()
  readonly selectionChange: EventEmitter<TsAutocompleteChange> = new EventEmitter();

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

  public ngOnInit(): void {

    // Seed the control value in autocomplete mode
    // NOTE: When the consumer is using an ngModel, the value is not set on the first cycle.
    // We need to push it to the next event loop. When using a FormControl the value is there on the first run.
    if (this.ngControl && this.ngControl['form']) {
      // istanbul ignore else
      if (this.ngControl.value) {
        this.autocompleteFormControl.setValue(this.ngControl.value);
        this.autocompleteSelections = this.ngControl.value;
      }

      // Support dynamic form control updates
      // istanbul ignore else
      if (this.ngControl.valueChanges) {
        this.ngControl.valueChanges
          .pipe(untilComponentDestroyed(this))
          .subscribe((newValue) => {
            // istanbul ignore else
            if (newValue) {
              this.autocompleteFormControl.setValue(newValue, { emitEvent: false });
              this.autocompleteSelections = this.ngControl.value;
            }
          });
      }
    } else {
      // HACK: Wait until the next detection cycle to set the value from an ngModel.
      // NOTE: Using CDR.detectChanges causes errors in children that expect TsOptionComponent to exist.
      setTimeout(() => {
        console.log('inside timeout, ngControl: ', this.ngControl);
        // istanbul ignore else
        if (this.ngControl && this.ngControl.value) {
          this.autocompleteFormControl.setValue(this.ngControl.value);
          this.autocompleteSelections = this.ngControl.value;
        }
      });
    }

    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      // Debounce the query changes
      debounceTime(this.debounceDelay),
      // If the query is shorter than allowed, convert to an empty string
      switchMap((query) => {
        return of((query && (query.length >= this.minimumCharacters)) ? query : '');
      }),
      // Only allow a query through if it is different from the previous query
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      // NOTE: When an option is selected, the full string value comes through this stream. We are checking the stream value against the
      // input element value to verify we are sending a query rather than a selected option.
      const inputValue = this.inputElement.nativeElement.value;
      const queryIsValid = (query === inputValue) || (query === '');

      this.queryChange.emit(queryIsValid ? query : inputValue);
    });

    // Propagate changes from the autocomplete form control
    this.autocompleteFormControl.valueChanges.pipe(
      untilComponentDestroyed(this),
    ).subscribe((v) => {
      this.propagateChanges(v);
    });
  }

  /**
   * Initialize the key manager and set up change listeners
   */
  public ngAfterContentInit(): void {
  }

  /**
   * Subscribe to the querySubject and pass values to the query emitter
   *
   * NOTE: When an option is selected, the full selected value is piped through this stream
   * somehow. Have not figured out why. Best guess is it's something due to the `matAutocomplete`
   * directive. For now, we are filtering out anything that is not a string.
   */
  public ngAfterViewInit(): void {
    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      filter((v) => (typeof v === 'string') && v.length >= this.minimumCharacters),
      // Debounce the query changes
      debounceTime(this.debounceDelay),
      // Only allow a query through if it is different from the previous query
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      this.query.next(query);
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
    }
  }

  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}

  /**
   * Stub in onChange
   *
   * Needed for ControlValueAccessor (View -> model callback called when value changes)
   */
  // istanbul ignore next
  public onChange: (value: any) => void = () => { };


  /**
   * Stub in onTouched
   *
   * Needed for ControlValueAccessor (View -> model callback called when select has been touched)
   */
  // istanbul ignore next
  public onTouched = () => { };

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
    console.log('log keyManager: ', this.keyManager);
    this.keyManager.withHorizontalOrientation(null);
    this.highlightCorrectOption();
    this.changeDetectorRef.markForCheck();

    // Set the font size on the panel element once it exists.
    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this.optionRect = this.options.first.elementRef.nativeElement.getBoundingClientRect();
    });

    // Alert the consumer
    this.opened.emit();
  }

  /**
   * Highlight the selected item.
   *
   * If no option is selected, it will highlight the first item instead.
   */
  private highlightCorrectOption(): void {
    // istanbul ignore else
    if (this.keyManager && this.empty) {
      this.keyManager.setFirstItemActive();
    }
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
  private handleClosedKeydown(event): void {
    const keyCode = event.keyCode;
    const arrowKeys = [KEYS.DOWN_ARROW.code, KEYS.UP_ARROW.code, KEYS.LEFT_ARROW.code, KEYS.RIGHT_ARROW.code];
    const isArrowKey = arrowKeys.some((v) => v === keyCode);
    const isOpenKey = keyCode === KEYS.ENTER.code || keyCode === KEYS.SPACE.code;

    // Open the select on ALT + arrow key to match the native <select>
    if (isOpenKey || ((this.allowMultiple || event.altKey) && isArrowKey)) {
      // Prevent the page from scrolling down when space is pressed
      event.preventDefault();
      this.open();
    } else if (!this.allowMultiple) {
      if (this.keyManager) {
        this.keyManager.onKeydown(event);
      }
    }
  }

  /**
   * Handle keyboard events when the select panel is open
   *
   * @param event - The KeyboardEvent
   */
  private handleOpenKeydown(event): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === KEYS.DOWN_ARROW.code || keyCode === KEYS.UP_ARROW.code;
    const manager = this.keyManager;
    const target: HTMLElement = event.target as HTMLElement;
    // const isFilter = this.isFilterable && target.tagName.toLowerCase() === 'input';

    if (keyCode === KEYS.HOME.code || keyCode === KEYS.END.code) {
      // Focus the first/last item with HOME/END respectively
      event.preventDefault();
      keyCode === KEYS.HOME.code ? manager.setFirstItemActive() : manager.setLastItemActive();
    } else if (isArrowKey && event.altKey) {
      // Close the select on ALT+ARROW to match the native <select>
      event.preventDefault();
      this.close();
    } else if ((keyCode === KEYS.ENTER.code || (keyCode === KEYS.SPACE.code)) && manager.activeItem) {
      // Select the active item with SPACE or ENTER
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
    } else if (this.allowMultiple && keyCode === KEYS.A.code && event.ctrlKey) {
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
        if (keyCode === KEYS.DOWN_ARROW.code) {
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
   * Set up a key manager to listen to keyboard events on the overlay panel
   */
  private initKeyManager(): void {
    // If this is an autocomplete instance we need to initialize with wrapping turned on
    this.keyManager = new ActiveDescendantKeyManager<TsOptionComponent>(this.options)
      .withTypeAhead()
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .withWrap();

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
   * Scroll the active option into view
   */
  private scrollActiveOptionIntoView(): void {
    const activeOptionIndex = this.keyManager.activeItemIndex || 0;
    const labelCount = countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
    const total = getOptionScrollPosition(
      activeOptionIndex + labelCount,
      this.itemHeight,
      this.getPanelScrollTop(),
      AC_PANEL_MAX_HEIGHT,
    );

    this.setPanelScrollTop(total);
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
   * Implemented as part of autocomplete.
   *
   * @param scrollTop - The number to set scrollTop to
   */
  private setPanelScrollTop(scrollTop: number): void {
    // istanbul ignore else
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  /**
   *
   * Should focus the text input.
   */
  public focus(): void {
    this.inputElement.nativeElement.focus();
  }

  /**
   * Emit a change event to set the model value
   *
   * @param fallbackValue - A fallback value to use when no selection exists
   */
  private propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    valueToEmit = this.autocompleteFormControl.value;

    this.value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this.onChange(valueToEmit);
    this.selectionChange.emit(new TsAutocompleteChange(this, valueToEmit));
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
  public writeValue(value: any): void { }


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
   * Ensure the correct element gets focus when the primary container is clicked.
   *
   * Implemented as part of TsFormFieldControl.
   */
  public onContainerClick(): void {
    this.focus();
  }


  /**
   * Close the dropdown and reset the query when the user leaves the input
   *
   * @param event - The keyboard or mouse event
   */
  public handleInputBlur(event: KeyboardEvent | MouseEvent): void {
    // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
    const hasRelatedTarget = !!(event && event['relatedTarget']);
    const hasNodeName = !!(hasRelatedTarget && event['relatedTarget'].nodeName);

    if (hasRelatedTarget && hasNodeName) {
      // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName`
      // will be `TS_SELECT_OPTION`.
      // istanbul ignore else
      if (event['relatedTarget'].nodeName !== 'TS-SELECT-OPTION') {
        this.resetAutocompleteQuery();
      }
    } else {
      // Close the autocomplete planel
      // istanbul ignore else
      if (this.autocompleteTrigger.panelOpen) {
        this.autocompleteTrigger.closePanel(true);
      }
    }

    // Mark this control as 'touched' to trigger any validations needed on blur
    this.onTouched();
    this.updateValueAndValidity();
  }


  /**
   * Reset the autocomplete input
   */
  private resetAutocompleteQuery(): void {
    // istanbul ignore else
    if (!this.keyManager) {
      this.initKeyManager();
    }
    // Deselect the option from the key manager
    this.keyManager.updateActiveItem(-1);

    // Clear the autocomplete input
    // NOTE: I am not sure why simply setting `searchQuery` to an empty string doesn't work. It seems the model is not updated (even with
    // manual change detection).
    this.inputElement.nativeElement.value = '';
  }


  /**
   * Select an autocomplete item
   *
   * @param selection - The item to select
   */
  public autocompleteSelectItem(selection: TsAutocompletePanelSelectedEvent): void {
    const isDuplicate = this.autocompleteSelections.indexOf(selection.option.value) >= 0;

    // istanbul ignore else
    if (isDuplicate) {
      this.duplicateSelection.emit(selection.option.value);
    }

    // Stop the flow if the selection already exists in the array and duplicates aren't allowed
    if (!this.allowDuplicateSelections && isDuplicate) {
      return;
    }

    if (this.allowMultiple) {
      // If supporting multiple selections, reset the input text value as long as the panel should NOT reopen
      // istanbul ignore else
      if (!this.reopenAfterSelection) {
        this.resetAutocompleteQuery();
      }

      // Add to the collection
      const newSelection = this.autocompleteSelections.slice();
      newSelection.push(selection.option.value);
      this.autocompleteSelections = newSelection;

      // Update the form control
      this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());
    } else {
      // Update the selected value
      this.autocompleteSelections = [selection.option.value];

      // Update the form control
      this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());

      // In single selection mode, set the query input to the selection so the user can see what was selected
      const newValue = this.chipFormatUIFn ?
        this.retrieveValue(this.autocompleteFormControl.value[0], this.chipFormatUIFn) : this.autocompleteFormControl.value[0];
      this.inputElement.nativeElement.value = newValue;
    }

    // Update the panel position in case the addition of a chip causes the select height to change
    // istanbul ignore else
    if (this.autocompleteTrigger.overlayRef) {
      this.autocompleteTrigger.overlayRef.updatePosition();
      this.changeDetectorRef.detectChanges();
    }

    // Notify consumers about changes
    this.optionSelected.emit(new TsAutocompleteChange(this, selection.option.value));
    this.selectionChange.emit(new TsAutocompleteChange(this, this.autocompleteSelections));
  }


  /**
   * Deselect an autocomplete item
   *
   * @param value - The value of the item to remove
   */
  public autocompleteDeselectItem(value: string): void {
    // Find the key of the selection in the selectedOptions array
    const index = this.autocompleteSelections.indexOf(value);
    const selections = this.autocompleteSelections.slice();
    // If not found
    if (index < 0) {
      return;
    }

    // Remove the selection from the selectedOptions array
    selections.splice(index, 1);
    this.autocompleteSelections = selections;

    // Update the form control
    this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());

    // If the only chip was removed, re-focus the input
    // istanbul ignore else
    if (this.autocompleteSelections.length < 1) {
      this.focus();
    }

    // HACK: For some reason, triggering change detection works in the selection method above, but not here. Same issue seems preset in
    // TsOptionComponent where `setActiveStyles` works by calling the CDR but `setInactiveStyles` required a timeout.
    setTimeout(() => {
      // Update the panel position in case the removal of a chip causes the select height to change
      if (this.autocompleteTrigger.overlayRef) {
        this.autocompleteTrigger.overlayRef.updatePosition();
      }
    });

    // Notify consumers about changes
    this.optionDeselected.emit(new TsAutocompleteChange(this, value));
    this.selectionChange.emit(new TsAutocompleteChange(this, this.autocompleteSelections.slice()));
  }


  /**
   * Retrieve a value determined by the passed in formatter
   *
   * @param option - The select option
   * @param formatter - The formatter function used to retrieve the value
   * @return The retrieved value
   */
  public retrieveValue(option: any, formatter?: TsAutocompleteFormatFn): any {
    return (formatter && formatter(option)) ? formatter(option) : option;
  }

  // /**
  //  * Select an option
  //  *
  //  * @param event - The selection event from the underlying MatAutocomplete
  //  */
  // public selectOption(event: TsAutocompleteSelectedEvent): void {
  //   // The selected option
  //   const selection = event.option.value;

  //   // Stop the flow if the selection already exists in the array and we're in multiple mode
  //   if (!!this.multiple && arrayContainsObject(selection, this.selectedOptions, this.comparatorFn)) {
  //     // Set an error on the control to let the user know they chose a duplicate option
  //     // istanbul ignore else
  //     if (this.selectionsControl) {
  //       this.setDuplicateError(this.selectionsControl, selection, this.uiFormatFn);
  //     }

  //     return;
  //   }

  //   // Add to the displayed selection chips
  //   const selections = this.selectedOptions.slice();
  //   selections.push(selection);
  //   this.selectedOptions = selections;

  //   // If supporting multiple selections, reset the input text value
  //   if (this.multiple) {
  //     this.resetSearch();
  //   }

  //   // Update the form control
  //   // istanbul ignore else
  //   if (this.selectionsControl && this.selectionsControl.setValue) {
  //     this.selectionsControl.setValue(this.selectedOptions.slice());
  //   }

  //   // Notify consumers about changes
  //   this.optionSelected.emit(event.option.value);
  //   this.selection.emit(this.selectedOptions.slice());
  // }


  // /**
  //  * Deselect an option
  //  *
  //  * @param option - The option to deselect
  //  */
  // public deselectOption(option: OptionType): void {
  //   // Find the key of the selection in the selectedOptions array
  //   const index = this.selectedOptions.indexOf(option);

  //   // If not found
  //   if (index < 0) {
  //     return;
  //   }

  //   // Remove the selection from the selectedOptions array
  //   const selections = this.selectedOptions.slice();
  //   selections.splice(index, 1);
  //   this.selectedOptions = selections;

  //   // Update the form control
  //   // istanbul ignore else
  //   if (this.selectionsControl && this.selectionsControl.setValue) {
  //     this.selectionsControl.setValue(this.selectedOptions);
  //   }

  //   // Notify consumers about changes
  //   this.optionRemoved.emit(option);
  //   this.selection.emit(this.selectedOptions.slice());
  // }


  // /**
  //  * Use the user defined `displayWith` function to show the correct UI text if it was set.
  //  * Otherwise, display the selected value.
  //  *
  //  * @param option - The option
  //  * @return The string value for the UI or the entire option object
  //  */
  // public displayOption(option: OptionType): string | OptionType {
  //   return (this.uiFormatFn) ? this.uiFormatFn(option) : option;
  // }


  // /**
  //  * Close the dropdown and reset the query when the user leaves the input
  //  *
  //  * @param event - The keyboard or mouse event
  //  */
  // public handleBlur(event: KeyboardEvent | MouseEvent): void {
  //   // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
  //   const eventValue: KeyboardEvent | MouseEvent | null =
  //     (event && event['relatedTarget']) ? event['relatedTarget'] : null;

  //   if (eventValue && eventValue.nodeName && !!this.multiple) {
  //     // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName`
  //     // will be `MAT-OPTION`.
  //     if (eventValue.nodeName !== 'MAT-OPTION') {
  //       this.resetSearch();
  //     }
  //   } else {
  //     // If no eventValue exists, this was a blur event triggered by the Escape key
  //     if (!!this.multiple) {
  //       this.resetSearch();
  //     }
  //   }

  //   // Since the user never interacts directly with the 'selectionsControl' formControl, we need to
  //   // manually mark it as 'touched' to trigger validation messages.
  //   // istanbul ignore else
  //   if (this.selectionsControl && this.selectionsControl.markAsTouched) {
  //     this.selectionsControl.markAsTouched();
  //   }
  // }


  // /**
  //  * Reset the autocomplete input and close the panel
  //  */
  // private resetSearch(): void {
  //   // Close the autocomplete planel
  //   // istanbul ignore else
  //   if (this.trigger.panelOpen) {
  //     this.trigger.closePanel();
  //   }
  //   // Clear the query model
  //   this.searchQuery = '';
  //   // Clear the search query stream
  //   this.querySubject.next('');
  //   // Clear the query input
  //   this.input.nativeElement.value = '';
  // }


  // /**
  //  * Set an error on the form control for a duplicate selection
  //  *
  //  * @param control - The form control
  //  * @param selection - The selected option
  //  * @param formatter - The UI formatter function
  //  */
  // private setDuplicateError(control: FormControl, selection: OptionType, formatter?: TsAutocompleteFormatterFn): void {
  //   const invalidResponse: ValidationErrors = {
  //     notUnique: {
  //       valid: false,
  //       actual: formatter ? formatter(selection) : selection,
  //     },
  //   };

  //   control.setErrors(invalidResponse);
  // }

}
