import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsSelectComponent } from './select.component';
export * from './select.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    TsValidationMessagesModule,
  ],
  exports: [
    TsSelectComponent,
  ],
  declarations: [
    TsSelectComponent,
  ],
})
export class TsSelectModule {}
