import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TsToggleComponent } from './toggle.component';

export * from './toggle.component';


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
