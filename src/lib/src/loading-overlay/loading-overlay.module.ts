import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdProgressSpinnerModule } from '@angular/material';

import { TsLoadingOverlayService } from './loading-overlay.service';
import { TsLoadingOverlayComponent } from './loading-overlay.component';
import { TsLoadingOverlayDirective } from './loading-overlay.directive';
export { TsLoadingOverlayDirective } from './loading-overlay.directive';


@NgModule({
  imports: [
    CommonModule,
    MdProgressSpinnerModule,
  ],
  providers: [
    TsLoadingOverlayService,
  ],
  declarations: [
    TsLoadingOverlayDirective,
    TsLoadingOverlayComponent,
  ],
  entryComponents: [
    TsLoadingOverlayComponent,
  ],
  exports: [
    TsLoadingOverlayDirective,
  ],
})
export class TsLoadingOverlayModule {}
