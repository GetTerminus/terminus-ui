import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsInputModule } from '@terminus/ui/input';

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
