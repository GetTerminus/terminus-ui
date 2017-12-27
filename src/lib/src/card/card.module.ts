import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material';

import { TsCardComponent } from '@card/card.component';
export { TsCardComponent } from '@card/card.component';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  declarations: [
    TsCardComponent,
  ],
  exports: [
    TsCardComponent,
  ],
})
export class TsCardModule {}
