import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types';
import { TsSelectItem } from './../utilities/interfaces/select.interface';


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
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'ts-select',
  },
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
   * Define the 'hint' for the select
   */
  @Input()
  public hint: string;

  /**
   * Define a list of select items
   */
  @Input()
  public items: TsSelectItem[] = [];

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
   * Emit event when the select has been opened
   */
  @Output()
  public openedChange: EventEmitter<boolean> = new EventEmitter();

  /**
   * Emit event when the select value is changed
   */
  @Output()
  public selectionChange: EventEmitter<TsSelectItem[]> = new EventEmitter();


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


  /**
   * Mark the form control as touched when closed without a selection
   *
   * @param open - The value representing if the select is open or closed
   */
  public checkOpenChange(open: boolean): void {
    const isOpen = coerceBooleanProperty(open);

    // If the panel has been closed and only allows a single selection
    if (!isOpen) {
      // And we have a form control
      // istanbul ignore else
      if (this.formControl && this.formControl.markAsTouched) {
        this.formControl.markAsTouched();
      }
    }

    // Alert consumers
    this.openedChange.emit(isOpen);
  }

}
