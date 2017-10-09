import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
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
 *              text="Click me!"
 *              color="accent"
 * ></ts-link>
 *
 * <ts-link
 *              destination="http://google.com"
 *              [isExternal]="true"
 *              text="Click me too!"
 *              color="warn"
 * ></ts-link>
 */
@Component({
  selector: 'ts-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Define the link text content
   */
  @Input()
  public text: string;
}
