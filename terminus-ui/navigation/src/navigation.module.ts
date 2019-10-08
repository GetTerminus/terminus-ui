import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TsIconModule } from '@terminus/ui/icon';
import { TsPipesModule } from '@terminus/ui/pipes';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsNavigationComponent } from './navigation.component';

export * from './navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    TsIconModule,
    TsPipesModule,
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
