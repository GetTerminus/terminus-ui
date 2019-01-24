import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TsDocumentService } from '@terminus/ngx-tools';
import { TsButtonModule } from '@terminus/ui/button';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsTooltipModule } from '@terminus/ui/tooltip';
import { TsValidationMessagesModule } from '@terminus/ui/validation-messages';

import { TsFileUploadComponent } from './file-upload.component';
import { TsDropProtectionService } from './drop-protection.service';

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
    TsDocumentService,
    TsDropProtectionService,
  ],
  exports: [
    TsFileUploadComponent,
  ],
})
export class TsFileUploadModule {}
