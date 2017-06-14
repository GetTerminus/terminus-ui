import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdIconModule,
} from '@angular/material';

import { TsInputMessagesModule } from './../input-messages/input-messages.module';

import { TsInputComponent } from './input.component';
export { TsInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
    TsInputMessagesModule,
  ],
  exports: [
    TsInputComponent,
  ],
  declarations: [
    TsInputComponent,
  ],
})
export class TsInputModule {}

