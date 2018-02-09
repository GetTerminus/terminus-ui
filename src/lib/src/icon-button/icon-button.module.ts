import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { TsIconModule } from './../icon/icon.module';
import { TsIconButtonComponent } from './icon-button.component';
export { TsIconButtonComponent } from './icon-button.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    TsIconModule,
  ],
  declarations: [
    TsIconButtonComponent,
  ],
  exports: [
    TsIconButtonComponent,
  ],
})
export class TsIconButtonModule {}
