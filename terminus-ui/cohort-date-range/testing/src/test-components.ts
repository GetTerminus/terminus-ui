import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TsDateRangeComponent,
  TsDateRangeModule,
} from '@terminus/ui/date-range';

import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TsCohortDateRangeModule } from '@terminus/ui/cohort-date-range';
import { createDateRangeGroup } from '@terminus/ui/date-range/testing';


@Component({
  template: `
      <ts-cohort-date-range
        [allowCustomDates]="allowCustomDates"
        [cohorts]="dateCohorts"
      ></ts-cohort-date-range>
  `,
})

export class Basic {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public dateCohorts = [{
    display: 'last year',
    range: {
      start: this.date1,
      end: this.date2,
    },
  }];
  public allowCustomDates = true;
}

@Component({
  template: `
      <ts-cohort-date-range
        [allowCustomDates]="allowCustomDates"
        [cohorts]="dateCohorts"
        (cohortDateRangeChanged)="cohortDateRangeChanged()"
      ></ts-cohort-date-range>
  `,
})

// tslint:disable-next-line:component-class-suffix
export class Standard {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public dateCohorts = [{
    display: 'Custom Dates',
    range: {
      start: '',
      end: '',
    },
  }];
  public allowCustomDates = true;
  public cohortDateRangeChanged() { }
}

/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    TsDateRangeModule,
    TsCohortDateRangeModule,
  ],
  declarations: [
    Basic,
    Standard,
  ],
})
export class TsCohortDateRangeTestComponentsModule {}
