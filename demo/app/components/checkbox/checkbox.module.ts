import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { CheckboxRoutingModule } from './checkbox-routing.module';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CheckboxRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, TsCardModule, TsCheckboxModule, TsSpacingModule],
  declarations: [CheckboxComponent],
})
export class CheckboxModule {}
