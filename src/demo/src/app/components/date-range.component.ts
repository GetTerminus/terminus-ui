import { Component } from '@angular/core';

@Component({
  selector: 'demo-date-range',
  template: `
    <ts-date-range
      (selectedDate)="printRange($event)"
    ></ts-date-range>
  `,
})
export class DateRangeComponent {

  printRange(e: any) {
    console.log('Date range!: ', e);
  }

}
