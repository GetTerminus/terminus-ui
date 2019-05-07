import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
    AutocompleteRoutingModule,
    CommonModule,
    FormsModule,
    TsAutocompleteModule,
    TsCheckboxModule,
    TsCardModule,
    TsSpacingModule,
  ],
  declarations: [AutocompleteComponent],
})
export class AutocompleteModule {}
