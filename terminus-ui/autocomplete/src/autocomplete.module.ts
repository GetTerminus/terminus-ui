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
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';
import { TsInputModule } from '@terminus/ui/input';
import { TsIconModule } from '@terminus/ui/icon';

import { TsAutocompleteComponent } from './autocomplete.component';

export * from './autocomplete.component';


/**
 * @deprecated in favor of the new TsInputComponent. Target 12.x for removal
 */
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
