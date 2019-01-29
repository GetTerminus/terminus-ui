import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TsIconModule } from '@terminus/ui/icon';

import { TsCardComponent } from './card.component';
import { TsCardTitleDirective } from './card-title.directive';

export * from './card.component';
export * from './card-title.directive';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TsIconModule,
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
