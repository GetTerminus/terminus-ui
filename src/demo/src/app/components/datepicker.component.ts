import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'demo-datepicker',
  template: `
  <form [formGroup]="myForm" novalidate>
    <ts-datepicker
      formControlName="date"
      [formControl]="getControl('date')"
      [dateFilter]="myFilter"
      [startingView]="startView"
      initialDate="{{ myDate }}"
      [isDisabled]="isDisabled"
      name="date"
      maxDate="{{ maxDate }}"
      minDate="{{ minDate }}"
      (selected)="dateSelected($event)"
    ></ts-datepicker>

    <br>
    <br>

    <button (click)="submit(myForm.value)">Submit</button>
  </form>
  `,
})
export class DatepickerComponent {
  isDisabled = false;
  startView = 'month';
  minDate = new Date(2017, 4, 2);
  myDate = new Date(2017, 4, 14);
  maxDate = new Date(2017, 4, 20);

  myForm = this.formBuilder.group({
    date: [
      null,
      [
        Validators.required,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  dateSelected(e: any) {
    console.log('Date selected!: ', e);
  }

  getControl(name: string): AbstractControl {
    return this.myForm.get(name);
  }

  submit(v: any) {
    console.log('Demo submit!: ', v);
  }

}
