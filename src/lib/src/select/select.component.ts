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

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types';


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsSelectComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * A component to create a select menu
 *
 * #### QA CSS CLASSES
 * - `qa-select`: Placed on the select element which contains this component
 * - `qa-select-option`: Placed on the option element which represents each option in the select box
 *
 * @example
 * <ts-select
 *              formControlName="email"
 *              [formControl]="yourHelperToGetFormControl('email')"
 *              blankChoice="Please choose one."
 *              label="Please select one: "
 *              items="[{},{},{}]"
 *              multipleAllowed="true"
 *              theme="primary"
 *              (open)="myMethod($event)"
 *              (close)="myMethod($event)"
 *              (change)="myMethod($event)"
 * ></ts-select>
 *
 * <example-url>https://embed.plnkr.co/plunk/v2ey7q6Hl2jr2KIw?show=preview</example-url>
 */
@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsSelectComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the content for a blank option (no content means no options will show)
   * NOTE: This is disabled if `multipleAllowed` is true
   */
  @Input()
  public blankChoice: string;

  /**
   * Define the label for the menu
   */
  @Input()
  public label: string = '';

  /**
   * Define a list of select items
   */
  @Input()
  public items: any = [];

  /**
   * Define if multiple selections are allowed
   */
  @Input()
  public multipleAllowed: boolean = false;

  /**
   * Define the color theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the key that represents the value item from the object
   */
  @Input()
  public valueKey: string;

  /**
   * Emit event when the select is opened
   */
  @Output()
  public open: EventEmitter<boolean> = new EventEmitter();

  /**
   * Emit event when the select is closed
   */
  @Output()
  public close: EventEmitter<boolean> = new EventEmitter();

  /**
   * Emit event when the select value is changed
   */
  @Output()
  public change: EventEmitter<any[]> = new EventEmitter();


  /**
   * Return the specified value from the object
   *
   * @param item - The object representing the item
   * @param valueKey - The string representing the value key
   * @return The value of the valueKey or the item itself
   */
  public getValueKey(item: object, valueKey?: string): string {
    return valueKey ? item[valueKey] : item;
  }

}
