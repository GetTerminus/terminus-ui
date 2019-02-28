import { Component } from '@angular/core';



@Component({
  selector: 'ts-expansion-panel-trigger-title',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'ts-expansion-panel__trigger-title',
  },
})
export class TsExpansionPanelTriggerTitleComponent {}
