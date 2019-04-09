import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsButtonModule } from '@terminus/ui/button';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsExpansionPanelModule } from '@terminus/ui/expansion-panel';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ExpansionPanelRoutingModule } from './expansion-panel-routing.module';
import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  imports: [CommonModule, ExpansionPanelRoutingModule, TsButtonModule, TsCheckboxModule, TsExpansionPanelModule, TsSpacingModule],
  declarations: [ExpansionPanelComponent],
})
export class ExpansionPanelModule {}
