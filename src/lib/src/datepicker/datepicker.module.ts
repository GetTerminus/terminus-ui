import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsDatepickerComponent } from './datepicker.component';
export { TsDatepickerComponent } from './datepicker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    TsValidationMessagesModule,
  ],
  exports: [
    TsDatepickerComponent,
  ],
  declarations: [
    TsDatepickerComponent,
  ],
})
export class TsDatepickerModule {}
