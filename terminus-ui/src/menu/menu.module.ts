import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { TsIconModule } from './../icon/icon.module';
import { TsButtonModule } from './../button/button.module';

import { TsMenuComponent } from './menu.component';
export { TsMenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    TsIconModule,
    MatButtonModule,
    TsButtonModule,
  ],
  exports: [
    TsMenuComponent,
  ],
  declarations: [
    TsMenuComponent,
  ],
})
export class TsMenuModule {}
