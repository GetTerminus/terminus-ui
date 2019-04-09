import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsConfirmationModule } from '@terminus/ui/confirmation';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ConfirmationRoutingModule } from './confirmation-routing.module';
import { ConfirmationComponent } from './confirmation.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, ConfirmationRoutingModule, FlexLayoutModule, FormsModule, TsButtonModule, TsCardModule, TsConfirmationModule, TsSelectModule, TsSpacingModule],
  declarations: [ConfirmationComponent],
})
export class ConfirmationModule {}
