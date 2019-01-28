import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsCSVEntryComponent } from './csv-entry.component';

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
