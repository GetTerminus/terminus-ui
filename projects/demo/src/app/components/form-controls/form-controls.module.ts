import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule, ReactiveFormsModule,
} from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsInputModule } from '@terminus/ui/input';
import { TsOptionModule } from '@terminus/ui/option';
import { TsRadioGroupModule } from '@terminus/ui/radio-group';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSelectionListModule } from '@terminus/ui/selection-list';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsToggleModule } from '@terminus/ui/toggle';

import { FormControlsRoutingModule } from './form-controls-routing.module';
import { FormControlsComponent } from './form-controls.component';
import { RowComponent } from './row.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormControlsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsCardModule,
    TsCheckboxModule,
    TsInputModule,
    TsOptionModule,
    TsRadioGroupModule,
    TsSelectionListModule,
    TsSelectModule,
    TsSpacingModule,
    TsToggleModule,
  ],
  declarations: [
    FormControlsComponent,
    RowComponent,
  ],
})
export class FormControlsModule {}
