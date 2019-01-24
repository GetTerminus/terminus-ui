import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TsIconModule } from '@terminus/ui/icon';

import { TsLinkComponent } from './link.component';

export * from './link.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TsIconModule,
  ],
  exports: [
    TsLinkComponent,
  ],
  declarations: [
    TsLinkComponent,
  ],
})
export class TsLinkModule {}
