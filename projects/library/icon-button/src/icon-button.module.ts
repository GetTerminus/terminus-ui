import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { TsIconModule } from '@terminus/ui/icon';

import { TsIconButtonComponent } from './icon-button.component';

export * from './icon-button.component';


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
