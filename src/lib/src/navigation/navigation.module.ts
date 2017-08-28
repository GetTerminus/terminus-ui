import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdIconModule,
  MdMenuModule,
} from '@angular/material';

import { TsNavigationComponent } from './navigation.component';
export { TsNavigationComponent } from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
  ],
  declarations: [
    TsNavigationComponent,
  ],
  exports: [
    TsNavigationComponent,
  ],
})
export class TsNavigationModule {}
