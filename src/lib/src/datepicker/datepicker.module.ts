import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDatepickerComponent } from './datepicker.component';
export { TsDatepickerComponent } from './datepicker.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TsDatepickerComponent,
  ],
  declarations: [
    TsDatepickerComponent,
  ],
})
export class TsDatepickerModule {}
