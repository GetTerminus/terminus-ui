import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
