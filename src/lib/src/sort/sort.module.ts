import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsSortHeaderComponent } from './sort-header.component';
export { TsSortHeaderComponent } from './sort-header.component';
import { TS_SORT_HEADER_INTL_PROVIDER } from './sort-header-intl';
import { TsSortDirective } from './sort.directive';
export { TsSortDirective } from './sort.directive';

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
