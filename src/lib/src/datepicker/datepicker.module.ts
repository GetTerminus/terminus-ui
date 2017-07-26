import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdNativeDateModule,
  MdDatepickerModule,
  MdIconModule,
  MdInputModule,
} from '@angular/material';

import { TsDatepickerComponent } from './datepicker.component';
export { TsDatepickerComponent } from './datepicker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
  ],
  exports: [
    TsDatepickerComponent,
  ],
  declarations: [
    TsDatepickerComponent,
  ],
})
export class TsDatepickerModule {}
