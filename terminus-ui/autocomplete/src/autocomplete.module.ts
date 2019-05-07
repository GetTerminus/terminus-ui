import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsOptionModule } from '@terminus/ui/option';
import { TsAutocompletePanelComponent } from './autocomplete-panel/autocomplete-panel.component';
import { TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, TsAutocompleteTriggerDirective } from './autocomplete-panel/autocomplete-trigger.directive';
import { TsAutocompleteComponent } from './autocomplete.component';

export * from './autocomplete.component';
export * from './autocomplete-panel/autocomplete-panel.component';

/**
 * @deprecated in favor of the new TsInputComponent. Target 12.x for removal
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    OverlayModule,
    TsCheckboxModule,
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
