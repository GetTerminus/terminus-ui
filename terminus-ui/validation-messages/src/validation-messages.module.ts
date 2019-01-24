import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TsValidationMessagesService } from './validation-messages.service';
import { TsValidationMessagesComponent } from './validation-messages.component';

export * from './validation-messages.service';
export * from './validation-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    TsValidationMessagesService,
  ],
  exports: [
    TsValidationMessagesComponent,
  ],
  declarations: [
    TsValidationMessagesComponent,
  ],
})
export class TsValidationMessagesModule {}
