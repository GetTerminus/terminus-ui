import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ts-expansion-panel-trigger-title',
  template: `<ng-content></ng-content>`,
  host: { class: 'ts-expansion-panel__trigger-title' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsExpansionPanelTriggerTitle',
})
export class TsExpansionPanelTriggerTitleComponent {}
