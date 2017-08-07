import {
  Component,
  Input,
  Output,
} from '@angular/core';


/**
 * This is the link UI Component
 *
 * @example
 * <ts-link
 *              [destination]="['/', 'your', 'path']"
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
})
export class TsLinkComponent {
  /**
   * Define the icon for external links
   */
  public externalIcon: string = `open_in_new`;

  /**
   * Define the link's destination
   */
  @Input() destination: any;

  /**
   * Define if the link is to an external page
   */
  @Input() isExternal: boolean = false;

  /**
   * Define the link text content
   */
  @Input() text: string;
}
