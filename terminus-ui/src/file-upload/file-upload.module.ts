import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TsDocumentService } from '@terminus/ngx-tools';

import { TsButtonModule } from './../button/button.module';
import { TsFileUploadComponent } from './file-upload.component';
import { TsIconButtonModule } from './../icon-button/icon-button.module';
import { TsIconModule } from './../icon/icon.module';
import { TsTooltipModule } from './../tooltip/tooltip.module';
import { TsValidationMessagesModule } from './../validation-messages/validation-messages.module';
import { TsDropProtectionService } from './drop-protection.service';

export * from './file-upload.component';
export * from './file-rejection-reasons.enum';
export * from './image-dimension-constraints';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatProgressBarModule,
    TsButtonModule,
    TsIconButtonModule,
    TsIconModule,
    TsTooltipModule,
    TsValidationMessagesModule,
  ],
  declarations: [
    TsFileUploadComponent,
  ],
  providers: [
    TsDropProtectionService,
    TsDocumentService,
  ],
  exports: [
    TsFileUploadComponent,
  ],
})
export class TsFileUploadModule {}
