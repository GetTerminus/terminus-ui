import {
  Component,
  Input,
  Output,
  Optional,
  Inject,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  FormControl
} from '@angular/forms';
import { ElementBase } from './../utilities/element-base';

/**
 * A component to create a select menu
 *
 * @example
 * <ts-select
 *              [(ngModel)]="myModel"
 *              blankChoice="none"
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TsSelectComponent,
      multi: true,
    },
  ],
})
export class TsSelectComponent extends ElementBase<string> {
  /**
   * Provide access to the model
   */
  @ViewChild(NgModel) model: NgModel;

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
   * @hidden
   */
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }


  /**
   * Return the specified value from the object
   *
   * @param {Object} item The object representing the item
   * @return {string} valueKey The key of the object that represents the value
   */
  getValue(item: any, valueKey: string): string {
    return valueKey ? item[valueKey] : item;
  }

}
