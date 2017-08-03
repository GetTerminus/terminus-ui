import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdIconModule,
} from '@angular/material';

import { ValidationService } from './../services/validation/validation.service';
import { TsValidationMessagesComponent } from './validation-messages.component';
export { TsValidationMessagesComponent } from './validation-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
  ],
  exports: [
    TsValidationMessagesComponent,
  ],
  declarations: [
    TsValidationMessagesComponent,
  ],
  providers: [
    ValidationService,
  ],
})
export class TsValidationMessagesModule {}
