import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { TsNavigationComponent } from './navigation.component';
export { TsNavigationComponent } from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    TsNavigationComponent,
  ],
  exports: [
    TsNavigationComponent,
  ],
})
export class TsNavigationModule {}
