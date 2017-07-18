import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdIconModule } from '@angular/material';

import { WindowService } from './../utilities/window.service';

import { TsCopyComponent } from './copy.component';
export { TsCopyComponent } from './copy.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
  ],
  providers: [
    WindowService,
  ],
  exports: [
    TsCopyComponent,
  ],
  declarations: [
    TsCopyComponent,
  ],
})
export class TsCopyModule {}
