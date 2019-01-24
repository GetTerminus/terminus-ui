import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';
import { TsIconModule } from '@terminus/ui/icon';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsInputModule } from '@terminus/ui/input';
import { TsFormFieldModule } from '@terminus/ui/form-field';

import { TsSelectComponent } from './select.component';
import { TsSelectOptionComponent } from './option/option.component';
import { TsSelectOptgroupComponent } from './optgroup/optgroup.component';
import { TsSelectTriggerComponent } from './select-trigger.component';
import { TsAutocompletePanelComponent } from './autocomplete/autocomplete-panel.component';
import {
  TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  TsAutocompleteTriggerDirective,
} from './autocomplete/autocomplete-trigger.directive';
import { TsSelectOptionDisplayDirective } from './option/option-display.directive';


export * from './select.component';
export * from './select-trigger.component';
export * from './option/option.component';
export * from './option/option-display.directive';
export * from './optgroup/optgroup.component';
export * from './autocomplete/autocomplete-trigger.directive';
export * from './autocomplete/autocomplete-panel.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    OverlayModule,
    ReactiveFormsModule,
    TsCheckboxModule,
    TsFormFieldModule,
    TsIconModule,
    TsInputModule,
    TsValidationMessagesModule,
  ],
  providers: [
    TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  exports: [
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
    TsSelectComponent,
    TsSelectOptgroupComponent,
    TsSelectOptionComponent,
    TsSelectOptionDisplayDirective,
    TsSelectTriggerComponent,
  ],
  declarations: [
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
    TsSelectComponent,
    TsSelectOptgroupComponent,
    TsSelectOptionComponent,
    TsSelectOptionDisplayDirective,
    TsSelectTriggerComponent,
  ],
})
export class TsSelectModule {}
