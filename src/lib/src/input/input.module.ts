import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdIconModule,
} from '@angular/material';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsInputComponent } from './input.component';
export { TsInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdIconModule,
    TsValidationMessagesModule,
  ],
  exports: [
    TsInputComponent,
  ],
  declarations: [
    TsReactiveFormBaseComponent,
    TsInputComponent,
  ],
})
export class TsInputModule {}
