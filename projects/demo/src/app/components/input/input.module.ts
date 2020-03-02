import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsInputModule } from '@terminus/ui/input';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { InputRoutingModule } from './input-routing.module';
import { InputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputRoutingModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsCardModule,
    TsInputModule,
    TsOptionModule,
    TsSelectModule,
    TsSpacingModule,
    FlexLayoutModule,
  ],
  declarations: [
    InputComponent,
  ],
})
export class InputModule {}
