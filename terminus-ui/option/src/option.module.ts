import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';
import { TsOptgroupComponent } from './optgroup.component';
import { TsSelectOptionDisplayDirective } from './option-display.directive';
import { TsOptionComponent } from './option.component';

export * from './option.component';
export * from './option-utilities';
export * from './option-display.directive';
export * from './optgroup.component';

/**
 * @deprecated in favor of the new TsInputComponent. Target 12.x for removal
 */
@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TsCheckboxModule,
    TsIconModule,
    TsFormFieldModule,
    TsInputModule,
  ],
  providers: [
  ],
  declarations: [
    TsOptionComponent,
    TsOptgroupComponent,
    TsSelectOptionDisplayDirective,
  ],
  exports: [
    TsOptionComponent,
    TsOptgroupComponent,
    TsSelectOptionDisplayDirective,
  ],
})
export class TsOptionModule { }
