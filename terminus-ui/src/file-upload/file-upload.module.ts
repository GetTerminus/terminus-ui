import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TsIconModule } from './../icon/icon.module';
import { TsIconButtonModule } from './../icon-button/icon-button.module';
import { TsButtonModule } from './../button/button.module';
import { TsFileUploadComponent } from './file-upload.component';

export * from './file-upload.component';
export * from './accepted-file';
export * from './rejected-file';
export * from './file-rejection-reasons.enum';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressBarModule,
    TsButtonModule,
    TsIconModule,
    TsIconButtonModule,
  ],
  declarations: [
    TsFileUploadComponent,
  ],
  exports: [
    TsFileUploadComponent,
  ],
})
export class TsFileUploadModule {}
