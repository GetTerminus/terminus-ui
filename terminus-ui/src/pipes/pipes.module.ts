import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatePipe } from './date/date.pipe';
import { TsTimeAgoPipe } from './time-ago/time-ago.pipe';
import { TsSentenceCasePipe } from './sentence-case/sentence-case.pipe';

export * from './date/date.pipe';
export * from './time-ago/time-ago.pipe';
export * from './sentence-case/sentence-case.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsTimeAgoPipe,
    TsDatePipe,
    TsSentenceCasePipe,
  ],
  providers: [
    TsTimeAgoPipe,
    TsDatePipe,
    TsSentenceCasePipe,
  ],
  declarations: [
    TsTimeAgoPipe,
    TsDatePipe,
    TsSentenceCasePipe,
  ],
})
export class TsPipesModule {}
