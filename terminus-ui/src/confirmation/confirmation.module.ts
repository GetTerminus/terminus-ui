import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsButtonModule } from './../button/button.module';
import { TsConfirmationDirective } from './confirmation.directive';
import { TsConfirmationModalComponent } from './confirmation-modal.component';

export * from './confirmation.directive';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    TsButtonModule,
    FlexLayoutModule,
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
