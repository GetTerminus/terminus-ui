import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdSelectModule,
} from '@angular/material';

import { TsSelectComponent } from './select.component';
export { TsSelectComponent } from './select.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSelectModule,
  ],
  exports: [
    TsSelectComponent,
  ],
  declarations: [
    TsSelectComponent,
  ],
})
export class TsSelectModule {}

