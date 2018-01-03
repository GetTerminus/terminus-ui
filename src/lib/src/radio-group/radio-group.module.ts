import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsRadioGroupComponent } from './radio-group.component';
export { TsRadioGroupComponent } from './radio-group.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    TsValidationMessagesModule,
  ],
  exports: [
    TsRadioGroupComponent,
  ],
  declarations: [
    TsRadioGroupComponent,
  ],
})
export class TsRadioGroupModule {}
