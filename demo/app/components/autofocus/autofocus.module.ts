import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsAutofocusModule } from '@terminus/ui/autofocus';
import { TsCardModule } from '@terminus/ui/card';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { AutofocusRoutingModule } from './autofocus-routing.module';
import { AutofocusComponent } from './autofocus.component';
import { TsOptionModule } from '@terminus/ui/option';

@NgModule({
  imports: [
    AutofocusRoutingModule,
    CommonModule,
    FormsModule,
    TsAutofocusModule,
    TsCardModule,
    TsOptionModule,
    TsSelectModule,
    TsSpacingModule
  ],
  declarations: [AutofocusComponent],
})
export class AutofocusModule {}
