import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsSortHeaderComponent } from './sort-header';
import { TS_SORT_HEADER_INTL_PROVIDER } from './sort-header-intl';
import { TsSortDirective } from './sort.directive';
export { TsSortDirective } from './sort.directive';


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
