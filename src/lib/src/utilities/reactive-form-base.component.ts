import {
  Component,
  Input,
} from '@angular/core';

import { noop } from './noop';


/**
 * This is the base class for all custom reactive form elements.
 *
 * @example
 * export class TsInputComponent extends TsReactiveFormBaseComponent {}
 */
@Component({
  /*
   * NOTE: Without this dummy selector, this class isn't picked up by the docs generator
   */
  selector: 'ts-dummy-selector',
})
export class TsReactiveFormBaseComponent {
  /**
   * Define the internal data model
   * (for form control support)
   */
  protected innerValue: any = '';

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   * (for form control support)
   */
  protected onChangeCallback: (_: any) => void = noop;

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   * (for form control support)
   */
  protected onTouchedCallback: () => void = noop;

  /**
   * Define the form control to get access to validators
   * (for form control support)
   */
  @Input() protected formControl: any;

  /**
   * Return the value
   * (for form control support)
   */
  protected get value(): any {
    return this.innerValue;
  };

  /**
   * Set the accessor and call the onchange callback
   * (for form control support)
   */
  protected set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }


  /**
   * Set touched on blur
   * (for form control support)
   */
  protected onBlur() {
    this.onTouchedCallback();
  }


  /**
   * Register onChange callback (from ControlValueAccessor interface)
   * (for form control support)
   */
  protected registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }


  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   * (for form control support)
   */
  protected registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


  /**
   * Write value to inner value (from ControlValueAccessor interface)
   * (for form control support)
   */
  protected writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
