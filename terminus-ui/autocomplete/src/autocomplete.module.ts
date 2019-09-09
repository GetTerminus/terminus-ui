import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsChipModule } from '@terminus/ui/chip';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsOptionModule } from '@terminus/ui/option';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsAutocompletePanelComponent } from './autocomplete-panel/autocomplete-panel.component';
import {
  TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  TsAutocompleteTriggerDirective,
} from './autocomplete-panel/autocomplete-trigger.directive';
import { TsAutocompleteComponent } from './autocomplete.component';

export * from './autocomplete.component';
export * from './autocomplete-panel/autocomplete-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    OverlayModule,
    TsCheckboxModule,
    TsChipModule,
    TsIconModule,
    TsFormFieldModule,
    TsOptionModule,
    TsValidationMessagesModule,
    TsInputModule,
  ],
  providers: [
    TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  declarations: [
    TsAutocompleteComponent,
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
  ],
  exports: [
    TsAutocompleteComponent,
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
  ],
})
export class TsAutocompleteModule {}
