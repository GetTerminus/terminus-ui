import {
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { noop } from './../utilities/noop';

/**
 * Custom control value accessor for our component
 *
 * FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
 * a base class that others can extend? (Not sure how to pass in a named component like below)
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsInputComponent),
  multi: true
};


/**
 * A presentational component to render a text input.
 *
 * Why we are not masking passwords:
 *   - https://www.nngroup.com/articles/stop-password-masking/
 *   - https://www.lukew.com/ff/entry.asp?1653
 *
 * @example
 * <ts-input
 *              formControlName="email"
 *              [formControl]="yourHelperToGetFormControl('email')"
 *              hint="Fill this out!"
 *              required
 *              minlength="3"
 *              label="My Input"
 *              isDisabled="false"
 *              isRequired="false"
 *              hideRequiredMarker="false"
 *              prefixIcon="link"
 *              isClearable="true"
 *              isFocused="false"
 *              autocomplete="off"
 *              autocorrect="off"
 *              autocapitalize="off"
 *              spellcheck="false"
 * ></ts-input>
 */
@Component({
  selector: 'ts-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class TsInputComponent {
  /**
   * @private Define the internal data model
   * (for form control support)
   */
  private innerValue: any = '';

  /**
   * @private Define placeholder for callback (provided later by the control value accessor)
   * (for form control support)
   */
  private onChangeCallback: (_: any) => void = noop;

  /**
   * @private Define placeholder for callback (provided later by the control value accessor)
   * (for form control support)
   */
  private onTouchedCallback: () => void = noop;

  /**
   * Define if the input should autocapitalize
   * (standard HTML5 property)
   */
  @Input() autocapitalize: boolean = true;

  /**
   * Define if the input should autocomplete
   * (standard HTML5 property)
   */
  @Input() autocomplete: boolean = true;

  /**
   * Define a Material icon to include after the input
   */
  @Input() isClearable: boolean = false;

  /**
   * Define if the input should be focused
   */
  @Input() isFocused: boolean;

  /**
   * Define if the input is required
   */
  @Input() isRequired: boolean = false;

  /**
   * Define if a required marker should be included
   */
  @Input() hideRequiredMarker: boolean = false;

  /**
   * Define a hint for the input
   * TODO: Fix potential overlap of hint and error messages
   */
  @Input() hint: string;

  /**
   * Define the label
   */
  @Input() label: string;

  /**
   * Define a Material icon to include before the input
   */
  @Input() prefixIcon: string;

  /**
   * Define the form control to get access to validators
   * (for form control support)
   */
  @Input() formControl: any;

  /**
   * Define if the input should spellcheck
   * (standard HTML5 property)
   */
  @Input() spellcheck: boolean = true;

  /**
   * Return the value
   * (for form control support)
   */
  get value(): any {
    return this.innerValue;
  };

  /**
   * Set the accessor and call the onchange callback
   * (for form control support)
   */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }


  /**
   * Set touched on blur
   * (for form control support)
   */
  onBlur() {
    this.onTouchedCallback();
  }


  /**
   * Register onChange callback (from ControlValueAccessor interface)
   * (for form control support)
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }


  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   * (for form control support)
   */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


  /**
   * Clear the input's value
   */
  reset(): void {
    this.value = '';
  }


  /**
   * Write value to inner value (from ControlValueAccessor interface)
   * (for form control support)
   */
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
