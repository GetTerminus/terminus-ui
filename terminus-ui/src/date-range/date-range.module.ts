import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsDatepickerModule } from './../datepicker/datepicker.module';
import { TsDateRangeComponent } from './date-range.component';

export * from './date-range.component';


@NgModule({
  imports: [
    CommonModule,
    TsDatepickerModule,
    FlexLayoutModule,
  ],
  exports: [
    TsDateRangeComponent,
  ],
  declarations: [
    TsDateRangeComponent,
  ],
})
export class TsDateRangeModule {}
