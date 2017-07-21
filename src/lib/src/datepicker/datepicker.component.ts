import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';


export type TsStartingViewTypes =
  'month' |
  'year';

/**
 * This is the datepicker UI Component
 *
 * @example
 * <datepicker
 *              [dateFilter]="myDateFilter"
 *              inputPlaceholder="Set a date"
 *              maxDate="new Date(1990, 1, 1)"
 *              minDate="new Date(1990, 1, 1)"
 *              startingView="year"
 *              startDate="new Date(1990, 1, 1)"
 *              (selected)="changeSelected($event)"
 * ></datepicker>
 */
@Component({
  selector: 'ts-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class TsDatepickerComponent {
  /**
   * Define a date filter to disallow certain dates
   */
  @Input() dateFilter: any;

  /**
   * Define the placeholder
   */
  @Input() inputPlaceholder: string = 'Set date';

  /**
   * Define the maximum date requirement
   */
  @Input() maxDate: Date;

  /**
   * Define the minimum date requirement
   */
  @Input() minDate: Date;

  /**
   * Define a starting date for the datepicker
   */
  @Input() startDate: Date;

  /**
   * Define the starting view of the datepicker
   */
  @Input() startingView: TsStartingViewTypes = 'month';

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output() selected = new EventEmitter();
}
