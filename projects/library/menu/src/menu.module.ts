import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TsButtonModule } from '@terminus/ui/button';
import { TsIconModule } from '@terminus/ui/icon';

import { TsMenuComponent } from './menu.component';

export * from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    TsButtonModule,
    TsIconModule,
  ],
  exports: [
    TsMenuComponent,
  ],
  declarations: [
    TsMenuComponent,
  ],
})
export class TsMenuModule {}
