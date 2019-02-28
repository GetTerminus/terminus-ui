import { Component } from '@angular/core';


@Component({
  selector: 'ts-expansion-panel-trigger-description',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'ts-expansion-panel__trigger-description',
  },
})
export class TsExpansionPanelTriggerDescriptionComponent {}
