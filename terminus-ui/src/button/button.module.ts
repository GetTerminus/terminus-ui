import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsWindowService } from '@terminus/ngx-tools';

import { TsIconModule } from './../icon/icon.module';
import { TsButtonComponent } from './button.component';

export * from './button.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TsIconModule,
  ],
  providers: [
    TsWindowService,
  ],
  exports: [
    TsButtonComponent,
  ],
  declarations: [
    TsButtonComponent,
  ],
})
export class TsButtonModule {}
