import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsCardModule } from '@terminus/ui/card';
import { TsCSVEntryModule } from '@terminus/ui/csv-entry';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsValidatorsModule } from '@terminus/ui/validators';

import { CSVEntryRoutingModule } from './csv-entry-routing.module';
import { CSVEntryComponent } from './csv-entry.component';

@NgModule({
  imports: [CommonModule, CSVEntryRoutingModule, TsCardModule, TsCSVEntryModule, TsSpacingModule, TsValidatorsModule],
  declarations: [CSVEntryComponent],
})
export class CSVEntryModule {}
