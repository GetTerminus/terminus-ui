import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

import { TsIconModule } from './../icon/icon.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsValidatorsService } from './../services/validators/validators.service';

import { TsInputComponent } from './input.component';
export { TsInputComponent } from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TsValidationMessagesModule,
    TsIconModule,
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
