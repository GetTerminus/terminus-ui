import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsInputModule } from './../input/input.module';

import { TsAutocompleteComponent } from './autocomplete.component';
export { TsAutocompleteComponent } from './autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
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
