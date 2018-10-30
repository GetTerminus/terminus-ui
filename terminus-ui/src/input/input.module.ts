import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  NativeDateModule,
} from '@angular/material/core';

import { TsIconModule } from './../icon/icon.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsValidatorsService } from './../validators/validators.service';
import { TsInputComponent } from './input.component';
import { TS_DATE_FORMATS } from './date-adapter';

export * from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NativeDateModule,
    MatDatepickerModule,
    TsValidationMessagesModule,
    TsIconModule,
  ],
  providers: [
    TsValidatorsService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: TS_DATE_FORMATS,
    },
  ],
  exports: [
    TsInputComponent,
  ],
  declarations: [
    TsInputComponent,
  ],
})
export class TsInputModule {}
