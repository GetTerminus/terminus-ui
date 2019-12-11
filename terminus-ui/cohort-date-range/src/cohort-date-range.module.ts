import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectModule } from '@terminus/ui/select';

import { TsCohortDateRangeComponent } from './cohort-date-range.component';

export * from './cohort-date-range.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TsDateRangeModule,
    TsSelectModule,
    TsOptionModule,
    ReactiveFormsModule,
  ],
  exports: [
    TsCohortDateRangeComponent,
  ],
  declarations: [
    TsCohortDateRangeComponent,
  ],
})
export class TsCohortDateRangeModule {}
