import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsInputModule } from './../input/input.module';
import { TsIconModule } from './../icon/icon.module';
import { TsAutocompleteComponent } from './autocomplete.component';

export * from './autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TsIconModule,
    TsValidationMessagesModule,
    TsInputModule,
  ],
  declarations: [
    TsAutocompleteComponent,
  ],
  exports: [
    TsAutocompleteComponent,
  ],
})
export class TsAutocompleteModule {}
