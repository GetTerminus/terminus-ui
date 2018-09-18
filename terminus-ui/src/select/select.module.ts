import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsIconModule } from './../icon/icon.module';
import { TsCheckboxModule } from '../checkbox/checkbox.module';
import { TsInputModule } from './../input/input.module';

import { TsFormFieldModule } from './../form-field/form-field.module';
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
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatRippleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    TsValidationMessagesModule,
    TsCheckboxModule,
    TsIconModule,
    TsFormFieldModule,
    TsInputModule,
  ],
  providers: [
    TS_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  exports: [
    TsSelectComponent,
    TsSelectOptionComponent,
    TsSelectOptgroupComponent,
    TsSelectTriggerComponent,
    TsSelectOptionDisplayDirective,
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
  ],
  declarations: [
    TsSelectComponent,
    TsSelectOptionComponent,
    TsSelectOptgroupComponent,
    TsSelectTriggerComponent,
    TsSelectOptionDisplayDirective,
    TsAutocompletePanelComponent,
    TsAutocompleteTriggerDirective,
  ],
})
export class TsSelectModule {}
