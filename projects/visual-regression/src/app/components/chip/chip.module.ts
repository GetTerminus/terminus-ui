import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsChipModule } from "@terminus/ui/chip";
import { TsIconModule } from '@terminus/ui/icon';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ChipRoutingModule } from './chip-routing.module';
import { ChipComponent } from './chip.component';


@NgModule({
  imports: [
    ChipRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    TsButtonModule,
    TsChipModule,
    TsCardModule,
    TsIconModule,
    TsSpacingModule,
  ],
  declarations: [
    ChipComponent,
  ],
})
export class ChipModule {}
