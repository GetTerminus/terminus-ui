import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

import { TsValidationService } from './../services/validation/validation.service';
import { TsValidationMessagesComponent } from './validation-messages.component';
export { TsValidationMessagesComponent } from './validation-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [
    TsValidationService,
  ],
  exports: [
    TsValidationMessagesComponent,
  ],
  declarations: [
    TsValidationMessagesComponent,
  ],
})
export class TsValidationMessagesModule {}
