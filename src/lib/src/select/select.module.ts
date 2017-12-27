import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { TsSelectComponent } from '@select/select.component';
export { TsSelectComponent } from '@select/select.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
  ],
  exports: [
    TsSelectComponent,
  ],
  declarations: [
    TsSelectComponent,
  ],
})
export class TsSelectModule {}

