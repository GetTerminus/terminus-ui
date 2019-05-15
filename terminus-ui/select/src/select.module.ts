import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsOptgroupComponent, TsOptionModule } from '@terminus/ui/option';
import { TsSelectTriggerComponent } from './select-trigger.component';
import { TsSelectComponent } from './select.component';


export * from './select.component';
export * from './select-trigger.component';
export * from './select-animations';


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
    TsOptionModule,
    TsValidationMessagesModule,
  ],
  providers: [
  ],
  exports: [
    TsSelectComponent,
    TsSelectTriggerComponent,
  ],
  declarations: [
    TsSelectComponent,
    TsSelectTriggerComponent,
  ],
})
export class TsSelectModule {}
