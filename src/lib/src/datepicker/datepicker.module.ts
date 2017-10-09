import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

import { TsDatepickerComponent } from './datepicker.component';
export { TsDatepickerComponent } from './datepicker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    TsDatepickerComponent,
  ],
  declarations: [
    TsDatepickerComponent,
  ],
})
export class TsDatepickerModule {}
