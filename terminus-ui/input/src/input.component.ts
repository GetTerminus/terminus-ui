import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  isDevMode,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  NgControl,
} from '@angular/forms';
import {
  hasRequiredControl,
  isBoolean,
  isNumber,
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
import {
  format as formatDate,
  isValid as isValidDate,
} from 'date-fns';
import { Subject } from 'rxjs';
import { TS_SPACING } from '@terminus/ui/spacing';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import {
  inputHasChanged,
  TsStyleThemeTypes,
} from '@terminus/ui/utilities';

import {
  TS_DATE_FORMATS,
  TsDateAdapter,
} from './date-adapter';
import { TS_INPUT_VALUE_ACCESSOR } from './input-value-accessor';


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
export type TsMaskFunction = (value: string) => (RegExp | string)[];

/**
 * An individual mask definition. Used by {@link TsInputComponent}
 */
export interface TsMask {
  mask: (RegExp | string)[] | TsMaskFunction | false;
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
 * FIXME: This should be coming from the ngx-tools library, but the typings are not working for some reason when imported.
 * https://github.com/GetTerminus/terminus-ui/issues/1156
 *
 * @param item - The item to check
 * @return Whether the item is a function
 */
function isFunction(item: any): item is Function {
  return !!(item && item.constructor && item.call && item.apply);
}


// Unique ID for each instance
let nextUniqueId = 0;
const AUTOCOMPLETE_DEFAULT: TsInputAutocompleteTypes = 'on';
const NUMBER_ONLY_REGEX: RegExp = /[^0-9]/g;
const NUMBER_WITH_DECIMAL_REGEX: RegExp = /[^0-9.]/g;
const DEFAULT_TEXTAREA_ROWS = 4;


/**
 * A presentational component to render a text input
 *
 * #### QA CSS CLASSES
 * - `qa-input-label-text`: The label text
 * - `qa-input-text`: The input element
 * - `qa-input-prefix-icon`: The icon element for the prefix icon, if one is set
 * - `qa-input-suffix-icon`: The icon element for the clickable "clear" icon, if this control is clearable
 * - `qa-datepicker-calendar`: The calendar popup for the datepicker
 *
 * @example
 * <ts-input
 *              [autocapitalize]="false"
 *              autocomplete="email"
 *              [dateFilter]="myFilterFunction"
 *              [datepicker]="true"
 *              [formControl]="myForm.get('myControl')"
 *              [hasExternalFormField]="true"
 *              [hideRequiredMarker]="false"
 *              hint="My hint!"
 *              id="my-id"
 *              [isClearable]="true"
 *              [isDisabled]="false"
 *              [isFocused]="false"
 *              [isRequired]="false"
 *              label="My Label Text"
 *              mask="phone"
 *              [maskAllowDecimal]="true"
 *              [maskSanitizeValue]="true"
 *              maxDate="{{ new Date(1990, 1, 1) }}"
 *              minDate="{{ new Date(1990, 1, 1) }}"
 *              name="password"
 *              [(ngModel]="myModel"
 *              openTo="{{ new Date(1990, 1, 1) }}"
 *              prefixIcon="icon_name"
 *              [readOnly]="false"
 *              [spellcheck]="false"
 *              startingView="year"
 *              tabIndex="2"
 *              theme="primary"
 *              type="text"
 *              [validateOnChange]="false"
 *              (cleared)="userClearedInput($event)"
 *              (inputBlur)="userLeftInput($event)"
 *              (inputFocus)="userFocusedInput($event)"
 *              (selected)="userSelectedFromCalendar($event)"
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
    {
      provide: TsFormFieldControl,
      useExisting: TsInputComponent,
    },
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
export class TsInputComponent implements
  TsFormFieldControl<any>,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  DoCheck,
  OnChanges,
  OnDestroy {
  /**
   * Emits when the value changes (either due to user input or programmatic change). Need for Material Datepicker.
   *
   * NOTE: Underscore naming convention needed since that is what the Material datepicker will subscribe to.
   */
  public _valueChange: EventEmitter<Date | null> = new EventEmitter();

  /**
   * The aria-describedby attribute on the input for improved a11y
   */
  public ariaDescribedby: string | undefined;

  /**
   * Define if the input has been autofilled
   */
  public autofilled = false;

  /**
   * Define an InputValueAccessor for this component
   */
  private inputValueAccessor: {value: any};

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
   *
   * Implemented as part of {@link TsFormFieldControl}
   */
  public focused = false;

  /**
   * Implemented as part of TsFormFieldControl.
   */
  readonly labelChanges: Subject<void> = new Subject<void>();

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


  private previousNativeValue: any;

  /**
   * Reference to itself. Passed to {@link TsFormFieldComponent}.
   */
  public selfReference: TsInputComponent = this;

  /**
   * Implemented as part of TsFormFieldControl.
   */
  readonly stateChanges: Subject<void> = new Subject<void>();

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
   * VIEW ACCESS
   */

  /**
   * Expose reference to the Material datepicker component
   */
  @ViewChild('picker')
  public picker!: MatDatepicker<string>;

  /**
   * Provide access to the input
   */
  @ViewChild('inputElement')
  public inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Determine if the input is empty
   *
   *   1. Input exists
   *   2. Input has no value
   *   3. Native input validation is valid
   *   4. Input is not filled by browser
   *
   * Implemented as part of {@link TsFormFieldControl}.
   */
  public get empty(): boolean {
    // Since we are using ViewChild, we need to verify the existence of the element
    const input = this.inputElement && this.inputElement.nativeElement;

    if (!input) {
      return true;
    }

    return !!(input && !input.value && !this.isBadInput() && !this.autofilled);
  }

  /**
   * Getter returning a boolean based on both the component `isDisabled` flag and the FormControl's disabled status
   */
  public get shouldBeDisabled(): boolean {
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
    const oldDate = this.value;

    // istanbul ignore else
    if (v !== this.value) {
      this.inputValueAccessor.value = v;
      this.onChangeCallback(v);
      this.stateChanges.next();
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
    return this.inputValueAccessor.value;
  }


  /**
   * INPUTS
   */

  /**
   * Define if the input should autocapitalize
   * (standard HTML5 property)
   */
  @Input()
  public set autocapitalize(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "autocapitalize" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._autocapitalize = coerceBooleanProperty(value);
  }
  public get autocapitalize(): boolean {
    return this._autocapitalize;
  }
  private _autocapitalize = false;

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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "datepicker" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
  private _datepicker = false;

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

      // Seed any existing value from the FormControl into the component
      // HACK: This is to get around ExpressionChangedAfterChecked error.
      Promise.resolve(null).then(() => {
        this.inputValueAccessor.value = this._formControl.value;
      });
    }
  }
  public get formControl(): FormControl {
    return this._formControl;
  }
  private _formControl: FormControl = new FormControl();

  /**
   * Define if the use-case provides it's own {@link TsFormFieldComponent} or if this component should provide it's own.
   */
  @Input()
  public set hasExternalFormField(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "hasExternalFormField" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._hasExternalFormField = coerceBooleanProperty(value);
  }
  public get hasExternalFormField(): boolean {
    return this._hasExternalFormField;
  }
  private _hasExternalFormField = false;

  /**
   * Define if a required marker should be included
   */
  @Input()
  public set hideRequiredMarker(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "hideRequiredMarker" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if the input should surface the ability to clear it's value
   */
  @Input()
  public set isClearable(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "isClearable" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isClearable = coerceBooleanProperty(value);
  }
  public get isClearable(): boolean {
    return this._isClearable;
  }
  private _isClearable = false;

  /**
   * Define if the input should be disabled
   *
   * Implemented as part of {@link TsFormFieldControl}
   */
  @Input()
  public set isDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define if the input should be focused
   */
  @Input()
  public set isFocused(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "isFocused" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isFocused = coerceBooleanProperty(value);

    if (this._isFocused) {
      this.focus();
    }
  }
  public get isFocused(): boolean {
    return this._isFocused;
  }
  private _isFocused = false;

  /**
   * Define if the input is required
   *
   * Implemented as part of {@link TsFormFieldControl}
   */
  @Input()
  public set isRequired(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "isRequired" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isRequired = coerceBooleanProperty(value);
  }
  public get isRequired(): boolean {
    const requiredFormControl = (this.formControl && hasRequiredControl(this.formControl));
    return this._isRequired || requiredFormControl;
  }
  private _isRequired = false;

  /**
   * Define if the input should be a textarea
   *
   * NOTE: This is not meant to be used with the datepicker or mask enabled.
   */
  @Input()
  public set isTextarea(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "isTextarea" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isTextarea = coerceBooleanProperty(value);
  }
  public get isTextarea(): boolean {
    return this._isTextarea;
  }
  private _isTextarea = false;

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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "maskAllowDecimal" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
  private _maskAllowDecimal = true;

  /**
   * Define if the value should be sanitized before it is saved to the model
   */
  @Input()
  public set maskSanitizeValue(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "maskSanitizeValue" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._maskSanitizeValue = coerceBooleanProperty(value);
  }
  public get maskSanitizeValue(): boolean {
    return this._maskSanitizeValue;
  }
  private _maskSanitizeValue = true;

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
  public set readOnly(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "readOnly" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._readOnly = coerceBooleanProperty(value);
  }
  public get readOnly(): boolean {
    return this._readOnly;
  }
  private _readOnly = false;

  /**
   * Define if the input should spellcheck
   * (standard HTML5 property)
   */
  @Input()
  public set spellcheck(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "spellcheck" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
  private _tabIndex = 0;

  /**
   * Define the number of rows for a textarea
   *
   * NOTE: Since the 'rows' attribute of a textarea is stored as a string, we should accept both string and number.
   */
  @Input()
  public set textareaRows(value: number) {
    this._textareaRows = isNumber(value) ? Number(value) : DEFAULT_TEXTAREA_ROWS;
  }
  public get textareaRows(): number {
    return this._textareaRows;
  }
  private _textareaRows = DEFAULT_TEXTAREA_ROWS;

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
        this.autocomplete = AUTOCOMPLETE_DEFAULT;
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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsInputComponent: "validateOnChange" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._validateOnChange = coerceBooleanProperty(value);
  }
  public get validateOnChange(): boolean {
    return this._validateOnChange;
  }
  private _validateOnChange = false;


  /**
   * EMITTERS
   */

  /**
   * The event to emit when the input value is cleared
   */
  @Output()
  readonly cleared: EventEmitter<boolean> = new EventEmitter();

  /**
   * Define an event when the input receives a blur event
   */
  @Output()
  readonly inputBlur: EventEmitter<Date> = new EventEmitter();

  /**
   * The event to emit when the input element receives a focus event
   */
  @Output()
  readonly inputFocus: EventEmitter<boolean> = new EventEmitter();

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output()
  readonly selected: EventEmitter<Date> = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private autofillMonitor: AutofillMonitor,
    protected platform: Platform,
    private ngZone: NgZone,
    private documentService: TsDocumentService,
    @Optional() @Self() @Inject(TS_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
    @Optional() public dateAdapter: DateAdapter<Date>,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.document = this.documentService.document;

    // If no inputValueAccessor was passed in, default to a basic object with a value.
    this.inputValueAccessor = inputValueAccessor || {value: undefined};

    // If no value accessor was passed in, use this component for the ngControl ValueAccessor
    // istanbul ignore else
    if (!inputValueAccessor) {
      // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
      // istanbul ignore else
      if (this.ngControl != null) {
        this.ngControl.valueAccessor = this;
      }
    }

    // Store any existing value
    this.previousNativeValue = this.value;
  }


  /**
   * Begin monitoring for the input autofill
   */
  public ngOnInit(): void {
    this.autofillMonitor.monitor(this.elementRef.nativeElement).subscribe((event) => {
      this.autofilled = event.isAutofilled;
      this.stateChanges.next();
    });
  }


  /**
   * HACK: Without this hack, seeded values are not initially seen so the label overlaps the content.
   *
   * The issue seems to be that the elementRef.nativeElement isn't updated with the new value immediately. When manually inspecting the
   * nativeElement, the value does exist. But when the `empty` getter defines it's elementRef instance, the value is not yet set.
   *
   * Material doesn't seem to have this issue. The only real difference is that they are implmenting the ControlValueAccessor in the input
   * where we are extending another class.
   *
   * So currently, we just check to see if the value has changed, then trigger a fake input event since the CVA for ngModel listens for the
   * input event.
   */
  public ngAfterContentInit(): void {
    // HACK: See above.
    // istanbul ignore else
    if (this.value !== this.lastValue) {
      const event = this.document.createEvent('Event');
      event.initEvent('input', true, true);
      setTimeout(() => {
        this.inputElement.nativeElement.dispatchEvent(event);
      });
    }

    // istanbul ignore else
    if (this.platform.IOS) {
      this.fixIOSCaretBug();
    }
  }


  /**
   * After the view is initialized, trigger any needed animations
   */
  public ngAfterViewInit(): void {
    // istanbul ignore else
    if (this.mask) {
      this.setUpMask();
    }

    // Register this component as the associated input for the Material datepicker
    // istanbul ignore else
    if (this.picker && !this.picker._datepickerInput) {
      this.picker._registerInput(this as any);
    }
  }


  public ngDoCheck(): void {
    // We need to dirty-check the native element's value, because there are some cases where we won't be notified when it changes (e.g. the
    // consumer isn't using forms or they're updating the value using `emitEvent: false`).
    this.dirtyCheckNativeValue();
  }


  /**
   * Trigger needed changes when specific inputs change
   *
   * @param changes - The changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    const validMaskChange: boolean = !!(inputHasChanged(changes, 'mask') && this.mask);
    const validSanitizeChange: boolean = !!(inputHasChanged(changes, 'maskSanitizeValue'));
    const validDecimalChange: boolean = !!(inputHasChanged(changes, 'maskAllowDecimal'));
    const validLabelChange: boolean = !!(inputHasChanged(changes, 'label'));

    // istanbul ignore else
    if (validMaskChange || validSanitizeChange || validDecimalChange) {
      this.setUpMask();
      this.updateMaskModelHack();
    }

    // Only re-set the value if this isn't the first change. This avoids thrashing as the component is initialized.
    if (validMaskChange && !changes.mask.firstChange) {
      this.setValue(this.value);
    }

    // HACK: If changing to the date mask dynamically, text-mask breaks. It seems to be related to checking the length of a null property in
    // `conformToMask` which is called inside the file `createTextMaskInputElement.js`. To get around this bug, we clear the existing value.
    // FIXME: Ideally, when switching to the date filter, any existing value would remain and be masked immediately.
    if (validMaskChange && !changes.mask.firstChange && this.value) {
      this.value = '';
      this.formControl.setValue('');

      // istanbul ignore else
      if (this.textMaskInputElement) {
        this.textMaskInputElement.update(this.value);
      }

      this.changeDetectorRef.detectChanges();
    }

    // Let the parent FormField know that it should update the ouline gap for the new label
    if ((validLabelChange && !changes.label.firstChange)) {
      // Trigger change detection first so that the FormField will be working with the latest version
      this.changeDetectorRef.detectChanges();
      this.labelChanges.next();
    }

    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.nativeElement.value);
    }

    this.stateChanges.next();
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

    this.stateChanges.complete();
    this.labelChanges.complete();
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
  public onBlur(): void {
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
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }


  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   */
  public registerOnTouched(fn: any): void {
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
   * Callback for when the focused state of the input changes
   *
   * @param nowFocused - Boolean determining if the input is gaining or losing focus
   */
  public focusChanged(nowFocused: boolean): void {
    // istanbul ignore else
    if (nowFocused !== this.focused && !this.readOnly) {
      this.focused = nowFocused;
      this.stateChanges.next();
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
   * NOTE: KNOWN BUG that allows model and UI to get out of sync when extra characters are added after a fully satisfied mask.
   *
   * @param value - The typed value
   */
  // tslint:disable: no-unused-variable
  public onInput(value: string): void {
    // We need to trim the last character due to a bug in the text-mask library
    const trimmedValue = this.trimLastCharacter(value);
    this.inputElement.nativeElement.value = trimmedValue;
    this.stateChanges.next();
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
      const finalValue = !this.maskSanitizeValue ? value : this.cleanValue(value, this.currentMask.unmaskRegex);
      this.onChangeCallback(finalValue);
      this.inputValueAccessor.value = finalValue;
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
          stringifiedDate = this.isValidDateString(value) ? formatDate(value, 'MM-dd-yyyy') : value;
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


  /**
   * Implemented as part of {@link TsFormFieldControl}.
   */
  public onContainerClick(): void {
    // Do not re-focus the input element if the element is already focused. Otherwise it can happen
    // that someone clicks on a time input and the cursor resets to the "hours" field while the
    // "minutes" field was actually clicked. See: https://github.com/angular/material2/issues/12849
    // istanbul ignore else
    if (!this.focused) {
      this.focus();
    }
  }


  /**
   * Focus the input element
   */
  public focus(): void {
    // istanbul ignore else
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }


  /**
   * Manually dirty check the native input `value` property
   */
  protected dirtyCheckNativeValue(): void {
    if (!this.inputElement) {
      return;
    }

    const newValue = this.inputElement.nativeElement.value;

    if (this.previousNativeValue !== newValue) {
      this.previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }

}
