import {
  Component,
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsDateRangeModule } from '@terminus/ui/date-range';

import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsCohortDateRangeModule,
  TsDateCohort,
} from '@terminus/ui/cohort-date-range';


@Component({
  template: `
      <ts-cohort-date-range
        [allowCustomDates]="allowCustomDates"
        [cohorts]="dateCohorts"
        (cohortDateRangeChanged)="cohortDateRangeChanged()"
      ></ts-cohort-date-range>
  `,
})
export class Basic {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public dateCohorts: TsDateCohort[] = [{
    display: 'last year',
    range: {
      start: this.date1,
      end: this.date2,
    },
  }];
  public allowCustomDates = true;
  public cohortDateRangeChanged() { }
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
  public dateCohorts: TsDateCohort[] = [{
    display: 'Custom Dates',
    range: {
      start: '',
      end: '',
    },
  }];
  public allowCustomDates = true;
  public cohortDateRangeChanged() { }
}

@Component({
  template: `
    <ts-cohort-date-range
      [cohorts]="dateCohorts"
    ></ts-cohort-date-range>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class DefaultCohort {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public date3 = new Date(2019, 1, 1);
  public date4 = new Date(2019, 2, 1);
  public dateCohorts: TsDateCohort[] = [
    {
      display: 'cohort one',
      range: {
        start: this.date1,
        end: this.date2,
      },
    },
    {
      display: 'cohort two',
      range: {
        start: this.date3,
        end: this.date4,
      },
      active: true,
    },
  ];
}

@Component({
  template: `
    <ts-cohort-date-range
      [allowCustomDates]="false"
      [cohorts]="dateCohorts"
    ></ts-cohort-date-range>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class NoCustomDates {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public dateCohorts: TsDateCohort[] = [
    {
      display: 'cohort one',
      range: {
        start: this.date1,
        end: this.date2,
      },
    },
  ];
}

@Component({
  template: `
    <ts-cohort-date-range
      [allowCustomDates]="false"
      [cohorts]="[]"
    ></ts-cohort-date-range>
  `,
})
// tslint:disable-next-line:component-class-suffix
export class NoCohorts {}

@Component({
  template: `
      <ts-cohort-date-range
        [allowCustomDates]="allowCustomDates"
        [cohorts]="dateCohorts"
        (cohortDateRangeChanged)="cohortDateRangeChanged()"
        [startMinDate]="startMinDate"
        [startMaxDate]="startMaxDate"
        [endMinDate]="endMinDate"
        [endMaxDate]="endMaxDate"
      ></ts-cohort-date-range>
  `,
})
export class DateConstraints {
  public date1 = new Date(2018, 1, 1);
  public date2 = new Date(2018, 2, 1);
  public startMinDate = new Date(2020, 0, 1);
  public startMaxDate = new Date(2020, 0, 25);
  public endMinDate = new Date(2020, 2, 1);
  public endMaxDate = new Date(2020, 2, 25);
  public dateCohorts: TsDateCohort[] = [{
    display: 'last year',
    range: {
      start: this.date1,
      end: this.date2,
    },
  }];
  public allowCustomDates = true;
  public cohortDateRangeChanged() { }
}


export type TsCohortDateRangeTestComponent
  = Basic
  | DefaultCohort
  | NoCohorts
  | NoCustomDates
  | Standard
  | DateConstraints
;

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
    DefaultCohort,
    NoCohorts,
    NoCustomDates,
    Standard,
    DateConstraints,
  ],
})
export class TsCohortDateRangeTestComponentsModule {}
