import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TsCheckboxComponent } from './checkbox.component';

export * from './checkbox.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
  ],
  exports: [TsCheckboxComponent],
  declarations: [TsCheckboxComponent],
})
export class TsCheckboxModule {}
