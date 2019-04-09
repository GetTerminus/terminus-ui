import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ButtonRoutingModule } from './button-routing.module';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [ButtonRoutingModule, CommonModule, FormsModule, TsButtonModule, TsCardModule, TsSpacingModule],
  declarations: [ButtonComponent],
})
export class ButtonModule {}
