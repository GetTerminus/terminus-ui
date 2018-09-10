import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TsValidationMessageService } from './validation-message.service';
import { TsValidationMessagesComponent } from './validation-messages.component';

export * from './validation-message.service';
export * from './validation-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    TsValidationMessageService,
  ],
  exports: [
    TsValidationMessagesComponent,
  ],
  declarations: [
    TsValidationMessagesComponent,
  ],
})
export class TsValidationMessagesModule {}
