import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TsIconComponent } from './icon.component';

export * from './icon.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    TsIconComponent,
  ],
  exports: [
    TsIconComponent,
  ],
})
export class TsIconModule {}
