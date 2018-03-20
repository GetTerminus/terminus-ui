import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  isDevMode,
} from '@angular/core';


/**
 * This is the link UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-link`: Placed on the link element
 * - `qa-link-internal`: Placed on the link element if the link is internal
 * - `qa-link-external`: Placed on the link element if the link is external
 *
 * @example
 * <ts-link
 *              [destination]="['your/', 'path/']"
 *              color="accent"
 * >My link</ts-link>
 *
 * <ts-link
 *              destination="http://google.com"
 *              [isExternal]="true"
 *              tabIndex="2"
 *              color="warn"
 * >My link</ts-link>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  host: {
    class: 'ts-link',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsLinkComponent {
  /**
   * Define the icon for external links
   */
  public externalIcon: string = `open_in_new`;

  /**
   * Create input to show deprecation notice
   *
   * @deprecated
   * @deletion-target 7.0.0
   */
  @Input()
  public set color(value: string) {
    // istanbul ignore else
    if (isDevMode()) {
      console.warn(
        'The TsLinkComponent `[color]` parameter has been deprecated and will be removed in ' +
        '`@terminus/ui@7.0.0`.\n' +
        'You can use the `[theme]` parameter to set the link\'s color.',
      );
    }
  }

  /**
   * Define the link's destination
   */
  @Input()
  public destination: any;

  /**
   * Define if the link is to an external page
   */
  @Input()
  public isExternal: boolean = false;

  /**
   * Define the tabindex
   */
  @Input()
  public tabIndex: number = 0;

}
