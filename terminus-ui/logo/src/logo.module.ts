import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsLogoComponent } from './logo.component';

export * from './logo.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsLogoComponent,
  ],
  exports: [
    TsLogoComponent,
  ],
})
export class TsLogoModule {}
