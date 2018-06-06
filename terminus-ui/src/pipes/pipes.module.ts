import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatePipe } from './date/date.pipe';
import { TsRoundNumberPipe } from './round-number/round-number.pipe';
import { TsSentenceCasePipe } from './sentence-case/sentence-case.pipe';
import { TsTimeAgoPipe } from './time-ago/time-ago.pipe';
import { TsTitleCasePipe } from './title-case/title-case.pipe';

export * from './date/date.pipe';
export * from './round-number/round-number.pipe';
export * from './sentence-case/sentence-case.pipe';
export * from './time-ago/time-ago.pipe';
export * from './title-case/title-case.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
    TsTitleCasePipe,
  ],
  providers: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
    TsTitleCasePipe,
  ],
  declarations: [
    TsDatePipe,
    TsRoundNumberPipe,
    TsSentenceCasePipe,
    TsTimeAgoPipe,
    TsTitleCasePipe,
  ],
})
export class TsPipesModule {}
