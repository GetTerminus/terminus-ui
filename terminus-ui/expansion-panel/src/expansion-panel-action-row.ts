import { Component } from '@angular/core';


/**
 * {@link TsExpansionPanelComponent} action row that will be rendered at the bottom of the panel.
 *
 * @example
 * <ts-expansion-panel>
 *               <ts-expansion-panel-trigger>
 *                 Panel trigger
 *               </ts-expansion-panel-trigger>
 *
 *               Panel content
 *
 *               <ts-expansion-panel-action-row>
 *                 <button>Next</button>
 *               </ts-expansion-panel-action-row>
 * </ts-expansion-panel>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/expansion-panel</example-url>
 */
@Component({
  selector: 'ts-expansion-panel-action-row',
  template:  `<ng-content></ng-content>`,
  host: {
    class: 'ts-expansion-panel__action-row',
  },
})
export class TsExpansionPanelActionRowComponent {}
