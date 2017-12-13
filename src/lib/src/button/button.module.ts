import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { TsButtonComponent } from './button.component';
export { TsButtonComponent } from './button.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
