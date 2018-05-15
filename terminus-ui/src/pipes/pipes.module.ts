import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatePipe } from './date/date.pipe';
import { TsRoundNumberPipe } from './round-number/round-number.pipe';
import { TsSentenceCasePipe } from './sentence-case/sentence-case.pipe';
import { TsTimeAgoPipe } from './time-ago/time-ago.pipe';

export * from './date/date.pipe';
export * from './round-number/round-number.pipe';
export * from './sentence-case/sentence-case.pipe';
export * from './time-ago/time-ago.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
  ],
  providers: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
  ],
  declarations: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
  ],
})
export class TsPipesModule {}
