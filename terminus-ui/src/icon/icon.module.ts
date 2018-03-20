import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { TsIconComponent } from './icon.component';
export { TsIconComponent } from './icon.component';


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
