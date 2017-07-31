import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda';
import {
  MdButtonModule,
  MdIconModule,
} from '@angular/material';

/*
 *import { TsThemeBaseComponent } from './../utilities/theme-base.component';
 */
import { TsButtonComponent } from './button.component';
export { TsButtonComponent } from './button.component';


@NgModule({
  imports: [
    CommonModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      // TODO: This color should be one of our chosen palette grays
      // TODO: This color should be abstracted out to a shared constant
      spinnerColor: '#aaa',
    }),
    MdButtonModule,
    MdIconModule,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    /*
     *TsThemeBaseComponent,
     */
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
