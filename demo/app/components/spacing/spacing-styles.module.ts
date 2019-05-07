import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { SpacingStylesRoutingModule } from './spacing-styles-routing.module';
import { SpacingStylesComponent } from './spacing-styles.component';


@NgModule({
  imports: [
    CommonModule,
    SpacingStylesRoutingModule,
    TsSpacingModule,
  ],
  declarations: [
    SpacingStylesComponent,
  ],
})
export class SpacingStylesModule {}
