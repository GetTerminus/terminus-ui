import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsChipModule } from '@terminus/ui/chip';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsOptionModule } from '@terminus/ui/option';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsSelectionListPanelComponent } from './selection-list-panel/selection-list-panel.component';
import {
  TS_SELECTION_LIST_SCROLL_STRATEGY_FACTORY_PROVIDER,
  TsSelectionListTriggerDirective,
} from './selection-list-panel/selection-list-trigger.directive';
import { TsSelectionListComponent } from './selection-list.component';

export * from './selection-list.component';
export * from './selection-list-panel/selection-list-panel.component';
export * from './selection-list-panel/selection-list-trigger.directive';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    OverlayModule,
    ReactiveFormsModule,
    TsCheckboxModule,
    TsChipModule,
    TsFormFieldModule,
    TsIconModule,
    TsInputModule,
    TsOptionModule,
    TsValidationMessagesModule,
  ],
  providers: [
    TS_SELECTION_LIST_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  declarations: [
    TsSelectionListComponent,
    TsSelectionListPanelComponent,
    TsSelectionListTriggerDirective,
  ],
  exports: [
    TsSelectionListComponent,
    TsSelectionListPanelComponent,
    TsSelectionListTriggerDirective,
  ],
})
export class TsSelectionListModule {}
