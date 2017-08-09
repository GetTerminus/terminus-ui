import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MdCheckboxModule,
} from '@angular/material';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsCheckboxComponent } from './checkbox.component';
export { TsCheckboxComponent } from './checkbox.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCheckboxModule,
  ],
  exports: [
    TsCheckboxComponent,
  ],
  declarations: [
    TsCheckboxComponent,
    TsReactiveFormBaseComponent,
  ],
})
export class TsCheckboxModule {}
