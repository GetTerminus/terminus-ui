import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsPaginatorModule } from '@terminus/ui/paginator';
import { TsSortModule } from '@terminus/ui/sort';

import {
  TsCellDefDirective,
  TsCellDirective,
  TsHeaderCellDefDirective,
  TsHeaderCellDirective,
} from './cell';
import { TsColumnDefDirective } from './column';
import {
  TsHeaderRowComponent,
  TsHeaderRowDefDirective,
  TsRowComponent,
  TsRowDefDirective,
} from './row';
import { TsTableComponent } from './table.component';

export * from './table-data-source';
export * from './cell';
export * from './column';
export * from './row';
export * from './table.component';


const EXPORTED_DECLARATIONS = [
  // Table
  TsTableComponent,

  // Template definitions
  TsCellDefDirective,
  TsColumnDefDirective,
  TsHeaderCellDefDirective,
  TsHeaderRowDefDirective,
  TsRowDefDirective,

  // Cell directives
  TsCellDirective,
  TsHeaderCellDirective,

  // Row directives
  TsHeaderRowComponent,
  TsRowComponent,
];

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    TsPaginatorModule,
    TsSortModule,
  ],
  declarations: [
    ...EXPORTED_DECLARATIONS,
  ],
  exports: [
    ...EXPORTED_DECLARATIONS,
  ],
})
export class TsTableModule {}
