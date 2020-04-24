import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsInputModule } from '@terminus/ui/input';

import { InputRoutingModule } from './input-routing.module';
import { InputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputRoutingModule,
    ReactiveFormsModule,
    TsInputModule,
    FlexLayoutModule,
  ],
  declarations: [
    InputComponent,
  ],
})
export class InputModule {}
