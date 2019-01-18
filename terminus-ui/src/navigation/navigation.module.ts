import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { TsIconModule } from './../icon/icon.module';
import { TsNavigationComponent } from './navigation.component';
import { TsTooltipModule } from './../tooltip/tooltip.module';

export * from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    TsIconModule,
    TsTooltipModule,
  ],
  declarations: [
    TsNavigationComponent,
  ],
  exports: [
    TsNavigationComponent,
  ],
})
export class TsNavigationModule {}
