import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsAccordionComponent } from './accordion/accordion.component';
import { TsExpansionPanelActionRowComponent } from './expansion-panel-action-row';
import { TsExpansionPanelContentDirective } from './expansion-panel-content.directive';
import { TsExpansionPanelComponent } from './expansion-panel.component';
import { TsExpansionPanelTriggerDescriptionComponent } from './trigger/expansion-panel-trigger-description.component';
import { TsExpansionPanelTriggerTitleComponent } from './trigger/expansion-panel-trigger-title.component';
import { TsExpansionPanelTriggerComponent } from './trigger/expansion-panel-trigger.component';


export * from './expansion-panel.component';
export * from './expansion-panel-content.directive';
export * from './expansion-panel-action-row';
export * from './trigger/expansion-panel-trigger.component';
export * from './trigger/expansion-panel-trigger-title.component';
export * from './trigger/expansion-panel-trigger-description.component';
export * from './accordion/accordion.component';
export * from './accordion/accordion-base';
export * from './expansion-animations';


@NgModule({
  imports: [
    CommonModule,
    CdkAccordionModule,
    PortalModule,
  ],
  declarations: [
    TsExpansionPanelComponent,
    TsExpansionPanelTriggerComponent,
    TsExpansionPanelTriggerTitleComponent,
    TsExpansionPanelTriggerDescriptionComponent,
    TsExpansionPanelContentDirective,
    TsExpansionPanelActionRowComponent,
    TsAccordionComponent,
  ],
  exports: [
    TsExpansionPanelComponent,
    TsExpansionPanelTriggerComponent,
    TsExpansionPanelTriggerTitleComponent,
    TsExpansionPanelTriggerDescriptionComponent,
    TsExpansionPanelContentDirective,
    TsExpansionPanelActionRowComponent,
    TsAccordionComponent,
  ],
})
export class TsExpansionPanelModule {}
