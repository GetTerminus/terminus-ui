import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';

import { TsIconModule } from './../icon/icon.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsRadioGroupComponent } from './radio-group.component';

export * from './radio-group.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    FlexLayoutModule,
    TsValidationMessagesModule,
    MatRippleModule,
    TsIconModule,
  ],
  exports: [
    TsRadioGroupComponent,
  ],
  declarations: [
    TsRadioGroupComponent,
  ],
})
export class TsRadioGroupModule {}
