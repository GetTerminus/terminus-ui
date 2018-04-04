import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { TsSortModule } from './../sort/sort.module';
import { TsPaginatorModule } from './../paginator/paginator.module';
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

export * from './table-data-source';
export * from './cell';
export * from './row';
export * from './table.component';

/**
 * Much of this was lifted directly from Angular Material. I highly recommend checking out their
 * source code: https://github.com/angular/material2/tree/master/src/lib/table
 */


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    TsSortModule,
    TsPaginatorModule,
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
