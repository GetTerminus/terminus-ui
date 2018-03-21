import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsWindowService } from './../services/window/window.service';
import { TsLoadingOverlayComponent } from './loading-overlay.component';
import { TsLoadingOverlayDirective } from './loading-overlay.directive';
export { TsLoadingOverlayDirective } from './loading-overlay.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TsWindowService,
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
