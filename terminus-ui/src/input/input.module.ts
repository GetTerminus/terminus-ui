import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { TsAutofocusModule } from './../autofocus/autofocus.module';
import { TsIconModule } from './../icon/icon.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsValidatorsService } from './../validators/validators.service';
import { TsInputComponent } from './input.component';

export * from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TsValidationMessagesModule,
    TsIconModule,
    TsAutofocusModule,
  ],
  providers: [
    TsValidatorsService,
  ],
  exports: [
    TsInputComponent,
  ],
  declarations: [
    TsInputComponent,
  ],
})
export class TsInputModule {}
