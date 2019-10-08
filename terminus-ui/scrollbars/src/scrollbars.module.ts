import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { TsScrollbarsComponent } from './scrollbars.component';


export * from './scrollbars.component';


@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
  ],
  declarations: [
    TsScrollbarsComponent,
  ],
  exports: [
    TsScrollbarsComponent,
  ],
})
export class TsScrollbarsModule {}
