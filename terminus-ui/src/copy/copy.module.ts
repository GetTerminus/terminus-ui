import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material';

import { TsIconModule } from './../icon/icon.module';
import { TsWindowService } from './../services/window/window.service';
import { TsDocumentService } from './../services/document/document.service';
import { TsCopyComponent } from './copy.component';
export { TsCopyComponent } from './copy.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TsIconModule,
    MatRippleModule,
  ],
  providers: [
    TsWindowService,
    TsDocumentService,
  ],
  exports: [
    TsCopyComponent,
  ],
  declarations: [
    TsCopyComponent,
  ],
})
export class TsCopyModule {}
