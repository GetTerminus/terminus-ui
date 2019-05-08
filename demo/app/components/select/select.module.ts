import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsToggleModule } from '@terminus/ui/toggle';

import { SelectRoutingModule } from './select-routing.module';
import { SelectComponent } from './select.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SelectRoutingModule,
    TsCardModule,
    TsSelectModule,
    TsSpacingModule,
    TsToggleModule,
  ],
  declarations: [
    SelectComponent,
  ],
})
export class SelectModule {}
