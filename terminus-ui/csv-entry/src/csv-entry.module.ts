import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
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
