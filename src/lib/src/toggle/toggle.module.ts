import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdSlideToggleModule,
} from '@angular/material';

import { TsToggleComponent } from './toggle.component';
export { TsToggleComponent } from './toggle.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSlideToggleModule,
  ],
  exports: [
    TsToggleComponent,
  ],
  declarations: [
    TsToggleComponent,
  ],
})
export class TsToggleModule {}
