import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { SpacingRoutingModule } from './spacing-routing.module';
import { SpacingComponent } from './spacing.component';


@NgModule({
  imports: [
    CommonModule,
    SpacingRoutingModule,
    TsSpacingModule,
  ],
  declarations: [
    SpacingComponent,
  ],
})
export class SpacingModule {}
