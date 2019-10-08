import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsCardModule } from '@terminus/ui/card';

import { BreakpointsRoutingModule } from './breakpoints-routing.module';
import { BreakpointsComponent } from './breakpoints.component';


@NgModule({
  imports: [
    BreakpointsRoutingModule,
    CommonModule,
    TsCardModule,
  ],
  declarations: [
    BreakpointsComponent,
  ],
})
export class BreakpointsModule {}
