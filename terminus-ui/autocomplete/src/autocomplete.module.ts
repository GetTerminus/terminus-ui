import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { TsAutocompletePanelComponent } from './autocomplete-panel/autocomplete-panel.component';
import { TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, TsAutocompleteTriggerDirective } from './autocomplete-panel/autocomplete-trigger.directive';
import { TsAutocompleteComponent } from './autocomplete.component';
import { TsSelectOptgroupComponent } from './optgroup/optgroup.component';
import { TsSelectOptionDisplayDirective } from './option/option-display.directive';
import { TsSelectOptionComponent } from './option/option.component';

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
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    OverlayModule,
    TsCheckboxModule,
    TsIconModule,
    TsFormFieldModule,
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
    TsSelectOptgroupComponent,
    TsSelectOptionComponent,
    TsSelectOptionDisplayDirective,
  ],
  exports: [
    TsAutocompleteComponent,
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
    TsSelectOptgroupComponent,
    TsSelectOptionComponent,
    TsSelectOptionDisplayDirective,
  ],
})
export class TsAutocompleteModule {}
