import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsToggleModule } from '@terminus/ui/toggle';

import { ToggleRoutingModule } from './toggle-routing.module';
import { ToggleComponent } from './toggle.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleRoutingModule,
    TsCardModule,
    TsSpacingModule,
    TsToggleModule,
  ],
  declarations: [
    ToggleComponent,
  ],
})
export class ToggleModule {}
