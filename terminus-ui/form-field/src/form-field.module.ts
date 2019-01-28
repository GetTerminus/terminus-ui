import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsFormFieldComponent } from './form-field.component';
import { TsPrefixDirective } from './prefix.directive';
import { TsSuffixDirective } from './suffix.directive';
import { TsLabelDirective } from './label.directive';

export * from './form-field.component';
export * from './prefix.directive';
export * from './suffix.directive';
export * from './form-field-control';
export * from './label.directive';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TsValidationMessagesModule,
  ],
  declarations: [
    TsFormFieldComponent,
    TsLabelDirective,
    TsPrefixDirective,
    TsSuffixDirective,
  ],
  exports: [
    TsFormFieldComponent,
    TsLabelDirective,
    TsPrefixDirective,
    TsSuffixDirective,
  ],
})
export class TsFormFieldModule {}
