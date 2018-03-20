import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTooltipModule,
} from '@angular/material';

import { TsTooltipComponent } from './tooltip.component';
export { TsTooltipComponent } from './tooltip.component';


@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  exports: [
    TsTooltipComponent,
  ],
  declarations: [
    TsTooltipComponent,
  ],
})
export class TsTooltipModule {}
