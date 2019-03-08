import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TsWindowService } from '@terminus/ngx-tools';
import { TsIconModule } from '@terminus/ui/icon';

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
