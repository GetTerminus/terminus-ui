import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { TsButtonModule } from '@terminus/ui/button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
import { TsDatePipe } from '@terminus/ui/pipes';
import { TsTooltipModule } from '@terminus/ui/tooltip';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsDropProtectionService } from './drop-protection.service';
import { TsFileUploadComponent } from './file-upload.component';

export * from './drop-protection.service';
export * from './file-upload.component';
export * from './image-dimension-constraints';
export * from './image-dimensions';
export * from './mime-types';
export * from './selected-file';


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
    TsDatePipe,
    TsDocumentService,
    TsDropProtectionService,
  ],
  exports: [
    TsFileUploadComponent,
  ],
})
export class TsFileUploadModule {}
