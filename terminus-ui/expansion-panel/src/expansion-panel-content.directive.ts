import {
  Directive,
  TemplateRef,
} from '@angular/core';


/**
 * {@link TsExpansionPanelComponent} content that will be rendered lazily when the panel is opened for the first time.
 *
 * @example
 * <ts-expansion-panel>
 *               <ts-expansion-panel-trigger>
 *                 Panel trigger
 *               </ts-expansion-panel-trigger>
 *
 *               <ng-template tsExpansionPanelContent>
 *                 Panel content
 *               </ng-template>
 * </ts-expansion-panel>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/expansion-panel</example-url>
 */
@Directive({
  selector: 'ng-template[tsExpansionPanelContent]',
})
export class TsExpansionPanelContentDirective {
  // tslint:disable-next-line no-any
  constructor(public template: TemplateRef<any>) {}
}
