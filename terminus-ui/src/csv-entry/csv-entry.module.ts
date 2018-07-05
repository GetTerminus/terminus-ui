import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TsButtonModule } from './../button/button.module';
import { TsCSVEntryComponent } from './csv-entry.component';
import { TsIconButtonModule } from './../icon-button/icon-button.module';
import { TsIconModule } from './../icon/icon.module';
import { TsTooltipModule } from './../tooltip/tooltip.module';

export * from './csv-entry.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsIconButtonModule,
    TsIconModule,
    TsTooltipModule,
  ],
  declarations: [
    TsCSVEntryComponent,
  ],
  exports: [
    TsCSVEntryComponent,
  ],
})
export class TsCSVEntryModule {}
