import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

import { TsButtonComponent } from './button.component';
export { TsButtonComponent } from './button.component';


@NgModule({
  imports: [
    CommonModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      // TODO: This color should be abstracted out to a shared constant
      spinnerColor: '#999',
    }),
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
