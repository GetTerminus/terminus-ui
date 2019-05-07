import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsFileUploadModule } from '@terminus/ui/file-upload';
import { TsInputModule } from '@terminus/ui/input';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsToggleModule } from '@terminus/ui/toggle';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadComponent } from './file-upload.component';


@NgModule({
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    FormsModule,
    TsCardModule,
    TsFileUploadModule,
    TsInputModule,
    TsSelectModule,
    TsSpacingModule,
    TsToggleModule,
  ],
  declarations: [
    FileUploadComponent,
  ],
})
export class FileUploadModule {}
