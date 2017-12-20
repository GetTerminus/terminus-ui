import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
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
 * <example-url>http://bnj.bz/3J0j450T2x2b</example-url>
 */
@Component({
  selector: 'ts-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsLinkComponent {
  /**
   * Define the icon for external links
   */
  public externalIcon: string = `open_in_new`;

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
