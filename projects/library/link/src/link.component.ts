import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { isString } from '@terminus/ngx-tools';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


/**
 * This is the link UI Component
 *
 * @example
 * <ts-link
 *              [destination]="['your/', 'path/']"
 *              theme="accent"
 * >My link</ts-link>
 *
 * <ts-link
 *              destination="http://google.com"
 *              fragment="myElementId"
 *              [isExternal]="true"
 *              tabIndex="2"
 *              theme="warn"
 * >My link</ts-link>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/link</example-url>
 */
@Component({
  selector: 'ts-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  host: {
    'class': 'ts-link',
    '[class.ts-link--primary]': 'theme === "primary"',
    '[class.ts-link--accent]': 'theme === "accent"',
    '[class.ts-link--warn]': 'theme === "warn"',
  },
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
   * Define the route needed when only using a fragment
   */
  public localRoute = ['.'];

  /**
   * Decide whether an external icon should be shown
   */
  public showExternalIcon = true;

  /**
   * Define the link's destination
   *
   * @param value
   */
  @Input()
  public set destination(value: string | string[] | undefined) {
    if (isString(value) && (value.includes('mailto') || value.includes('tel'))) {
      this.showExternalIcon = false;
    }
    this._destination = value;
  }
  public get destination(): string | string[] | undefined {
    return this._destination;
  }
  public _destination: string | string[] | undefined;

  /**
   * Define the link's fragment
   */
  @Input()
  public fragment: string | undefined;

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

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';
}
