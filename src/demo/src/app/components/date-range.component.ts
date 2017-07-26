import { Component } from '@angular/core';

@Component({
  selector: 'demo-date-range',
  template: `
    <ts-date-range
      (selectedDate)="printRange($event)"
      [startInitialDate]="myDate"
      [endInitialDate]="myDate2"
    ></ts-date-range>
  `,
})
export class DateRangeComponent {
  myDate = new Date(2017, 4, 1);
  myDate2 = new Date(2017, 4, 7);

  printRange(e: any) {
    console.log('Date range!: ', e);
  }

}
