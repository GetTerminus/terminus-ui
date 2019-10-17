import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsIconModule } from '@terminus/ui/icon';
import { TsMenuModule } from '@terminus/ui/menu';
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
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TableRoutingModule,
    TsCardModule,
    TsCheckboxModule,
    TsIconModule,
    TsMenuModule,
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
