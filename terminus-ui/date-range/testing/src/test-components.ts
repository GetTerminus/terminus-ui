// tslint:disable: component-class-suffix
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

import { createDateRangeGroup } from './test-helpers';


@Component({
  template: `
  <form [formGroup]="dateGroup" novalidate>
    <ts-date-range
      [dateFormGroup]="dateGroup"
    ></ts-date-range>
  </form>
  `,
})
export class Basic {
  dateGroup = createDateRangeGroup();

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;
}

@Component({
  template: `
  <form [formGroup]="dateGroup" novalidate>
    <ts-date-range
      [dateFormGroup]="dateGroup"
    ></ts-date-range>
  </form>
  `,
})
export class SeededDates {
  date1 = new Date(2018, 1, 1);
  date2 = new Date(2018, 1, 12);
  dateGroup = createDateRangeGroup(this.date1, this.date2);

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;
}

@Component({
  template: `
  <form [formGroup]="dateGroup" novalidate>
    <ts-date-range
      [dateFormGroup]="dateGroup"
      (dateRangeChange)="dateRangeChange($event)"
      (endSelected)="endSelected($event)"
      (startSelected)="startSelected($event)"
    ></ts-date-range>
  </form>
  `,
})
export class Emitters {
  dateGroup = createDateRangeGroup();
  dateRangeChange = jest.fn();
  endSelected = jest.fn();
  startSelected = jest.fn();

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;
}

@Component({
  template: `
  <form [formGroup]="dateGroup" novalidate>
    <ts-date-range
      [dateFormGroup]="dateGroup"
      [endMaxDate]="endMax"
      [endMinDate]="endMin"
      [isDisabled]="disabled"
      [startingView]="startingView"
      [startMaxDate]="startMax"
      [startMinDate]="startMin"
      [theme]="theme"
    ></ts-date-range>
  </form>
  `,
})
export class Params {
  dateGroup = createDateRangeGroup();
  endMax = new Date(2017, 4, 25);
  endMin = new Date(2017, 4, 1);
  disabled = true;
  startingView = 'year';
  startMax = new Date(2017, 5, 25);
  startMin = new Date(2017, 5, 1);
  theme = 'accent';

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;
}

@Component({
  template: `
  <ts-date-range
    (startSelected)="startSelected($event)"
  ></ts-date-range>`,
})
export class NoFormGroup {
  startSelected = jest.fn();

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;
}

@Component({
  template: `
  <form [formGroup]="dateGroup" novalidate>
    <ts-date-range
      [dateFormGroup]="dateGroup"
      (startSelected)="startSelected($event)"
    ></ts-date-range>
  </form>
  `,
})
export class NoControls {
  dateGroup = this.formBuilder.group({});
  startSelected = jest.fn();

  @ViewChild(TsDateRangeComponent)
  dateRangeComponent!: TsDateRangeComponent;

  constructor(private formBuilder: FormBuilder) {}
}




/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TsDateRangeModule,
  ],
  declarations: [
    Basic,
    Emitters,
    NoControls,
    NoFormGroup,
    Params,
    SeededDates,
  ],
})
export class TsDateRangeTestComponentsModule {}
