import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsMaskDirective } from './mask.directive';

export * from './mask.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsMaskDirective,
  ],
  exports: [
    TsMaskDirective,
  ],
})
export class TsMaskModule {}
