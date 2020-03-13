import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { noop } from '@terminus/ngx-tools/utilities';


/**
 * This is the base class for all custom reactive form elements.
 *
 * @example
 * export class TsInputComponent extends TsReactiveFormBaseComponent {}
 */
// NOTE: OnPush will be enabled in all classes that extend this class.
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection, @angular-eslint/use-component-selector
@Component({ template: `` })
export class TsReactiveFormBaseComponent {
  /**
   * Define the internal data model
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected innerValue: any = '';

  /**
   * Define placeholder for callback (provided later by the control value accessor)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   *
   * @param v
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   *
   * @param fn
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected registerOnChange(fn: (_: any) => void) {
    this.onChangeCallback = fn;
  }

  /**
   * Register onTouched callback (from ControlValueAccessor interface)
   *
   * @param fn
   */
  protected registerOnTouched(fn: () => void) {
    this.onTouchedCallback = fn;
  }

  /**
   * Write value to inner value (from ControlValueAccessor interface)
   *
   * @param value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected writeValue(value: any) {
    // istanbul ignore else
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
}
