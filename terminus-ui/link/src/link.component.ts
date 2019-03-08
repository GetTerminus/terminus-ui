import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  ViewEncapsulation,
} from '@angular/core';
import { isBoolean } from '@terminus/ngx-tools';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';


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
  host: {
    class: 'ts-link',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsLink',
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
  public set isExternal(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsLinkComponent: "isExternal" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isExternal = coerceBooleanProperty(value);
  }
  public get isExternal(): boolean {
    return this._isExternal;
  }
  private _isExternal = false;

  /**
   * Define the tabindex
   */
  @Input()
  public tabIndex: number = 0;

}
