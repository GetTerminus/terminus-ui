import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';


/**
 * This is the datepicker UI Component
 *
 * @example
 * <ts-datepicker
 *              [(ngModel)]="myModel"
 *              [dateFilter]="myDateFilter"
 *              inputPlaceholder="Set a date"
 *              maxDate="new Date(1990, 1, 1)"
 *              minDate="new Date(1990, 1, 1)"
 *              startingView="year"
 *              initialDate="new Date(1990, 1, 1)"
 *              (selected)="changeSelected($event)"
 * ></ts-datepicker>
 */
@Component({
  selector: 'ts-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class TsDatepickerComponent {
  /**
   * Store the value of the input
   */
  public value: string;

  /**
   * Define a date filter to disallow certain dates
   */
  @Input() dateFilter: any;

  /**
   * Define the placeholder
   */
  @Input() inputPlaceholder: string = 'Select a date';

  /**
   * Define if the input should be disabled
   */
  @Input() isDisabled: boolean = false;

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
  @Input() initialDate: Date;

  /**
   * Define the starting view of the datepicker
   */
  @Input() startingView: 'month' | 'year' = 'month';

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output() selected: EventEmitter<any> = new EventEmitter();


  /**
   * Helper method to reset the input value
   */
  public resetValue(): void {
    this.value = null;
  }
}
