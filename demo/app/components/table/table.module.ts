import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsOptionModule } from '@terminus/ui/option';
import { TsPaginatorModule } from '@terminus/ui/paginator';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSortModule } from '@terminus/ui/sort';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsTableModule } from '@terminus/ui/table';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    TableRoutingModule,
    TsCardModule,
    TsOptionModule,
    TsPaginatorModule,
    TsSelectModule,
    TsSortModule,
    TsSpacingModule,
    TsTableModule,
  ],
  declarations: [
    TableComponent,
  ],
})
export class TableModule {}
