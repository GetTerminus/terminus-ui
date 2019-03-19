import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';

import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { TsTabBodyHostDirective } from './body/tab-body-host.directive';
import { TsTabBodyComponent } from './body/tab-body.component';
import { TsTabContentDirective } from './body/tab-content.directive';
import { TsTabCollectionComponent } from './collection/tab-collection.component';
import { TsTabHeaderComponent } from './header/tab-header.component';
import { TsTabInkBarComponent } from './ink-bar/ink-bar.component';
import { TsTabLabelWrapperDirective } from './label/tab-label-wrapper.directive';
import { TsTabLabelDirective } from './label/tab-label.directive';
import { TsTabComponent } from './tab/tab.component';


export * from './body/tab-body-host.directive';
export * from './body/tab-body.component';
export * from './body/tab-content.directive';
export * from './body/tab-animations';
export * from './collection/tab-collection.component';
export * from './header/tab-header.component';
export * from './label/tab-label-wrapper.directive';
export * from './label/tab-label.directive';
export * from './ink-bar/ink-bar.component';
export * from './tab/tab.component';


@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    FlexLayoutModule,
    MatRippleModule,
    ObserversModule,
    PortalModule,
  ],
  declarations: [
    TsTabBodyComponent,
    TsTabBodyHostDirective,
    TsTabCollectionComponent,
    TsTabComponent,
    TsTabContentDirective,
    TsTabHeaderComponent,
    TsTabInkBarComponent,
    TsTabLabelDirective,
    TsTabLabelWrapperDirective,
  ],
  exports: [
    TsTabCollectionComponent,
    TsTabComponent,
    TsTabContentDirective,
    TsTabLabelDirective,
    TsTabHeaderComponent,
    TsTabInkBarComponent,
    TsTabLabelWrapperDirective,
    TsTabBodyComponent,
    TsTabBodyHostDirective,
  ],
})
export class TsTabsModule {}
