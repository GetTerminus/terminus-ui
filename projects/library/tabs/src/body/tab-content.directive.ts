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
 * <example-url>https://getterminus.github.io/ui-demos-release/components/tabs</example-url>
 */
@Directive({ selector: '[tsTabContent]' })
export class TsTabContentDirective {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public template: TemplateRef<any>,
  ) {}
}
