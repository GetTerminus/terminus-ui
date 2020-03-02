import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsLoadingOverlayComponent } from './loading-overlay.component';
import { TsLoadingOverlayDirective } from './loading-overlay.directive';

export * from './loading-overlay.component';
export * from './loading-overlay.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsLoadingOverlayComponent,
    TsLoadingOverlayDirective,
  ],
  entryComponents: [
    TsLoadingOverlayComponent,
  ],
  exports: [
    TsLoadingOverlayDirective,
  ],
})
export class TsLoadingOverlayModule {}
