import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsDatepickerComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * This is the datepicker UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-datepicker`: The form-field wrapper which contains the input and button
 * - `qa-datepicker-input`: The input element which contains the chosen date
 * - `qa-datepicker-toggle`: The button which displays the calendar when clicked
 * - `qa-datepicker-calendar`: The calendar control used for picking a date
 * - `qa-datepicker-validation-messages`: The validation messages container
 *
 * @example
 * <ts-datepicker
 *              formControlName="date"
 *              [formControl]="yourHelperToGetFormControl('date')"
 *              [(ngModel)]="myModel"
 *              [dateFilter]="myDateFilter"
 *              inputPlaceholder="Set a date"
 *              maxDate="{{ new Date(1990, 1, 1) }}"
 *              minDate="{{ new Date(1990, 1, 1) }}"
 *              startingView="year"
 *              tabIndex="{{ '2' }}"
 *              initialDate="{{ new Date(1990, 1, 1) }}"
 *              (selected)="changeSelected($event)"
 * ></ts-datepicker>
 *
 * <example-url>http://bnj.bz/3J0j450T2x2b</example-url>
 */
@Component({
  selector: 'ts-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR],
})
export class TsDatepickerComponent extends TsReactiveFormBaseComponent implements OnChanges {
  /**
   * Expose the initial date to the template
   */
  public _initialDate: Date;

  /**
   * Expose the max date to the template
   */
  public _maxDate: Date;

  /**
   * Expose the min date to the template
   */
  public _minDate: Date;

  /**
   * Store the value of the input
   */
  public value: any;

  /**
   * Define a date filter to disallow certain dates
   */
  @Input()
  public dateFilter: any;

  /**
   * Define the placeholder
   */
  @Input()
  public inputPlaceholder: string = 'Select a date';

  /**
   * Define if the input should be disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define the maximum date requirement and confirm it is a Date object
   */
  @Input()
  public set maxDate(value: string | Date) {
    this._maxDate = this.convertISOToString(value);
  }

  /**
   * Define the minimum date requirement and confirm it is a Date object
   */
  @Input()
  public set minDate(value: string | Date) {
    this._minDate = this.convertISOToString(value);
  }

  /**
   * Define a starting date for the datepicker
   */
  @Input()
  public set initialDate(value: string | Date) {
    this._initialDate = this.convertISOToString(value);
  }

  /**
   * Define the starting view of the datepicker
   */
  @Input()
  public startingView: 'month' | 'year' = 'month';

  /**
   * Define the tabindex for the input
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange: boolean = false;

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output()
  public selected: EventEmitter<any> = new EventEmitter();


  /**
   * Set the initial date if it exists
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // istanbul ignore else
    if (this._initialDate) {
      this.value = this._initialDate;
    }
  }


  /**
   * Helper method to reset the input value
   */
  public resetValue(): void {
    this.value = null;
  }


  /**
   * Convert an ISO string to a date if needed.
   *
   * NOTE: When using 1 time bindings we are required to pass in ISO stringified dates. Adding this
   * method to our setters adds support for either version
   *
   * @param date - The time chosen
   * @return A date object
   */
  private convertISOToString(date: string | Date) {
    // If value is an ISO string, convert to a date
    if (!(date instanceof Date)) {
      return new Date(date);
    } else {
      return date;
    }
  }

}
