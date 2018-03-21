import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatePipe } from './date/date.pipe';
export { TsDatePipe } from './date/date.pipe';
import { TsTimeAgoPipe } from './time-ago/time-ago.pipe';
export { TsTimeAgoPipe } from './time-ago/time-ago.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsTimeAgoPipe,
    TsDatePipe,
  ],
  declarations: [
    TsTimeAgoPipe,
    TsDatePipe,
  ],
})
export class TsPipesModule {}
