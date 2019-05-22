import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TsIconModule } from '@terminus/ui/icon';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsRadioGroupComponent } from './radio-group.component';

export * from './radio-group.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatRadioModule,
    MatRippleModule,
    ReactiveFormsModule,
    TsIconModule,
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
