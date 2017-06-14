import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda';
import {
  MdButtonModule,
  MdIconModule,
} from '@angular/material';

import { TsButtonComponent } from './button.component';
export { TsButtonComponent } from './button.component';


@NgModule({
  imports: [
    CommonModule,
    LaddaModule.forRoot({
      style: 'expand-right',
    }),
    MdButtonModule,
    MdIconModule,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
