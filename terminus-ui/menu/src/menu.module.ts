import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsButtonModule } from '@terminus/ui/button';

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
