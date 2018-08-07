import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Expose the MatDatepickerInputEvent event as TsDatepickerInputEvent. Used by {@link TsDatepickerComponent}
 */
export class TsDatepickerInputEvent<T> extends MatDatepickerInputEvent<T> {}


/**
 * Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via the base class
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
 * - `qa-datepicker-hint`: The hint element, if hint content is provided
 * - `qa-datepicker-toggle`: The button which displays the calendar when clicked
 * - `qa-datepicker-calendar`: The calendar control used for picking a date
 * - `qa-datepicker-validation-messages`: The validation messages container
 *
 * @example
 * <ts-datepicker
 *              [formControl]="yourHelperToGetFormControl('date')"
 *              [(ngModel)]="myModel"
 *              [dateFilter]="myDateFilter"
 *              hint="Fill this out!"
 *              inputPlaceholder="Set a date"
 *              isDisabled="false"
 *              maxDate="{{ new Date(1990, 1, 1) }}"
 *              minDate="{{ new Date(1990, 1, 1) }}"
 *              initialDate="{{ new Date(1990, 1, 1) }}"
 *              openTo="{{ new Date(1990, 1, 1) }}"
 *              startingView="year"
 *              tabIndex="{{ '2' }}"
 *              validateOnChange="true"
 *              (selected)="changeSelected($event)"
 * ></ts-datepicker>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR],
  host: {
    class: 'ts-datepicker',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDatepicker',
})
export class TsDatepickerComponent extends TsReactiveFormBaseComponent implements OnInit {
  /**
   * Expose the max date to the template
   */
  public _maxDate: Date | undefined;

  /**
   * Expose the min date to the template
   */
  public _minDate: Date | undefined;

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
   * Define a hint for the datepicker
   */
  // FIXME: Fix potential overlap of hint and error messages
  @Input()
  public hint: string | undefined;

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
  public set maxDate(value: string | Date | undefined) {
    this._maxDate = (value) ? this.verifyIsDateObject(value) : undefined;
  }

  /**
   * Define the minimum date requirement and confirm it is a Date object
   */
  @Input()
  public set minDate(value: string | Date | undefined) {
    this._minDate = (value) ? this.verifyIsDateObject(value) : undefined;
  }

  /**
   * Define a starting date for the datepicker
   */
  @Input()
  public set initialDate(value: string | Date | undefined) {
    if (!value) {
      return;
    }

    this._initialDate = this.verifyIsDateObject(value);
  }
  // NOTE: This should never return a string but getter types are required to match setter types
  public get initialDate(): string | Date | undefined {
    return this._initialDate;
  }
  public _initialDate!: Date;

  /**
   * Define a date that the datepicker calendar should open to
   */
  @Input()
  public openTo: Date | undefined;

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
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if validation messages should be shown immediately or on blur
   *
   * NOTE: Since the user may never focus the actual input, we should validate immediately
   */
  @Input()
  public validateOnChange: boolean = true;

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output()
  public selected: EventEmitter<TsDatepickerInputEvent<Date>> = new EventEmitter();

  /**
   * Define an event when the input receives a blur event
   */
  @Output()
  public inputBlur: EventEmitter<Date> = new EventEmitter();


  /**
   * Set the initial date if it exists
   */
  public ngOnInit() {
    // istanbul ignore else
    if (this.initialDate) {
      this.value = this.initialDate;
    }
  }


  /**
   * Helper method to reset the input value
   */
  public resetValue(): void {
    this.value = null;
  }


  /**
   * Convert an valid date string to a Date if needed
   *
   * NOTE: When using 1 time bindings we are required to pass in ISO stringified dates. Adding this
   * method to our setters adds support for either version
   *
   * @param date - The date
   * @return The Date object
   */
  private verifyIsDateObject(date: string | Date): Date {
    // If value is a valid date string, convert to a date
    if (!(date instanceof Date)) {
      return new Date(date);
    } else {
      return date;
    }
  }

}
