import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdSlideToggleModule,
} from '@angular/material';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsToggleComponent } from './toggle.component';
export { TsToggleComponent } from './toggle.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdSlideToggleModule,
  ],
  exports: [
    TsToggleComponent,
  ],
  declarations: [
    TsReactiveFormBaseComponent,
    TsToggleComponent,
  ],
})
export class TsToggleModule {}
