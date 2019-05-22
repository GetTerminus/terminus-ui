import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  TsDatePipe,
  TsPipesModule,
} from '@terminus/ui/pipes';
import { TsValidationMessagesComponent } from './validation-messages.component';
import { TsValidationMessagesService } from './validation-messages.service';

export * from './validation-messages.service';
export * from './validation-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TsPipesModule,
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
