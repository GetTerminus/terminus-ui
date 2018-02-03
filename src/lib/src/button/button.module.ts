import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { TsIconModule } from './../icon/icon.module';
import { TsButtonComponent } from './button.component';
export { TsButtonComponent } from './button.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TsIconModule,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
