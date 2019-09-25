import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  endOfDay,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';

const currentDate: Date = new Date();

@Component({
  selector: 'demo-cohort-date-range',
  templateUrl: './cohort-date-range.component.html',
})
export class CohortDateRangeComponent {
  public myForm: FormGroup = this.formBuilder.group({
    dateRange: this.formBuilder.group({
      startDate: [
        null,
        [
          Validators.required,
        ],
      ],
      endDate: [
        null,
        [Validators.required],
      ],
    }),
  });
  public cohorts = [{
    display: 'Last 90 days',
    range: {
      start: startOfDay(subDays(new Date(), 90)),
      end: currentDate,
    },
  }, {
    display: 'Last full month',
    range: {
      start: startOfDay(subMonths(startOfMonth(currentDate), 1)),
      end: endOfDay(subDays(startOfMonth(currentDate), 1)),
    },
  }, {
    display: 'Custom dates',
    range: {
      start: '',
      end: '',
    },
  }];


  constructor(
    private formBuilder: FormBuilder,
  ) {}



  public printRange(formValue: any): void {
    console.log('DEMO: formValue: ', formValue);
  }

}
