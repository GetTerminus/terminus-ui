import {
  Directive,
  TemplateRef,
} from '@angular/core';


/**
 * Decorates the `ng-template` tags and reads out the template from it
 *
 * @example
 * <ts-tab label="My tab">
 *              <ng-template tsTabContent>
 *                My tab content
 *              </ng-template>
 * </ts-tab>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/tabs</example-url>
 */
@Directive({
  selector: '[tsTabContent]',
})
export class TsTabContentDirective {
  constructor(
    // tslint:disable-next-line no-any
    public template: TemplateRef<any>,
  ) {}
}
