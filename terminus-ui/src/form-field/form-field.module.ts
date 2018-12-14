import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
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
    TsValidationMessagesModule,
    FlexLayoutModule,
  ],
  declarations: [
    TsFormFieldComponent,
    TsPrefixDirective,
    TsSuffixDirective,
    TsLabelDirective,
  ],
  exports: [
    TsFormFieldComponent,
    TsPrefixDirective,
    TsSuffixDirective,
    TsLabelDirective,
  ],
})
export class TsFormFieldModule {}
