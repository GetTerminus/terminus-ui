import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
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
 *              theme="accent"
 * >My link</ts-link>
 *
 * <ts-link
 *              destination="http://google.com"
 *              [isExternal]="true"
 *              tabIndex="2"
 *              theme="warn"
 * >My link</ts-link>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/link</example-url>
 */
@Component({
  selector: 'ts-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  host: {class: 'ts-link'},
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsLink',
})
export class TsLinkComponent {
  /**
   * Define the icon for external links
   */
  public externalIcon = `open_in_new`;

  /**
   * Define the link's destination
   */
  @Input()
  public destination: string | string[] | undefined;

  /**
   * Define if the link is to an external page
   */
  @Input()
  public isExternal = false;

  /**
   * Define the tabindex
   */
  @Input()
  public tabIndex = 0;

}
