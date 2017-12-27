import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { TsNavigationComponent } from '@navigation/navigation.component';
export { TsNavigationComponent } from '@navigation/navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  declarations: [
    TsNavigationComponent,
  ],
  exports: [
    TsNavigationComponent,
  ],
})
export class TsNavigationModule {}
