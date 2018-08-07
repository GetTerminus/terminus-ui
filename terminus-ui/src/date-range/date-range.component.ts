import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Define the structure of the date range object used by {@link TsDateRangeComponent}
 *
 * TODO: In the process of deprecating the `null` portion of this interface. It should be using
 * `undefined` instead.
 *
 * Deprecation target: 10.0.0
 */
export interface TsDateRange {
  /**
   * The start date of the range
   */
  start: Date | undefined | null;

  /**
   * The end date of the range
   */
  end: Date | undefined | null;
}


/**
 * This is the date-range UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-date-range`: The primary component container
 * - `qa-date-range-start-datepicker`: The start date {@link TsDatepickerComponent}
 * - `qa-date-range-end-datepicker`: The end date {@link TsDatepickerComponent}
 *
 * @example
 * <ts-date-range
 *              endMaxDate="{{ new Date(2017, 4, 30) }}"
 *              endMinDate="{{ new Date(2017, 4, 1) }}"
 *              endInitialDate="{{ new Date(2017, 4, 10) }}"
 *              separator="~"
 *              startingView="months"
 *              startMaxDate="{{ new Date(2017, 4, 30) }}"
 *              startMinDate="{{ new Date(2017, 4, 1) }}"
 *              startInitialDate="{{ new Date(2017, 4, 10) }}"
 *              [dateFormGroup]="myForm.get('dateRange')"
 *              (startSelected)="myMethod($event)"
 *              (endSelected)="myMethod($event)"
 *              (dateSelected)="myMethod($event)"
 * ></ts-date-range>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  host: {
    class: 'ts-date-range',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDateRange',
})
export class TsDateRangeComponent implements OnInit {
  /**
   * Getter to return the date range as an object
   *
   * @return The current date range
   */
  private get dateRange(): TsDateRange {
    return {
      start: this.startDate || undefined,
      end: this.endDate || undefined,
    };
  }

  /**
   * Store the selected end date
   *
   * Deprecated: `null` deprecation target 10.0.0
   */
  public endDate: Date | null | undefined;

  /**
   * Provide quick access to the endDate form control
   */
  public get endDateControl(): AbstractControl {
    const ctrl: AbstractControl | null = this.dateFormGroup ? this.dateFormGroup.get('endDate') : null;

    return ctrl ? ctrl : this.fallbackEndDateControl;
  }

  /**
   * Expose the minimum date for the endDate
   *
   * NOTE: `any` is used since we cannot seem to use union types in a BehaviorSubject
   */
  public endMinDate$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  /**
   * Define the end date placeholder
   */
  public endPlaceholder: string = 'End date';

  /**
   * Define a fallback control in case one is not passed in
   */
  private fallbackEndDateControl: FormControl = new FormControl();

  /**
   * Define a fallback control in case one is not passed in
   */
  private fallbackStartDateControl: FormControl = new FormControl();

  /**
   * Define the separator between the two date inputs
   */
  public separator: string = '-';

  /**
   * Store the selected start date
   *
   * Deprecated: `null` deprecation target 10.0.0
   */
  public startDate: Date | undefined | null;

  /**
   * Provide quick access to the startDate form control
   */
  public get startDateControl(): AbstractControl {
    const ctrl: AbstractControl | null = this.dateFormGroup ? this.dateFormGroup.get('startDate') : null;

    return ctrl ? ctrl : this.fallbackStartDateControl;
  }

  /**
   * Expose the maximum date for the startDate
   *
   * NOTE: `any` is used since we cannot seem to use union types in a BehaviorSubject
   */
  public startMaxDate$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  /**
   * Define the start date placeholder
   */
  public startPlaceholder: string = 'Start date';

  /**
   * Define the max date for the end date
   */
  @Input()
  public endMaxDate: Date | undefined;

  /**
   * Define the min date for the end date
   */
  @Input()
  public endMinDate: Date | undefined;

  /**
   * Define the initial date for the end date
   */
  @Input()
  public endInitialDate: Date | undefined;

  /**
   * Define the starting view for both datepickers
   */
  @Input()
  public startingView: 'month' | 'year' = 'month';

  /**
   * Define the max date for the starting date
   */
  @Input()
  public startMaxDate: Date | undefined;

  /**
   * Define the min date for the starting date
   */
  @Input()
  public startMinDate: Date | undefined;

  /**
   * Define the initial date for the starting date
   */
  @Input()
  public startInitialDate: Date | undefined;

  /**
   * Define the form group to attach the date range to
   */
  @Input()
  public dateFormGroup: FormGroup | AbstractControl | undefined;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Output the start date when selected
   */
  @Output()
  public startSelected: EventEmitter<Date | undefined> = new EventEmitter();

  /**
   * Output the end date when selected
   */
  @Output()
  public endSelected: EventEmitter<Date | undefined> = new EventEmitter();

  /**
   * Output the selected date range as {@link TsDateRange}
   *
   * Deprecated in favor of `change`. Target 10.0.0
   */
  @Output()
  public selectedDate: EventEmitter<TsDateRange> = new EventEmitter();

  /**
   * Event emitted anytime the range is changed
   */
  @Output()
  public change: EventEmitter<TsDateRange> = new EventEmitter();


  /**
   * Seed initial date range values
   */
  public ngOnInit(): void {
    // Seed values from @Inputs
    this.seedDateRange(this.startInitialDate, this.endInitialDate);

    // Seed values from a passed in form group
    if (this.dateFormGroup) {
      this.seedWithFormValues(this.dateFormGroup);
    }
  }


  /**
   * Seed the date range with initial values
   *
   * @param start - The initial start date
   * @param end - The initial end date
   */
  private seedDateRange(
    start: Date | null | undefined,
    end: Date | null | undefined,
  ): void {
    this.startDate = start;
    this.endDate = end;
  }


  /**
   * Seed date values from a passed in form
   *
   * @param formGroup - The date form group
   */
  private seedWithFormValues(formGroup: FormGroup | AbstractControl): void {
    if (!formGroup || !formGroup.get('startDate') || !formGroup.get('endDate')) {
      return;
    }
    const startControl: AbstractControl | null = formGroup.get('startDate');
    const endControl: AbstractControl | null = formGroup.get('endDate');
    const startValue: Date | undefined = startControl ? startControl.value : undefined;
    const endValue: Date | undefined = endControl ? endControl.value : undefined;

    // istanbul ignore else
    if (startValue) {
      this.startInitialDate = startValue;
      this.startDate = startValue;
      this.endMinDate$.next(startValue);
    }

    // istanbul ignore else
    if (endValue) {
      this.endInitialDate = endValue;
      this.endDate = endValue;
      this.startMaxDate$.next(endValue);
    }
  }


  /**
   * Emit the selected start date and date range
   *
   * @param datepickerEvent - The event received from the range start event
   * {@link TsDatepickerComponent}
   */
  public startDateSelected(datepickerEvent: MatDatepickerInputEvent<Date>): void {
    if (datepickerEvent && datepickerEvent.value) {
      this.endMinDate$.next(datepickerEvent.value);
      this.startDate = datepickerEvent.value;

      // Update the form value if a formGroup was passed in
      // istanbul ignore else
      if (this.dateFormGroup && this.startDateControl) {
        this.startDateControl.setValue(datepickerEvent.value);
      }

      this.startSelected.emit(datepickerEvent.value);
      this.selectedDate.emit(this.dateRange);
      this.change.emit(this.dateRange);
    } else {
      // If no startDate was selected, reset to the original endMinDate
      if (this.endMinDate) {
        this.endMinDate$.next(this.endMinDate);
      } else {
        // If neither were set, revert to a safe date
        this.endMinDate$.next(undefined);
      }
    }
  }


  /**
   * Emit the selected end date and date range
   *
   * @param datepickerEvent - The event received from the range end event
   * {@link TsDatepickerComponent}
   */
  public endDateSelected(datepickerEvent: MatDatepickerInputEvent<Date>): void {
    if (datepickerEvent && datepickerEvent.value) {
      this.startMaxDate$.next(datepickerEvent.value);
      this.endDate = datepickerEvent.value;

      // Update the form value if a formGroup was passed in
      // istanbul ignore else
      if (this.dateFormGroup && this.endDateControl) {
        this.endDateControl.setValue(datepickerEvent.value);
      }

      this.endSelected.emit(datepickerEvent.value);
      this.selectedDate.emit(this.dateRange);
      this.change.emit(this.dateRange);
    } else {
      if (this.startMaxDate) {
        // If no endDate was selected, reset to the original startMaxDate
        this.startMaxDate$.next(this.startMaxDate);
      } else {
        // If neither were set, revert to a safe date
        this.startMaxDate$.next(undefined);
      }
    }
  }


  /**
   * Update dates when the start date input receives a blur event
   *
   * @param date - The date entered
   */
  public startBlur(date: Date | undefined): void {
    this.startDate = date;
    this.endMinDate$.next(date);
  }


  /**
   * Update dates when the end date input receives a blur event
   *
   * @param date - The date entered
   */
  public endBlur(date: Date | undefined): void {
    this.endDate = date;
    this.startMaxDate$.next(date);
  }

}
