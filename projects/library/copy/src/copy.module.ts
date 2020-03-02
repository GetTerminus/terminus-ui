import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { TsIconModule } from '@terminus/ui/icon';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsCopyComponent } from './copy.component';

export * from './copy.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatRippleModule,
    TsIconModule,
    TsTooltipModule,
  ],
  exports: [
    TsCopyComponent,
  ],
  declarations: [
    TsCopyComponent,
  ],
})
export class TsCopyModule {}
