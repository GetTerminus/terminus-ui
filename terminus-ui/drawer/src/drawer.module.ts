import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { TsDrawerContainerComponent } from './drawer-container.component';
import { TsDrawerContentComponent } from './drawer-content.component';
import { TsDrawerFooterComponent } from './drawer-footer.component';
import { TsDrawerHeaderComponent } from './drawer-header.component';
import { TsDrawerComponent } from './drawer.component';

export * from './drawer.component';
export * from './drawer-container.component';
export * from './drawer-content.component';
export * from './drawer-animations';
export * from './drawer-header.component';
export * from './drawer-footer.component';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    ScrollingModule,
    PlatformModule,
  ],
  declarations: [
    TsDrawerComponent,
    TsDrawerContainerComponent,
    TsDrawerContentComponent,
    TsDrawerFooterComponent,
    TsDrawerHeaderComponent,
  ],
  exports: [
    TsDrawerComponent,
    TsDrawerContainerComponent,
    TsDrawerContentComponent,
    TsDrawerFooterComponent,
    TsDrawerHeaderComponent,
  ],
})
export class TsDrawerModule { }
