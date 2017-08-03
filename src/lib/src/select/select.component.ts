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

import { noop } from './../utilities/noop';

/**
 * Custom control value accessor for our component
 *
 * FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
 * a base class that others can extend? (Not sure how to pass in a named component like below)
 */
export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsSelectComponent),
  multi: true
};


/**
 * A component to create a select menu
 *
 * @example
 * <ts-select
 *              formControlName="email"
 *              [formControl]="yourHelperToGetFormControl('email')"
 *              blankChoice="Please choose one."
 *              label="Please select one:"
 *              items="[{},{},{}]"
 *              multipleAllowed="true"
 *              (open)="myMethod($event)
 *              (close)="myMethod($event)
 *              (change)="myMethod($event)
 * ></ts-select>
 */
@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class TsSelectComponent {
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
   * Define the content for a blank option (no content means no options will show)
   * NOTE: This is disabled if `multipleAllowed` is true
   */
  @Input() blankChoice: string;

  /**
   * Define the label for the menu
   */
  @Input() label: string = '';

  /**
   * Define a list of select items
   */
  @Input() items: any = [];

  /**
   * Define if multiple selections are allowed
   */
  @Input() multipleAllowed: boolean = false;

  /**
   * Define the key that represents the value item from the object
   */
  @Input() valueKey: string;

  /**
   * Define the form control to get access to validators
   * (for form control support)
   */
  @Input() formControl: any;

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
   * Emit event when the select is opened
   */
  @Output() open = new EventEmitter<boolean>();

  /**
   * Emit event when the select is closed
   */
  @Output() close = new EventEmitter<boolean>();

  /**
   * Emit event when the select value is changed
   */
  @Output() change = new EventEmitter<any>();

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
   * Return the specified value from the object
   *
   * @param {Object} item The object representing the item
   * @param {String} valueKey The string representing the value key
   * @return {String} value The value of the valueKey or the item itself
   */
  getValueKey(item: object, valueKey?: string): string {
    return valueKey ? item[valueKey] : item;
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
