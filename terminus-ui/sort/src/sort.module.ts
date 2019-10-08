import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TS_SORT_HEADER_INTL_PROVIDER } from './sort-header-intl';
import { TsSortHeaderComponent } from './sort-header.component';
import { TsSortDirective } from './sort.directive';

export * from './sort-animations';
export * from './sort-header-intl';
export * from './sort-header.component';
export * from './sort.directive';


/**
 * Much of this was lifted directly from Angular Material. I highly recommend checking out their
 * source code: https://github.com/angular/material2/tree/master/src/lib/sort
 */

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TS_SORT_HEADER_INTL_PROVIDER,
  ],
  declarations: [
    TsSortDirective,
    TsSortHeaderComponent,
  ],
  exports: [
    TsSortDirective,
    TsSortHeaderComponent,
  ],
})
export class TsSortModule {}
