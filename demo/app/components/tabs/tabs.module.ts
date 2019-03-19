import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TsIconModule } from '@terminus/ui/icon';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsTabsModule } from '@terminus/ui/tabs';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsRoutingModule,
    TsIconModule,
    TsSpacingModule,
    TsTabsModule,
  ],
  declarations: [TabsComponent],
})
export class TabsModule {}
