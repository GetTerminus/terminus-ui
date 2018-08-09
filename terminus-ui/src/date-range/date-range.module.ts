import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsInputModule } from './../input/input.module';
import { TsDateRangeComponent } from './date-range.component';

export * from './date-range.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TsInputModule,
  ],
  exports: [
    TsDateRangeComponent,
  ],
  declarations: [
    TsDateRangeComponent,
  ],
})
export class TsDateRangeModule {}
