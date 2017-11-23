import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsSpacingService } from './spacing.service';
import { TsVerticalSpacingDirective } from './vertical-spacing.directive';
export { TsVerticalSpacingDirective } from './vertical-spacing.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsVerticalSpacingDirective,
  ],
  providers: [
    TsSpacingService,
  ],
  exports: [
    TsVerticalSpacingDirective,
  ],
})
export class TsSpacingModule {}
