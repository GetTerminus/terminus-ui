import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { TsDatepickerComponent } from './../datepicker/datepicker.component';


/**
 * This is the date-range UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-date-range`: Placed on the div element which contains this component
 * - `qa-date-range-start-datepicker`: Placed on the {@link TsDatepickerComponent} which represents the start date
 * - `qa-date-range-end-datepicker`: Placed on the {@link TsDatepickerComponent} which represents the end date
 *
 * @example
 * <ts-date-range
 *              startingView="year"
 *              separator="~"
 *              startPlaceholder="Select a date"
 *              startMaxDate="{{ new Date(2017, 4, 30) }}"
 *              startMinDate="{{ new Date(2017, 4, 1) }}"
 *              startInitialDate="{{ new Date(2017, 4, 10) }}"
 *              endPlaceholder="value"
 *              endMaxDate="{{ new Date(2017, 4, 30) }}"
 *              endMinDate="{{ new Date(2017, 4, 1) }}"
 *              endInitialDate="{{ new Date(2017, 4, 10) }}"
 *              (startSelected)="myMethod($event)"
 *              (endSelected)="myMethod($event)"
 *              (dateSelected)="myMethod($event)"
 * ></ts-date-range>
 *
 * <example-url>https://embed.plnkr.co/plunk/wUSgHiloMlzdKeDN?show=preview</example-url>
 */
@Component({
  selector: 'ts-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class TsDateRangeComponent {
  /**
   * @private Store the selected start date
   */
  _startDate: Date;

  /**
   * @private Store the selected end date
   */
  _endDate: Date;

  /**
   * Allow access to child directive
   */
  @ViewChild('end')
  public end: TsDatepickerComponent;

  /**
   * Define the starting view for both datepickers
   */
  @Input()
  public startingView: 'month' | 'year' = 'month';

  /**
   * Define the separator between the two date inputs
   */
  @Input()
  public separator: string = '-';

  /**
   * Define the start date placeholder
   */
  @Input()
  public startPlaceholder: string;

  /**
   * Define the max date for the starting date
   */
  @Input()
  public startMaxDate: Date;

  /**
   * Define the min date for the starting date
   */
  @Input()
  public startMinDate: Date;

  /**
   * Define the initial date for the starting date
   */
  @Input()
  public startInitialDate: string;

  /**
   * Define the end date placeholder
   */
  @Input()
  public endPlaceholder: string;

  /**
   * Define the max date for the end date
   */
  @Input()
  public endMaxDate: Date;

  /**
   * Define the min date for the end date
   */
  @Input()
  public endMinDate: Date;

  /**
   * Define the initial date for the end date
   */
  @Input()
  public endInitialDate: string;

  /**
   * Output the start date when selected
   */
  @Output()
  public startSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Output the end date when selected
   */
  @Output()
  public endSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Output the selected date range
   */
  @Output()
  public selectedDate: EventEmitter<any> = new EventEmitter();


  /**
   * Emit the selected start date and date range
   *
   * @param {date} date The selected date
   */
  public startDateSelected(date: Date): void {
    if (date) {
      this._startDate = date;
      /*
       * NOTE: We don't want an end date that is before the start date, so when a start date is
       * chosen, we set it as the minimum end date
       */
      this.endMinDate = this._startDate;

      const dateIsAfter = this._endDate && date.getTime() > this._endDate.getTime();

      // If the new start date is after the existing end date
      if (dateIsAfter) {
        // Clear the existing end date
        this._endDate = null;
        // TODO: If the end datepicker has a default value, 'reset' doesn't clear the value
        // We should amend this or add a separate method to clear.
        this.end.resetValue();
      }

      this.startSelected.emit(date);
      this.selectedDate.emit(this.dateRange);
    }
  }


  /**
   * Emit the selected end date and date range
   *
   * @param {date} date The selected date
   */
  public endDateSelected(date: Date): void {
    if (date) {
      this._endDate = date;

      this.endSelected.emit(date);
      this.selectedDate.emit(this.dateRange);
    }
  }


  /**
   * @private Getter to return the date range as an object
   *
   * @return {Object} dateRange The current date range
   */
  get dateRange(): any {
    return {
      start: this._startDate || null,
      end: this._endDate || null,
    };
  }

}
