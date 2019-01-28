import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';

export * from './vertical-spacing.directive';
export * from './spacing.constant';


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
