import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';

export * from './vertical-spacing.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsVerticalSpacingDirective,
  ],
  exports: [
    TsVerticalSpacingDirective,
  ],
})
export class TsSpacingModule {}
