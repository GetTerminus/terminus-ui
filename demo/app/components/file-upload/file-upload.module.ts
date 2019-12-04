import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsFileUploadModule } from '@terminus/ui/file-upload';
import { TsInputModule } from '@terminus/ui/input';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsToggleModule } from '@terminus/ui/toggle';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadComponent } from './file-upload.component';


@NgModule({
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    FlexLayoutModule,
    FormsModule,
    TsCardModule,
    TsFileUploadModule,
    TsInputModule,
    TsOptionModule,
    TsSelectModule,
    TsSpacingModule,
    TsToggleModule,
  ],
  declarations: [
    FileUploadComponent,
  ],
})
export class FileUploadModule {}
