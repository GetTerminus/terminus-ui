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
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';
import { TsValidatorsService } from '@terminus/ui/validators';

import { TsInputComponent } from './input.component';
import { TS_DATE_FORMATS } from './date-adapter';

export * from './date-adapter';
export * from './input-value-accessor';
export * from './input.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatDatepickerModule,
    NativeDateModule,
    ReactiveFormsModule,
    TsFormFieldModule,
    TsIconModule,
    TsValidationMessagesModule,
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
