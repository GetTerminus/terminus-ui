import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TsCohortDateRangeChanged,
  TsDateCohort,
} from '@terminus/ui/cohort-date-range';
import {
  endOfDay,
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
  public constraintForm: FormGroup = this.formBuilder.group({
    startDateRange: this.formBuilder.group({
      startDate: [
        startOfDay(subDays(new Date(), 120)),
        [Validators.required],
      ],
      endDate: [
        startOfDay(subDays(new Date(), 1)),
        [Validators.required],
      ],
    }),
    endDateRange: this.formBuilder.group({
      startDate: [
        startOfDay(subDays(new Date(), 119)),
        [Validators.required],
      ],
      endDate: [
        endOfDay(new Date()),
        [Validators.required],
      ],
    }),
  });
  public cohorts: TsDateCohort[] = [
    {
      display: 'Last 90 days',
      range: {
        start: startOfDay(subDays(new Date(), 90)),
        end: currentDate,
      },
    },
    {
      display: 'Last full month',
      range: {
        start: startOfDay(subMonths(startOfMonth(currentDate), 1)),
        end: endOfDay(subDays(startOfMonth(currentDate), 1)),
      },
      active: true,
    },
  ];
  public lastRange: TsCohortDateRangeChanged | undefined;


  constructor(
    private formBuilder: FormBuilder,
  ) {}



  public printRange(value: TsCohortDateRangeChanged): void {
    // console.log('DEMO: formValue: ', value);
    this.lastRange = value;
  }

}
