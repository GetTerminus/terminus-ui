import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { TsSortModule } from './../sort/sort.module';
import { TsPaginationModule } from './../pagination/pagination.module';

import {
  TsCellDirective,
  TsCellDefDirective,
  TsColumnDefDirective,
  TsHeaderCellDirective,
  TsHeaderCellDefDirective,
} from './cell';
import {
  TsHeaderRowComponent,
  TsHeaderRowDefDirective,
  TsRowComponent,
  TsRowDefDirective,
} from './row';
import { TsTableComponent } from './table.component';


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    TsSortModule,
    TsPaginationModule,
  ],
  declarations: [
    TsCellDefDirective,
    TsCellDirective,
    TsColumnDefDirective,
    TsHeaderCellDefDirective,
    TsHeaderCellDirective,
    TsHeaderRowComponent,
    TsHeaderRowDefDirective,
    TsRowComponent,
    TsRowDefDirective,
    TsTableComponent,
  ],
  exports: [
    TsCellDefDirective,
    TsCellDirective,
    TsColumnDefDirective,
    TsHeaderCellDefDirective,
    TsHeaderCellDirective,
    TsHeaderRowComponent,
    TsHeaderRowDefDirective,
    TsRowComponent,
    TsRowDefDirective,
    TsTableComponent,
  ],
})
export class TsTableModule {}
