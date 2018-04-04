import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsDatepickerComponent } from './datepicker.component';

export * from './datepicker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
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
