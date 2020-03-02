import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TooltipRoutingModule } from './tooltip-routing.module';
import { TooltipComponent } from './tooltip.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipRoutingModule,
    TsCardModule,
    TsSpacingModule,
    TsTooltipModule,
  ],
  declarations: [
    TooltipComponent,
  ],
})
export class TooltipModule {}
