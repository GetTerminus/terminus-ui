import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import { TsStyleThemeTypes } from './../types/style-theme.types';


/**
 * This is the checkbox UI Component
 *
 * @example
 * <ts-checkbox
 *              isChecked="true"
 *              isDisabled="false"
 *              isIndeterminate="false"
 *              isRequired="false"
 *              (inputChange)="myMethod($event)"
 *              (indeterminateChange)="myMethod($event)"
 *              item="Value"
 * ></ts-checkbox>
 */
@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class TsCheckboxComponent {
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
   * @hidden
   */
  constructor(
  ) {}

}
