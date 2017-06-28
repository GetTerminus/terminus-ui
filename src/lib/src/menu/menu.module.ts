import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdMenuModule,
  MdIconModule,
} from '@angular/material';

import { TsButtonModule } from './../button/button.module';

import { TsMenuComponent } from './menu.component';
export { TsMenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    MdMenuModule,
    MdIconModule,
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
