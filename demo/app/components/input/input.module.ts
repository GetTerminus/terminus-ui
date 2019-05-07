import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsInputModule } from '@terminus/ui/input';
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
    TsCardModule,
    TsInputModule,
    TsSelectModule,
    TsSpacingModule,
  ],
  declarations: [
    InputComponent,
  ],
})
export class InputModule {}
