import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsLoadingOverlayModule } from '@terminus/ui/loading-overlay';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { LoadingOverlayRoutingModule } from './loading-overlay-routing.module';
import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
  imports: [CommonModule, FormsModule, LoadingOverlayRoutingModule, TsCardModule, TsLoadingOverlayModule, TsSpacingModule],
  declarations: [LoadingOverlayComponent],
})
export class LoadingOverlayModule {}
