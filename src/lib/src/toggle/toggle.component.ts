import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MdSlideToggleChange } from '@angular/material';

import { noop } from './../utilities/noop';
import { TsStyleThemeTypes } from './../types/style-theme.types';

/**
 * Custom control value accessor for our component
 *
 * FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
 * a base class that others can extend? (Not sure how to pass in a named component like below)
 */
export const CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsToggleComponent),
  multi: true
};


/**
 * The is a toggle component
 *
 * @example
 * <ts-toggle
 *              formControlName="thingIsDisabled"
 *              [formControl]="yourHelperToGetFormControl('thingIsDisabled')"
 *              arialLabel="Disable my thing"
 *              isDisabled="true"
 *              isRequired="true"
 *              labelPosition="before"
 *              name="My toggle"
 *              theme="accent"
 *              (change)="myMethod($event)"
 * ></ts-toggle>
 */
@Component({
  selector: 'ts-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR],
})
export class TsToggleComponent {
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
   * Define the aria label
   */
  @Input() ariaLabel: string;

  /**
   * Define if the toggle should be disabled
   */
  @Input() isDisabled: boolean = false;

  /**
   * Define if the toggle is required
   */
  @Input() isRequired: boolean = true;

  /**
   * Define the position of the label
   */
  @Input() labelPosition: 'before' | 'after' = 'after';

  /**
   * Define the input name for the toggle
   */
  @Input() name: string = 'toggle';

  /**
   * Define the theme
   */
  @Input() theme: TsStyleThemeTypes = 'primary';

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
   * Emit an event each time the toggle value changes
   */
  @Output() change = new EventEmitter<MdSlideToggleChange>();


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
   * Write value to inner value (from ControlValueAccessor interface)
   * (for form control support)
   */
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

}
