import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker',
  template: `
    <ts-datepicker
      [dateFilter]="myFilter"
      [startingView]="startView"
      [startDate]="myDate"
      (selected)="dateSelected($event)"
    ></ts-datepicker>
  `,
})
export class DatepickerComponent {
  startView = 'month';

  myDate = new Date(2017, 7, 5);

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  dateSelected(e: any) {
    console.log('Date selected!: ', e);
  }
}
