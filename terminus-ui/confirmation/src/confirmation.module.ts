import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsButtonModule } from '@terminus/ui/button';

import { TsConfirmationModalComponent } from './confirmation-modal.component';
import { TsConfirmationDirective } from './confirmation.directive';

export * from './confirmation-modal.component';
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
    TsConfirmationModalComponent,
  ],
  exports: [
    TsConfirmationDirective,
  ],
  entryComponents: [
    TsConfirmationModalComponent,
  ],
})
export class TsConfirmationModule {}
