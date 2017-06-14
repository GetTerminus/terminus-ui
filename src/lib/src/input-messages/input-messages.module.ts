import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdIconModule,
} from '@angular/material';

import { TsInputMessagesComponent } from './input-messages.component';
export { TsInputMessagesComponent } from './input-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
  ],
  exports: [
    TsInputMessagesComponent,
  ],
  declarations: [
    TsInputMessagesComponent,
  ],
})
export class TsInputMessagesModule {}


