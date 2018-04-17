import {
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  Renderer2,
  isDevMode,
  SimpleChanges,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


const NUMBER_ONLY_REGEX: RegExp = /[^0-9]/g;
const NUMBER_WITH_DECIMAL_REGEX: RegExp = /[^0-9.]/g;

/**
 * A function that returns an array of RegExp (used to determine postal code RegExp)
 */
export type MaskFunction = (value: string) => (RegExp|string)[];

/**
 * An individual mask definition
 */
export interface Mask {
  mask: (RegExp|string)[] | MaskFunction | false;
  unmaskRegex?: RegExp;
}

/**
 * The collection of masks
 */
export interface MaskCollection {
  [key: string]: Mask;
}

/**
 * Define the allowed mask shortcut option
 */
export type MaskShortcutOptions
  = 'phone'
  | 'currency'
  | 'number'
  | 'percentage'
  | 'postal'
  | 'default' // matches all characters
;

/**
 * Create an array used to verify the passed in shortcut is valid
 */
const allowedMaskShorcuts: MaskShortcutOptions[] = [
  'phone',
  'currency',
  'number',
  'percentage',
  'postal',
  'default',
];

/**
 * Value accessor implementation to provide to the directive
 */
/* tslint:disable:no-use-before-declare */
export const MASKED_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsMaskDirective),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    '(blur)': 'onTouched()',
  },
  selector: '[tsMask]',
  exportAs: 'tsMask',
  providers: [MASKED_INPUT_VALUE_ACCESSOR],
})
export class TsMaskDirective implements ControlValueAccessor, OnChanges {
  /**
   * Store the current mask
   */
  private currentMask!: Mask;

  /**
   * Store a reference to the input element
   */
  private inputElement!: HTMLInputElement;

  /**
   * Store the last value for comparison
   */
  private lastValue!: string;

  /**
   * Store the selected mask name
   */
  private maskName!: MaskShortcutOptions;

  /**
   * Base settings for the mask
   */
  private textMaskConfig: any = {
    mask: null,
    guide: false,
  };

  /**
   * Store the mask instance
   */
  private textMaskInputElement: any;

  /**
   * Define if decimals are allowed in numbers/currency/percentage
   */
  @Input()
  public allowDecimal: boolean = true;

  /**
   * Define if the value should be sanitized before saving to the model
   */
  @Input()
  public sanitizeValue: boolean = true;

  /**
   * Define a mask
   */
  @Input()
  set tsMask(value: MaskShortcutOptions) {
    if (!value) {
      return;
    }

    // Verify value is allowed
    if (isDevMode() && (allowedMaskShorcuts.indexOf(value) < 0)) {
      console.warn(`TsMaskDirective: "${value}" is not an allowed type. ` +
      'Allowed types are defined by "MaskShortcutOptions".');
      return;
    }

    // Save reference to the set mask definition
    this.setMaskDefinition(value);
    this.maskName = value;
  }


  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}


  /**
   * Re-init the mask on changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // If the allowDecimal @Input has changed, we should regenerate our masks
    // istanbul ignore else
    if (changes.allowDecimal) {
      // istanbul ignore else
      if (changes.allowDecimal.previousValue !== changes.allowDecimal.currentValue) {
        // Recreate the mask definitions to update decimal support
        this.setMaskDefinition(this.maskName);
      }
    }

    // Recreate the mask if any options change
    this.setupMask(true);

    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.value);
    }
  }


  /**
   * Update values on input
   *
   * @param value - The typed value
   */
  // NOTE(B$): Apparently TSLint doesn't realize that the host listener is calling this method.
  // Using the @HostDecorator shows the same error.
  // tslint:disable: no-unused-variable
  private onInput(value: string): void {
    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      // Update the mask
      this.textMaskInputElement.update(value);

      // Get the full updated value
      value = this.inputElement.value;

      // Verify the value has changed
      // istanbul ignore else
      if (this.lastValue !== value) {
        this.lastValue = value;

        // Trigger the change (and remove mask if needed)
        this.sanitizeValue
          ? this.onChange(this.cleanValue(value, this.currentMask.unmaskRegex))
          : this.onChange(value);
      }
    }
  }
  // tslint:enable: no-unused-variable


  /**
   * Write the value
   *
   * @param value - The value to write to the model
   */
  public writeValue(value: string): void {
    this.setupMask();

    // Set the initial value for cases where the mask is disabled
    const normalizedValue = value ? value : '';
    this.renderer.setProperty(this.inputElement, 'value', normalizedValue);

    // istanbul ignore else
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value);
    }
  }


  /**
   * Set up for ValueChangeAccessor
   */
  public onChange: (value: any) => any = (value: any) => {};


  /**
   * Set up for ValueChangeAccessor
   */
  public onTouched: (value: any) => any = (value: any) => {};


  /**
   * Set up for ValueChangeAccessor
   */
  public registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }


  /**
   * Set up for ValueChangeAccessor
   */
  public registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }


  /**
   * Create the mask
   *
   * @param create - If the mask should be created
   */
  private setupMask(create?: boolean): void {
    // istanbul ignore else
    if (!this.inputElement) {
      this.inputElement = this.elementRef.nativeElement;
    }

    // istanbul ignore else
    if (this.inputElement && create) {
      const maskOptions = Object.assign({inputElement: this.inputElement}, this.textMaskConfig);
      // Initialize the mask
      this.textMaskInputElement = createTextMaskInputElement(maskOptions);
    }
  }


  /**
   * Remove the mask if needed
   *
   * @param value - The value to clean
   * @param regex - The RegExp to use to clean the value
   * @return The clean value
   */
  private cleanValue(value: string, regex?: RegExp): string {
    return regex ? value.replace(new RegExp(regex), '') : value;
  }


  /**
   * Helper to determine the correct postal code match
   *
   * @param value - The current postal code value
   * @return The correct mask
   */
  private determinePostalMask(value: string): (RegExp|string)[] {
    if (value.length <= 5) {
      return [/\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  }


  /**
   * Create the collection of possible masks
   *
   * @param allowDecimal - If the number based masks should allow a decimal character
   * @return The collection of masks
   */
  private createMaskCollection(allowDecimal: boolean): MaskCollection {
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
      default: {
        mask: false,
      },
    };
  }


  /**
   * Set the current mask definition
   *
   * @param value - The name of the desired mask
   */
  private setMaskDefinition(value: string): void {
    const collection: MaskCollection = this.createMaskCollection(this.allowDecimal);
    let mask: Mask;

    // NOTE: If the mask doesn't match a predefined mask, default to a mask that matches all
    // characters. The underlying mask library will error out without this fallback.
    if (collection[value]) {
      mask = collection[value];
    } else {
      mask = collection['default'];
    }

    // Set the current mask
    this.currentMask = mask;
    // Update the config with the chosen mask
    this.textMaskConfig.mask = mask.mask;
  }

}
