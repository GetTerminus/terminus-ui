import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule, ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsInputModule } from '@terminus/ui/input';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsValidatorsModule } from '@terminus/ui/validators';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TsCardModule,
    TsInputModule,
    TsSpacingModule,
    TsValidatorsModule,
    ValidationRoutingModule,
  ],
  declarations: [
    ValidationComponent,
  ],
})
export class ValidationModule {}
