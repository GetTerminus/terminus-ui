import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatRippleModule,
} from '@angular/material';

import { TsWindowService } from '@services/window/window.service';
import { TsDocumentService } from '@services/document/document.service';
import { TsCopyComponent } from '@copy/copy.component';
export { TsCopyComponent } from '@copy/copy.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
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
