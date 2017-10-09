import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatIconModule,
} from '@angular/material';

import { TsLinkComponent } from './link.component';
export { TsLinkComponent } from './link.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [
    TsLinkComponent,
  ],
  declarations: [
    TsLinkComponent,
  ],
})
export class TsLinkModule {}
