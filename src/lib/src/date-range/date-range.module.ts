import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatepickerModule } from '@datepicker/datepicker.module';

import { TsDateRangeComponent } from '@date-range/date-range.component';
export { TsDateRangeComponent } from '@date-range/date-range.component';


@NgModule({
  imports: [
    CommonModule,
    TsDatepickerModule,
  ],
  exports: [
    TsDateRangeComponent,
  ],
  declarations: [
    TsDateRangeComponent,
  ],
})
export class TsDateRangeModule {}
