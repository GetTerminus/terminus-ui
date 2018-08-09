import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TsIconModule } from './../icon/icon.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsValidatorsService } from './../validators/validators.service';
import { TsInputComponent } from './input.component';

export * from './input.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
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
