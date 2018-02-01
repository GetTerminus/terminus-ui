import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material';

import { TsCardComponent } from './card.component';
export { TsCardComponent } from './card.component';

import { TsCardTitleDirective } from './card-title.directive';
export { TsCardTitleDirective } from './card-title.directive';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  declarations: [
    TsCardComponent,
    TsCardTitleDirective,
  ],
  exports: [
    TsCardComponent,
    TsCardTitleDirective,
  ],
})
export class TsCardModule {}
