import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsDrawerModule } from '@terminus/ui/drawer';
import { TsExpansionPanelModule } from '@terminus/ui/expansion-panel';
import { TsRadioGroupModule } from '@terminus/ui/radio-group';
import { TsSpacingModule } from '@terminus/ui/spacing';


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
    TsExpansionPanelModule,
  ],
  declarations: [
    DrawerComponent,
  ],
})
export class DrawerModule {}
