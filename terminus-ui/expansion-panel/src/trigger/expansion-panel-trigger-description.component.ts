import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ts-expansion-panel-trigger-description',
  template: `<ng-content></ng-content>`,
  host: { class: 'ts-expansion-panel__trigger-description' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsExpansionPanelTriggerDescription',
})
export class TsExpansionPanelTriggerDescriptionComponent {}
