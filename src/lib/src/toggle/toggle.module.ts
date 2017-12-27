import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';

import { TsToggleComponent } from '@toggle/toggle.component';
export { TsToggleComponent } from '@toggle/toggle.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  exports: [
    TsToggleComponent,
  ],
  declarations: [
    TsToggleComponent,
  ],
})
export class TsToggleModule {}
