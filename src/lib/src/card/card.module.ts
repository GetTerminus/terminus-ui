import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsCardComponent } from './card.component';
export { TsCardComponent } from './card.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  exports: [
    TsCardComponent,
  ],
  declarations: [
    TsCardComponent,
  ],
})
export class TsCardModule {}
