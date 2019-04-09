import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsRadioGroupModule } from '@terminus/ui/radio-group';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { RadioRoutingModule } from './radio-routing.module';
import { RadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, FormsModule, RadioRoutingModule, ReactiveFormsModule, TsCardModule, TsRadioGroupModule, TsSpacingModule],
  declarations: [RadioComponent],
})
export class RadioModule {}
