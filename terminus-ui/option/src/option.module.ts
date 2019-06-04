import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsFormFieldModule } from '@terminus/ui/form-field';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';

import { TsOptgroupComponent } from './optgroup.component';
import { TsSelectOptionDisplayDirective } from './option-display.directive';
import { TsOptionComponent } from './option.component';

export * from './option.component';
export * from './option-utilities';
export * from './option-display.directive';
export * from './optgroup.component';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TsCheckboxModule,
    TsIconModule,
    TsFormFieldModule,
    TsInputModule,
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
