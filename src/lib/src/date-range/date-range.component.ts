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
 */
@Component({
  selector: 'ts-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class TsDateRangeComponent {
  /**
   * @Private Store the selected start date
   */
  private _startDate: Date;

  /**
   * @Private Store the selected end date
   */
  private _endDate: Date;

  /**
   * Allow access to child directive
   */
  @ViewChild('end') end: TsDatepickerComponent;

  /**
   * Define the starting view for both datepickers
   */
  @Input() startingView: 'month' | 'year' = 'month';

  /**
   * Define the separator between the two date inputs
   */
  @Input() separator: string = '-';

  /**
   * Define the start date placeholder
   */
  @Input() startPlaceholder: string;

  /**
   * Define the max date for the starting date
   */
  @Input() startMaxDate: Date;

  /**
   * Define the min date for the starting date
   */
  @Input() startMinDate: Date;

  /**
   * Define the initial date for the starting date
   */
  @Input() startInitialDate: string;

  /**
   * Define the end date placeholder
   */
  @Input() endPlaceholder: string;

  /**
   * Define the max date for the end date
   */
  @Input() endMaxDate: Date;

  /**
   * Define the min date for the end date
   */
  @Input() endMinDate: Date;

  /**
   * Define the initial date for the end date
   */
  @Input() endInitialDate: string;

  /**
   * Output the start date when selected
   */
  @Output() startSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Output the end date when selected
   */
  @Output() endSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Output the selected date range
   */
  @Output() selectedDate: EventEmitter<any> = new EventEmitter();


  /**
   * Emit the selected start date and date range
   *
   * @param {date} date The selected date
   */
  startDateSelected(date: Date): void {
    if (date) {
      this._startDate = date;
      // NOTE: We don't want an end date that is before the start date, so when a start date is
      // chosen, we set it as the minimum end date
      this.endMinDate = this._startDate;

      const dateIsAfter = this._endDate && date.getTime() > this._endDate.getTime();

      // If the new start date is after the existing end date
      if (dateIsAfter) {
        // Clear the existing end date
        this._endDate = null;
        this.end.resetValue();
        console.log('shouuld reset: ', this.end.value);
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
  endDateSelected(date: Date): void {
    if (date) {
      this._endDate = date;

      this.endSelected.emit(date);
      this.selectedDate.emit(this.dateRange);
    }
  }


  /**
   * Getter to return the date range as an object
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
