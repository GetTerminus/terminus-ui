import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { TsStyleThemeTypes } from './../utilities/types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * @private Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via our base class
 */
export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsCheckboxComponent),
  multi: true
};


/**
 * This is the checkbox UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-checkbox`: Placed on the checkbox input element used for this component
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsCheckboxComponent extends TsReactiveFormBaseComponent {
  /**
   * Define if the checkbox is checked
   */
  @Input()
  public isChecked: boolean = false;

  /**
   * Define if the checkbox is disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the checkbox should be indeterminate
   */
  @Input()
  public isIndeterminate: boolean = false;

  /**
   * Define if the checkbox is required
   */
  @Input()
  public isRequired: boolean = false;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event on input change
   */
  @Output()
  public inputChange: EventEmitter<any> = new EventEmitter;

  /**
   * Emit a change when moving from the indeterminate state
   */
  @Output()
  public indeterminateChange: EventEmitter<any> = new EventEmitter;
}
