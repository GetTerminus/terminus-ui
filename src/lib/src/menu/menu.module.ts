import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatMenuModule,
  MatIconModule,
} from '@angular/material';

import { TsButtonModule } from './../button/button.module';

import { TsMenuComponent } from './menu.component';
export { TsMenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
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
