import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatIconModule,
} from '@angular/material';

import { TsValidationMessagesModule } from '@validation-messages/validation-messages.module';
import { TsValidatorsService } from '@services/validators/validators.service';

import { TsInputComponent } from '@input/input.component';
export { TsInputComponent } from '@input/input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    TsValidationMessagesModule,
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
