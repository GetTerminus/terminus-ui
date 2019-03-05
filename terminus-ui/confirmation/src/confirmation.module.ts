import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsButtonModule } from '@terminus/ui/button';

import { TsConfirmationOverlayComponent } from './confirmation-overlay.component';
import { TsConfirmationDirective } from './confirmation.directive';

export * from './confirmation-overlay.component';
export * from './confirmation.directive';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    OverlayModule,
    TsButtonModule,
  ],
  declarations: [
    TsConfirmationDirective,
    TsConfirmationOverlayComponent,
  ],
  exports: [
    TsConfirmationDirective,
  ],
  entryComponents: [
    TsConfirmationOverlayComponent,
  ],
})
export class TsConfirmationModule {}
