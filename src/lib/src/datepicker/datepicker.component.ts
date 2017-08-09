import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  ViewChild,
  SimpleChanges,
} from '@angular/core';


/**
 * This is the datepicker UI Component
 *
 * @example
 * <ts-datepicker
 *              [(ngModel)]="myModel"
 *              [dateFilter]="myDateFilter"
 *              inputPlaceholder="Set a date"
 *              maxDate="{{ new Date(1990, 1, 1) }}"
 *              minDate="{{ new Date(1990, 1, 1) }}"
 *              startingView="year"
 *              initialDate="{{ new Date(1990, 1, 1) }}"
 *              (selected)="changeSelected($event)"
 * ></ts-datepicker>
 */
@Component({
  selector: 'ts-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class TsDatepickerComponent implements OnChanges {
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
   * Define the maximum date requirement
   */
  @Input()
  public maxDate: Date;

  /**
   * Define the minimum date requirement
   */
  @Input()
  public minDate: Date;

  /**
   * Define a starting date for the datepicker
   */
  @Input()
  public initialDate: Date;

  /**
   * Define the starting view of the datepicker
   */
  @Input()
  public startingView: 'month' | 'year' = 'month';

  /**
   * Define an event emitter to alert consumers that a date was selected
   */
  @Output()
  public selected: EventEmitter<any> = new EventEmitter();


  /**
   * Set the initial date if it exists
   */
  public ngOnChanges(changes: SimpleChanges): void {
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
}
