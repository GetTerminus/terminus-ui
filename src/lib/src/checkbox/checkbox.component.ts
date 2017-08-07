import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { TsStyleThemeTypes } from './../types/style-theme.types';


/**
 * @private Custom control value accessor for our component
 *
 * FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
 * a base class that others can extend? (Not sure how to pass in a named component like below)
 */
export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsCheckboxComponent),
  multi: true
};

/**
 * @private Placeholder function.
 * Will be overridden by Control Value Accessor during initialization
 */
const noop = () => {};


/**
 * This is the checkbox UI Component
 *
 * @example
 * <ts-checkbox
 *              formControlName="rememberMe"
 *              [formControl]="yourHelperToGetFormControl('rememberMe')"
 *              isChecked="true"
 *              isDisabled="false"
 *              isIndeterminate="false"
 *              isRequired="false"
 *              (inputChange)="myMethod($event)"
 *              (indeterminateChange)="myMethod($event)"
 * ></ts-checkbox>
 */
@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
})
export class TsCheckboxComponent {
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
   * Define the form control to get access to validators
   * (for form control support)
   */
  @Input() formControl: any;

  /**
   * Define if the checkbox is checked
   */
  @Input() isChecked: boolean = false;

  /**
   * Define if the checkbox is disabled
   */
  @Input() isDisabled: boolean = false;

  /**
   * Define if the checkbox should be indeterminate
   */
  @Input() isIndeterminate: boolean = false;
  /**
   * Define if the checkbox is required
   */
  @Input() isRequired: boolean = false;

  /**
   * Define the theme
   */
  @Input() theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event on input change
   */
  @Output() inputChange: EventEmitter<any> = new EventEmitter;

  /**
   * Emit a change when moving from the indeterminate state
   */
  @Output() indeterminateChange: EventEmitter<any> = new EventEmitter;

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
   * Write value to inner value (from ControlValueAccessor interface)
   * (for form control support)
   */
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
