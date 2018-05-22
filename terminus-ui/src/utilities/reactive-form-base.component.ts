import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { noop } from '@terminus/ngx-tools';


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
  selector: `ts-dummy-selector`,
  template: ``,
})
export class TsReactiveFormBaseComponent {
  /**
   * Define the internal data model
   */
  protected innerValue: any = '';

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   */
  protected onChangeCallback: (_: any) => void = noop;

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   */
  protected onTouchedCallback: () => void = noop;

  /**
   * Define the form control to get access to validators
   */
  @Input()
  public formControl: FormControl = new FormControl();

  /**
   * Set the accessor and call the onchange callback
   */
  public set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  public get value(): any {
    return this.innerValue;
  }


  /**
   * Set touched on blur
   */
  public onBlur() {
    this.onTouchedCallback();
  }


  /**
   * Register onChange callback (from ControlValueAccessor interface)
   */
  protected registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }


  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   */
  protected registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


  /**
   * Write value to inner value (from ControlValueAccessor interface)
   */
  protected writeValue(value: any) {
    // NOTE: Currently, this 'else' path seems untestable
    // istanbul ignore else
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
