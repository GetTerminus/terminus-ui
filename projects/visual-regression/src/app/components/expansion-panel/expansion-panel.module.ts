import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsExpansionPanelModule } from '@terminus/ui/expansion-panel';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ExpansionPanelRoutingModule } from './expansion-panel-routing.module';
import { ExpansionPanelComponent } from './expansion-panel.component';


@NgModule({
  imports: [
    CommonModule,
    ExpansionPanelRoutingModule,
    TsButtonModule,
    TsCardModule,
    TsCheckboxModule,
    TsExpansionPanelModule,
    TsSpacingModule,
    FormsModule,
  ],
  declarations: [
    ExpansionPanelComponent,
  ],
})
export class ExpansionPanelModule {}
