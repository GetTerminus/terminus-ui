import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { TsButtonModule } from '@terminus/ui/button';
import { TsDrawerModule } from '@terminus/ui/drawer';
import { TsRadioGroupModule } from '@terminus/ui/radio-group';
import { DrawerRoutingModule } from './drawer-routing.module';
import { DrawerComponent } from './drawer.component';


@NgModule({
  imports: [
    CommonModule,
    DrawerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TsCardModule,
    TsRadioGroupModule,
    TsSpacingModule,
    TsDrawerModule,
    TsButtonModule,
  ],
  declarations: [
    DrawerComponent,
  ],
})
export class DrawerModule {}
