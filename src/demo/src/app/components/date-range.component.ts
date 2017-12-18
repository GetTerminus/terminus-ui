import { Component } from '@angular/core';

@Component({
  selector: 'demo-date-range',
  template: `
    <ts-date-range
      [startInitialDate]="myDate"
      endInitialDate="{{ myDate2 }}"
      startMinDate="{{ minDate }}"
      startMaxDate="{{ maxDate }}"
      (selectedDate)="printRange($event)"
    ></ts-date-range>
  `,
})
export class DateRangeComponent {
  myDate = new Date(2017, 4, 4);
  myDate2 = new Date(2017, 4, 7);
  minDate = new Date(2017, 4, 2);
  maxDate = new Date(2017, 4, 20);

  printRange(e: any) {
    console.log('Date range!: ', e);
  }

}
