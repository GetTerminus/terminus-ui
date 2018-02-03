import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatMenuModule,
} from '@angular/material';

import { TsIconModule } from './../icon/icon.module';
import { TsNavigationComponent } from './navigation.component';
export { TsNavigationComponent } from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    TsIconModule,
  ],
  declarations: [
    TsNavigationComponent,
  ],
  exports: [
    TsNavigationComponent,
  ],
})
export class TsNavigationModule {}
