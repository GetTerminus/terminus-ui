import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';
import {
  hasRequiredControl,
  noop,
  TsDocumentService,
} from '@terminus/ngx-tools';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { format as formatDate, isValid as isValidDate } from 'date-fns';

import { ControlValueAccessorProviderFactory } from './../utilities/cva-provider-factory/cva-provider-factory';
import {
  TS_DATE_FORMATS,
  TsDateAdapter,
} from './date-adapter';
import { inputHasChanged } from './../utilities/input-has-changed/input-has-changed';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TS_SPACING } from './../spacing/spacing.constant';


/**
 * Define the function type for date filters. Used by {@link TsInputComponent}
 */
export type TsDateFilterFunction = (d: Date) => boolean;


/**
 * Define the allowed {@link TsInputComponent} input types
 */
export type TsInputTypes
  = 'text'
  | 'password'
  | 'email'
  | 'hidden'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
;

/**
 * Define the allowed autocomplete variations for {@link TsInputComponent}
 *
 * NOTE: This is not all valid types; only the ones this library supports.
 */
export type TsInputAutocompleteTypes
  = 'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'tel'
;

/**
 * A function that returns an array of RegExp (used to determine postal code RegExp in {@link TsInputComponent})
 */
export type TsMaskFunction = (value: string) => (RegExp|string)[];

/**
 * An individual mask definition. Used by {@link TsInputComponent}
 */
export interface TsMask {
  mask: (RegExp|string)[] | TsMaskFunction | false;
  unmaskRegex?: RegExp;
  pipe?: Function;
  guide?: boolean;
  showMask?: boolean;
  keepCharPositions?: boolean;
}

/**
 * The collection of masks. Used by {@link TsInputComponent}
 */
export interface TsMaskCollection {
  [key: string]: TsMask;
}

/**
 * Define the allowed mask shortcut option. Used by {@link TsInputComponent}
 */
export type TsMaskShortcutOptions
  = 'currency'
  | 'date'
  | 'number'
  | 'percentage'
  | 'phone'
  | 'postal'
  | 'default' // matches all characters
;

/**
 * Create an array used to verify the passed in shortcut is valid. Used by {@link TsInputComponent}
 */
const allowedMaskShorcuts: TsMaskShortcutOptions[] = [
  'currency',
  'date',
  'number',
  'percentage',
  'phone',
  'postal',
  'default',
];


/**
 * Coerce a function type
 *
 * NOTE: This should be coming from the ngx-tools library, but the typings are not working for some reason when imported.
 *
 * @param item - The item to check
 * @return Whether the item is a function
 */
function isFunction(item: any): item is Function {
  return !!(item && item.constructor && item.call && item.apply);
}


// Unique ID for each instance
let nextUniqueId = 0;
const floatingLabelScale = 0.75;
const outlineGapPadding = 5;
const autocompleteDefault: TsInputAutocompleteTypes = 'on';
const NUMBER_ONLY_REGEX: RegExp = /[^0-9]/g;
const NUMBER_WITH_DECIMAL_REGEX: RegExp = /[^0-9.]/g;


/**
 * Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
/*
 *export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
 *  provide: NG_VALUE_ACCESSOR,
 *  useExisting: forwardRef(() => TsInputComponent),
 *  multi: true,
 *};
 */
/* tslint-enable: no-use-before-declare */


/**
 * A presentational component to render a text input.
 *
 * #### QA CSS CLASSES
 * - `qa-input`: The container element
 * - `qa-input-container`: The container around the input
 * - `qa-input-label`: The label element
 * - `qa-input-text`: The input element
 * - `qa-input-prefix-icon`: The icon element for the prefix icon, if one is set
 * - `qa-input-suffix-icon`: The icon element for the clickable "clear" icon, if this control is
 * clearable
 * - `qa-input-hint`: The hint element, if hint content is provided
 * - `qa-input-validation-messages`: The {@link TsValidationMessagesComponent} which will contain
 * - `qa-datepicker-calendar`: The calendar popup for the datepicker
 *
 * @example
 * <ts-input
 *              autocapitalize="false"
 *              autocomplete="email"
 *              [dateFilter]="myFilterFunction"
 *              [formControl]="myForm.get('myControl')"
 *              hideRequiredMarker="false"
 *              hint="Fill this out!"
 *              id="myId"
 *              isClearable="true"
 *              isDisabled="false"
 *              isFocused="false"
 *              isRequired="false"
 *              label="My Input"
 *              mask="phone"
 *              maskAllowDecimal="true"
 *              maskSanitizeValue="true"
 *              maxDate="{{ new Date(1990, 1, 1) }}"
 *              minDate="{{ new Date(1990, 1, 1) }}"
 *              openTo="{{ new Date(1990, 1, 1) }}"
 *              startingView="year"
 *              name="password"
 *              [(ngModel)]="myModel"
 *              prefixIcon="icon_name"
 *              readOnly="false"
 *              spellcheck="false"
 *              tabIndex="2"
 *              theme="primary"
 *              type="text"
 *              validateOnChange="false"
 *              (inputBlur)="userLeftInput($event)"
 *              (cleared)="userClearedInput($event)"
 *              (selected)="userSelectedFromCalendar($event)"
 *              (inputFocus)="userFocusedInput($event)"
 * ></ts-input>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'ts-input',
  },
  providers: [
    ControlValueAccessorProviderFactory(TsInputComponent),
    {
      provide: DateAdapter,
      useClass: TsDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: TS_DATE_FORMATS,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsInput',
})
export class TsInputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnChanges, OnDestroy {
  /**
   * Emits when the value changes (either due to user input or programmatic change). Need for Material Datepicker.
   */
  public _valueChange: EventEmitter<Date | null> = new EventEmitter();

  /**
   * Define if the input has been autofilled
   */
  public autofilled = false;

  /**
   * Store the current mask
   */
  private currentMask!: TsMask;

  /**
   * Define the default format for the date mask
   */
  private defaultDateFormat = 'mm/dd/yyyy';

  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Define the flex layout gap
   */
  public flexGap = TS_SPACING.small[0];

  /**
   * Define whether the input has focus
   */
  public focused = false;

  /**
   * Define the internal data model
   */
  private innerValue: any = '';

  /**
   * Store the last value for comparison
   */
  private lastValue!: string;

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   */
  private onChangeCallback: (_: any) => void = noop;

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   */
  private onTouchedCallback: () => void = noop;

  /**
   * The defined width of the space before the input border gap begins
   */
  public outlineGapStart = 0;

  /**
   * The defined width of the gap for the input border
   */
  public outlineGapWidth = 0;

  /**
   * State of the hint and error animations
   */
  public subscriptAnimationState: string = '';

  /**
   * Base settings for the mask
   */
  private textMaskConfig: any = {
    mask: null,
    guide: false,
    keepCharPositions: false,
  };

  /**
   * Store the mask instance
   */
  private textMaskInputElement: any;

  /**
   * Define the default component ID
   */
  protected uid = `ts-input-${nextUniqueId++}`;

  /**
   * Provide access to the container
   */
  @ViewChild('containerElement')
  private containerElement!: ElementRef;

  /**
   * Expose reference to the Material datepicker component
   */
  @ViewChild('picker')
  public picker!: MatDatepicker<string>;

  /**
   * Provide access to the label
   */
  @ViewChild('labelElement')
  private labelElement!: ElementRef;

  /**
   * Provide access to the input
   */
  @ViewChild('inputElement')
  public inputElement!: ElementRef;

  /**
   * Determine if the input is empty
   */
  public get empty(): boolean {
    const el: ElementRef = this.inputElement;
    if (el && el.nativeElement) {
      const input: HTMLInputElement = this.inputElement.nativeElement;
      return !input.value && !this.isBadInput() && !this.autofilled;
    } else {
      return false;
    }
  }

  /**
   * Determine the correct required attribute content
   *
   * @return The required attribute value
   */
  public get requiredAttribute(): string | null {
    const requiredFormControl = (this.formControl && hasRequiredControl(this.formControl));
    return (requiredFormControl || this.isRequired) ? 'required' : null;
  }

  /**
   * Getter returning a boolean based on both the component `isDisabled` flag and the FormControl's disabled status
   */
  get shouldBeDisabled(): boolean {
    return this.formControl.disabled || this.isDisabled;
  }

  /**
   * Determine if the label should float
   */
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  /**
   * Set the accessor and call the onchange callback
   */
  public set value(v: any) {
    const oldDate = this.innerValue;
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }

    // istanbul ignore else
    if (this.datepicker) {
      // istanbul ignore else
      if (!this.dateAdapter.sameDate(oldDate, v)) {
        this._valueChange.emit(v);
      }
    }
  }
  public get value(): any {
    return this.innerValue;
  }

  /**
   * Define if the input should autocapitalize
   * (standard HTML5 property)
   */
  @Input()
  public set autocapitalize(value: boolean) {
    this._autocapitalize = coerceBooleanProperty(value);
  }
  public get autocapitalize(): boolean {
    return this._autocapitalize;
  }
  private _autocapitalize: boolean = false;

  /**
   * Define if the input should autocomplete. See {@link TsInputAutocompleteTypes}.
   */
  @Input()
  public set autocomplete(value: TsInputAutocompleteTypes) {
    if (value) {
      this._autocomplete = value;
    } else {
      this._autocomplete = 'on';
    }
  }
  public get autocomplete(): TsInputAutocompleteTypes {
    return this._autocomplete;
  }
  private _autocomplete: TsInputAutocompleteTypes = 'on';

  /**
   * Define a date filter to disallow certain dates for the datepicker
   */
  @Input()
  public set dateFilter(value: TsDateFilterFunction | undefined) {
    this._dateFilter = value;
  }
  public get dateFilter(): TsDateFilterFunction | undefined {
    return this._dateFilter;
  }
  private _dateFilter: TsDateFilterFunction | undefined;

  /**
   * Define if the datepicker should be enabled
   */
  @Input()
  public set datepicker(value: boolean) {
    this._datepicker = coerceBooleanProperty(value);

    // When using a datepicker, we need to validate on change so that selecting a date from the calendar
    // istanbul ignore else
    if (this.datepicker) {
      this.validateOnChange = true;
    }
  }
  public get datepicker(): boolean {
    return this._datepicker;
  }
  private _datepicker: boolean = false;

  /**
   * Define the form control to get access to validators
   */
  @Input()
  public set formControl(value: FormControl) {
    // istanbul ignore else
    if (value) {
      this._formControl = value;
      // Register the onChange for the new control
      this.registerOnChangeFn(this.updateInnerValue);

      // HACK: This is to get around ExpressionChangedAfterChecked error.
      Promise.resolve(null).then(() => {
        this.value = this._formControl.value;
      });
    }
  }
  public get formControl(): FormControl {
    return this._formControl;
  }
  private _formControl: FormControl = new FormControl();

  /**
   * Define if a required marker should be included
   */
  @Input()
  public set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  public get hideRequiredMarker(): boolean {
    return this._hideRequiredMarker;
  }
  private _hideRequiredMarker = false;

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
  set id(value: string) {
    this._id = value || this.uid;
  }
  get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if the input should surface the ability to clear it's value
   */
  @Input()
  public set isClearable(value: boolean) {
    this._isClearable = coerceBooleanProperty(value);
  }
  public get isClearable(): boolean {
    return this._isClearable;
  }
  private _isClearable = false;

  /**
   * Define if the input should be disabled
   */
  @Input()
  public set isDisabled(v: boolean) {
    this._isDisabled = coerceBooleanProperty(v);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled: boolean = false;

  /**
   * Define if the input should be focused
   */
  @Input()
  public set isFocused(value: boolean) {
    this._isFocused = coerceBooleanProperty(value);

    if (this._isFocused) {
      this.focusInput();
    }
  }
  public get isFocused(): boolean {
    return this._isFocused;
  }
  private _isFocused = false;

  /**
   * Define if the input is required
   */
  @Input()
  public set isRequired(value: boolean) {
    this._isRequired = coerceBooleanProperty(value);
  }
  public get isRequired(): boolean {
    return this._isRequired;
  }
  private _isRequired = false;

  /**
   * Define the label
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
   * Define a mask
   *
   * param value - A {@link TsMaskShortcutOptions}
   */
  @Input()
  public set mask(value: TsMaskShortcutOptions | undefined) {
    // Verify value is allowed
    // istanbul ignore else
    if (value && isDevMode() && (allowedMaskShorcuts.indexOf(value) < 0)) {
      console.warn(`TsInputComponent: "${value}" is not an allowed mask. ` +
      'Allowed masks are defined by "TsMaskShortcutOptions".');

      // Fallback to the default mask (which will allow all characters)
      value = 'default';
    }

    // HACK: If changing to the date mask dynamically, text-mask breaks. It seems to be related to checking the length of a null property in
    // `conformToMask` which is called inside the file `createTextMaskInputElement.js`. To get around this bug, we clear the existing value.
    // FIXME: Ideally, when switching to the date filter, any existing value would remain and be masked immediately.
    if (value === 'date' && this.value) {
      this.value = '';
      this.formControl.setValue('');

      // istanbul ignore else
      if (this.textMaskInputElement) {
        this.textMaskInputElement.update(this.value);
      }

      this.changeDetectorRef.detectChanges();
    }

    this._mask = value;

    // Update the current mask definition
    this.setMaskDefinition(value);
  }
  public get mask(): TsMaskShortcutOptions | undefined {
    return this._mask;
  }
  private _mask: TsMaskShortcutOptions | undefined;

  /**
   * Define if decimals are allowed in numbers/currency/percentage masks
   */
  @Input()
  public set maskAllowDecimal(value: boolean) {
    const oldValue = this.maskAllowDecimal;
    this._maskAllowDecimal = coerceBooleanProperty(value);

    // Re-set the definition if the value was changed
    if (this.mask && this.maskAllowDecimal !== oldValue) {
      this.setMaskDefinition(this.mask);
    }
  }
  public get maskAllowDecimal(): boolean {
    return this._maskAllowDecimal;
  }
  private _maskAllowDecimal: boolean = true;

  /**
   * Define if the value should be sanitized before it is saved to the model
   */
  @Input()
  public set maskSanitizeValue(value: boolean) {
    this._maskSanitizeValue = coerceBooleanProperty(value);
  }
  public get maskSanitizeValue(): boolean {
    return this._maskSanitizeValue;
  }
  private _maskSanitizeValue: boolean = true;

  /**
   * Define the maximum date for the datepicker
   */
  @Input()
  public set maxDate(value: string | Date | undefined) {
    this._maxDate = (value) ? this.verifyIsDateObject(value) : undefined;
  }
  public get maxDate(): string | Date | undefined {
    return this._maxDate;
  }
  private _maxDate: string | Date | undefined;

  /**
   * Define the minimum date for the datepicker
   */
  @Input()
  public set minDate(value: string | Date | undefined) {
    this._minDate = (value) ? this.verifyIsDateObject(value) : undefined;
  }
  public get minDate(): string | Date | undefined {
    return this._minDate;
  }
  private _minDate: string | Date | undefined;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string | undefined;

  /**
   * Define a date that the calendar should open to for the datepicker
   */
  @Input()
  public set openTo(value: Date | undefined) {
    // istanbul ignore else
    if ((value instanceof Date) || value === undefined) {
      this._openTo = value;
    }
  }
  public get openTo(): Date | undefined {
    return this._openTo;
  }
  private _openTo: Date | undefined;

  /**
   * Define a Material icon to include before the input
   */
  @Input()
  public prefixIcon: string | undefined;

  /**
   * Define if the input is readOnly
   */
  @Input()
  set readOnly(value: boolean) {
    this._readOnly = coerceBooleanProperty(value);
  }
  get readOnly(): boolean {
    return this._readOnly;
  }
  private _readOnly = false;

  /**
   * Define if the input should spellcheck
   * (standard HTML5 property)
   */
  @Input()
  public set spellcheck(value: boolean) {
    this._spellcheck = coerceBooleanProperty(value);
  }
  public get spellcheck(): boolean {
    return this._spellcheck;
  }
  private _spellcheck: boolean = true;

  /**
   * Define the starting calendar view for the datepicker
   */
  @Input()
  public set startingView(value: 'month' | 'year') {
    if (value === 'month' || value === 'year') {
      this._startingView = value;
    } else {
      this._startingView = 'month';
    }
  }
  public get startingView(): 'month' | 'year' {
    return this._startingView;
  }
  private _startingView: 'month' | 'year' = 'month';

  /**
   * Define the tabindex for the input
   */
  @Input()
  public set tabIndex(value: number) {
    this._tabIndex = coerceNumberProperty(value);
  }
  public get tabIndex(): number {
    return this._tabIndex;
  }
  private _tabIndex: number = 0;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the input type (text, password etc.) See {@link TsInputTypes}
   */
  @Input()
  public set type(value: TsInputTypes) {
    if (!value) {
      value = 'text';
    }

    // istanbul ignore else
    if (this.mask && (value === 'email' || value === 'number')) {
      console.warn(`TsInputComponent: "${value}" is not an allowed type when used with a mask. ` +
      'When using a mask, the input type must be "text", "tel", "url", "password" or "search".');

      value = 'text';
    }

    this._type = value;

    // Update the autocomplete setting if needed
    if (value === 'email') {
      this.autocomplete = 'email';
    } else {
      // istanbul ignore else
      if (this.autocomplete === 'email') {
        this.autocomplete = autocompleteDefault;
      }
    }
  }
  public get type(): TsInputTypes {
    return this._type;
  }
  private _type: TsInputTypes = 'text';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public set validateOnChange(value: boolean) {
    this._validateOnChange = coerceBooleanProperty(value);
  }
  public get validateOnChange(): boolean {
    return this._validateOnChange;
  }
  private _validateOnChange = false;

  /**
   * The event to emit when the input value is cleared
   */
  @Output()
  public cleared: EventEmitter<boolean> = new EventEmitter();

  /**
   * Define an event when the input receives a blur event
   */
  @Output()
  public inputBlur: EventEmitter<Date> = new EventEmitter();

  /**
   * The event to emit when the input element receives a focus event
   */
  @Output()
  public inputFocus: EventEmitter<boolean> = new EventEmitter();

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output()
  public selected: EventEmitter<Date> = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private autofillMonitor: AutofillMonitor,
    protected platform: Platform,
    private ngZone: NgZone,
    private documentService: TsDocumentService,
    @Optional() public dateAdapter: DateAdapter<Date>,
  ) {
    this.document = this.documentService.document;
    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }


  /**
   * Begin monitoring for the input autofill
   */
  public ngOnInit(): void {
    this.autofillMonitor.monitor(this.elementRef.nativeElement).subscribe((event) => {
      this.autofilled = event.isAutofilled;
    });
  }


  /**
   * Trigger iOS caret bug fix if on iOS
   */
  public ngAfterContentInit(): void {
    // istanbul ignore else
    if (this.platform.IOS) {
      this.fixIOSCaretBug();
    }
  }


  /**
   * After the view is initialized, trigger any needed animations
   */
  public ngAfterViewInit(): void {
     // Avoid animations on load.
    this.subscriptAnimationState = 'enter';

    // istanbul ignore else
    if (this.mask) {
      this.setUpMask();
    }

    // Register this component as the associated input for the Material datepicker
    if (this.picker && !this.picker._datepickerInput) {
      this.picker._registerInput(this as any);
    }
  }


  /**
   * Return the difference in time in words
   *
   * @param time - The time chosen
   * @return The difference in time
   */
  public ngOnChanges(changes: SimpleChanges): void {
    const validMaskChange: boolean = !!(inputHasChanged(changes, 'mask') && this.mask);
    const validSanitizeChange: boolean = !!(inputHasChanged(changes, 'maskSanitizeValue'));
    const validDecimalChange: boolean = !!(inputHasChanged(changes, 'maskAllowDecimal'));

    // istanbul ignore else
    if (validMaskChange || validSanitizeChange || validDecimalChange) {
      this.setUpMask();
      this.updateMaskModelHack();
      this.setValue(this.value);
    }

    // istanbul ignore else
    if (inputHasChanged(changes, 'label')) {
      this.updateOutlineGap();
    }

    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.nativeElement.value);
    }
  }


  /**
   * Trigger the outline to be updated after inner content is checked
   */
  public ngAfterContentChecked(): void {
    // It's important that we run this outside the `_ngZone`, because the `Promise.resolve`
    // can kick us into an infinite change detection loop, if the `_initialGapCalculated`
    // wasn't flipped on for some reason.
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => this.updateOutlineGap());
    });
  }


  /**
   * Stop monitoring autofill
   */
  public ngOnDestroy(): void {
    this.autofillMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.changeDetectorRef.detach();

    // istanbul ignore else
    if (this._valueChange) {
      this._valueChange.complete();
    }
  }


  /**
   * Fix for the iOS caret bug
   *
   * On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
   * key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
   * exists on iOS, we only bother to install the listener on iOS.
   * https://github.com/angular/material2/blob/master/src/lib/input/input.ts
   */
  private fixIOSCaretBug(): void {
    this.ngZone.runOutsideAngular(() => {
      this.inputElement.nativeElement.addEventListener('keyup', (event: Event) => {
        const el = event.target as HTMLInputElement;

        // istanbul ignore else
        if (!el.value && !el.selectionStart && !el.selectionEnd) {
          // Note: Just setting `0, 0` doesn't fix the issue. Setting
          // `1, 1` fixes it for the first time that you type text and
          // then hold delete. Toggling to `1, 1` and then back to
          // `0, 0` seems to completely fix it.
          el.setSelectionRange(1, 1);
          el.setSelectionRange(0, 0);
        }
      });
    });
  }


  /**
   * Set touched on blur
   */
  public onBlur() {
    this.onTouchedCallback();
    this.inputBlur.emit(this.value);
  }


  /**
   * Update the inner value when the formControl value is updated
   *
   * @param value - The value to set
   */
  public updateInnerValue = (value: string): void => {
    this.value = value;
    if (!this.changeDetectorRef['destroyed']) {
      this.changeDetectorRef.detectChanges();
    }
  }


  /**
   * Register onChange callback (from ControlValueAccessor interface)
   */
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }


  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   */
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


  /**
   * Clear the input's value
   */
  public reset(): void {
    this.value = '';
    this.cleared.emit(true);
    this.formControl.markAsUntouched();
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Focus the actual text input
   */
  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }


  /**
   * Callback for when the focused state of the input changes
   *
   * @param nowFocused - Boolean determining if the input is gaining or losing focus
   */
  public focusChanged(nowFocused: boolean): void {
    // istanbul ignore else
    if (nowFocused !== this.focused && !this.readOnly) {
      this.focused = nowFocused;
    }

    // Trigger the onTouchedCallback for blur events
    if (!nowFocused) {
      this.onTouchedCallback();
      this.inputBlur.emit(this.value);
    } else {
      this.inputFocus.emit(this.value);
    }
  }


  /**
   * Write the value
   *
   * @param value - The value to write to the model
   */
  public writeValue(value: string | Date): void {
    if (this.mask) {
      this.setUpMask();
    }

    // Set the initial value for cases where the mask is disabled
    let normalizedValue = value ? value : '';
    this.value = normalizedValue;

    // Convert to a string if dealing with a date object
    if (normalizedValue instanceof Date) {
      normalizedValue = normalizedValue.toISOString();
    }

    // istanbul ignore else
    if (this.inputElement) {
      this.renderer.setProperty(this.inputElement, 'value', normalizedValue);
    }

    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(normalizedValue);
    }
  }


  /**
   * Update values on input
   *
   * NOTE(B$): Apparently TSLint doesn't realize that the host listener is calling this method.  Using the @HostDecorator shows the same
   * error. So for now, we are disabling the lint rule here.
   *
   * NOTE: KOWN BUG that allows model and UI to get out of sync when extra characters are added after a fully satisfied mask.
   *
   * @param value - The typed value
   */
  // tslint:disable: no-unused-variable
  public onInput(value: string): void {
    // We need to trim the last character due to a bug in the text-mask library
    const trimmedValue = this.trimLastCharacter(value);
    this.inputElement.nativeElement.value = trimmedValue;
    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      // Update the mask.
      this.textMaskInputElement.update(trimmedValue);

      // Verify the value has changed
      // istanbul ignore else
      if (this.lastValue !== value) {
        this.lastValue = value;

        // Trigger the change (and remove mask if needed)
        this.setValue(trimmedValue);
      }
    }

    // istanbul ignore else
    if (this.datepicker) {
      this.selected.emit(this.value);
      this._valueChange.emit(new Date(value));
    }
  }
  // tslint:enable: no-unused-variable


  /**
   * Remove the mask if needed
   *
   * @param value - The value to clean
   * @param regex - The RegExp to use to clean the value
   * @return The clean value
   */
  private cleanValue(value: string, regex?: RegExp | Function): string {
    // If there is no unmask regex, just return the value
    if (!regex) {
      return value;
    } else {
      // If the unmask regex is a function, invoke it to get the plain regex
      const finalRegex: RegExp = isFunction(regex) ? regex() : regex;
      return finalRegex ? value.replace(new RegExp(finalRegex), '') : value;
    }
  }


  /**
   * Create the collection of possible masks
   *
   * @param allowDecimal - If the number based masks should allow a decimal character
   * @return The collection of masks
   */
  private createMaskCollection(allowDecimal: boolean): TsMaskCollection {
    return {
      phone: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        unmaskRegex: NUMBER_ONLY_REGEX,
      },
      currency: {
        mask: createNumberMask({
          allowDecimal: allowDecimal,
        }),
        unmaskRegex: allowDecimal ? NUMBER_WITH_DECIMAL_REGEX : NUMBER_ONLY_REGEX,
      },
      number: {
        mask: createNumberMask({
          prefix: '',
          suffix: '',
          allowDecimal: allowDecimal,
          allowLeadingZeroes: true,
        }),
        unmaskRegex: allowDecimal ? NUMBER_WITH_DECIMAL_REGEX : NUMBER_ONLY_REGEX,
      },
      percentage: {
        mask: createNumberMask({
          prefix: '',
          suffix: '%',
          allowDecimal: allowDecimal,
        }),
        unmaskRegex: allowDecimal ? NUMBER_WITH_DECIMAL_REGEX : NUMBER_ONLY_REGEX,
      },
      postal: {
        mask: this.determinePostalMask,
      },
      date: {
        mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        pipe: createAutoCorrectedDatePipe(this.defaultDateFormat),
        keepCharPositions: true,
      },
      default: {
        mask: false,
      },
    };
  }


  /**
   * Helper to determine the correct postal code match (5 characters vs 9)
   *
   * @param value - The current postal code value
   * @return The correct mask
   */
  private determinePostalMask(value: string): (RegExp | string)[] {
    if (!value || value.length <= 5) {
      return [/\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  }


  /**
   * Checks whether the input is invalid based on the native validation
   *
   * @return Whether the native validation passes
   */
  private isBadInput(): boolean {
    const validity: ValidityState = (this.inputElement.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }


  /**
   * Set the model value
   *
   * @param value - The value to set
   */
  private setValue(value: string): void {
    if (value && this.mask === 'date') {
      this.onChangeCallback(new Date(value));
    } else {
      const finalValue = this.maskSanitizeValue ? this.cleanValue(value, this.currentMask.unmaskRegex) : value;
      this.onChangeCallback(finalValue);
    }
  }


  /**
   * Register our custom onChange function
   *
   * @param fn - The onChange function
   */
  private registerOnChangeFn(fn: Function): void {
    // istanbul ignore else
    if (this.formControl) {
      this.formControl.registerOnChange(fn);
    }
  }


  /**
   * Set the current mask definition
   *
   * @param value - The name of the desired mask
   */
  private setMaskDefinition(value: string | undefined): void {
    const collection: TsMaskCollection = this.createMaskCollection(this.maskAllowDecimal);
    // NOTE: If the mask doesn't match a predefined mask, default to a mask that matches all
    // characters. The underlying text-mask library will error out without this fallback.
    const mask = (value && collection[value]) ? collection[value] : collection['default'];

    // Set the current mask
    this.currentMask = mask;
    // Update the config with the chosen mask
    this.textMaskConfig = Object.assign({}, this.textMaskConfig, mask);
  }


  /**
   * Create the mask
   */
  private setUpMask(): void {
    // istanbul ignore else
    if (this.inputElement) {
      const maskOptions: {[key: string]: any} =
        Object.assign({inputElement: this.inputElement.nativeElement}, this.textMaskConfig);

      // Initialize the mask
      this.textMaskInputElement = createTextMaskInputElement(maskOptions);
    }
  }


  /**
   * Updates the width and position of the gap in the outline
   */
  private updateOutlineGap(): void {
    // istanbul ignore else
    if (this.labelElement && this.labelElement.nativeElement) {
      if (!this.document.documentElement.contains(this.elementRef.nativeElement)) {
        return;
      }

      const containerStart: number = this.containerElement.nativeElement.getBoundingClientRect().left;
      const labelStart: number = this.labelElement.nativeElement.children[0].getBoundingClientRect().left;
      let labelWidth = 0;
      for (const child of this.labelElement.nativeElement.children) {
        labelWidth += child.offsetWidth;
      }
      const outlineGapStart = labelStart - containerStart - outlineGapPadding;

      this.outlineGapStart = outlineGapStart;
      this.outlineGapWidth = labelWidth * floatingLabelScale + outlineGapPadding * 2;
    } else {
      this.outlineGapStart = 0;
      this.outlineGapWidth = 0;
    }
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Update mask model
   *
   * HACK: Firing an event inside a timeout is the only way I can get the model to update after the mask dynamically changes. The UI
   * updates perfectly, but the unsanitized model value retains the previous masked value.
   */
  private updateMaskModelHack(): void {
    const event = this.document.createEvent('Event');
    event.initEvent('input', true, true);
    setTimeout(() => {
      this.inputElement.nativeElement.dispatchEvent(event);
    });
  }


  /**
   * HACK: Trim the last character of the model when the string is longer than the model
   *
   * KNOWN BUG: This hack does not work correcty for unsanitized percentage masks.
   *
   * The underlying text-mask library has a bug that allows the user to type 1 more character than the mask allows. To get around this
   * issue, we are checking to see if the input value is longer than the mask. If it is, trim the last character off and set the value.
   * See: https://github.com/text-mask/text-mask/issues/294#issuecomment-342299450
   *
   * @param value - The value to check
   * @return The trimmed value (if needed)
   */
  private trimLastCharacter(value: string): string {
    // This only effects masked inputs
    if (this.mask) {
      const mask = this.currentMask.mask;
      const staticMask = isFunction(mask) ? mask(this.value) : mask;
      const maskLength = staticMask ? staticMask.length /* istanbul ignore next - Unreachable */ : 0;
      const isNumberMask: boolean = (mask as any).instanceOf === 'createNumberMask';

      // istanbul ignore else
      if (isFunction(mask) && isNumberMask) {
        const decimals = 2;
        const cleanValue = this.maskSanitizeValue ? this.cleanValue(value, this.currentMask.unmaskRegex) : value;
        const split = cleanValue.split('.');

        if (split.length === 2 && split[1].length > decimals) {
          // Trim the final character off
          const trimmedValue = cleanValue.slice(0, -1);
          value = trimmedValue;
        }
      } else {
        let stringifiedDate: string | undefined;

        if (this.mask === 'date') {
          stringifiedDate = this.isValidDateString(value) ? formatDate(value, 'MM-dd-YYYY') : value;
        }

        value = stringifiedDate || value;

        if (value && (maskLength > 0 && value.length > maskLength)) {
          // Determine the max length to trim the extra character
          // Get the cleaned value if needed
          const finalValue = this.maskSanitizeValue ? this.cleanValue(stringifiedDate || value, this.currentMask.unmaskRegex) : value;
          const trimmedValue = finalValue.slice(0, -1);

          // Trim the final character off
          value = trimmedValue;
        }
      }

    }

    return value;
  }


  /**
   * Convert an valid date string to a Date if needed
   *
   * NOTE: When using 1 time bindings we are required to pass in ISO stringified dates. Adding this
   * method to our setters adds support for either version
   *
   * @param date - The date
   * @return The Date object
   */
  private verifyIsDateObject(date: string | Date): Date {
    return !(date instanceof Date) ? new Date(date) : date;
  }


  /**
   * Determine if a date string is valid.
   *
   * We cannot simply see if the string creates a valid date. The string '0' will technically create a valid Date. For our purposes, we can
   * check to verify the length is correct AND it is a valid date. This works because the mask is enforcing a consistent 'length' for valid
   * dates.
   *
   * @param value - The string
   * @return If the string is a valid date
   */
  private isValidDateString(value: string): boolean {
    const numbersInFormattedDate = 8;
    const cleanValue = this.cleanValue(value, /[^0-9]/g);
    const hasCorrectLength: boolean = cleanValue.length === numbersInFormattedDate;
    const isValid: boolean = isValidDate(value);
    return hasCorrectLength && isValid;
  }

}
