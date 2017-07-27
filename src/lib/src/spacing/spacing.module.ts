import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
export { TsVerticalSpacingDirective } from './vertical-spacing.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsVerticalSpacingDirective,
  ],
  declarations: [
    TsVerticalSpacingDirective,
  ],
})
export class TsSpacingModule {}
