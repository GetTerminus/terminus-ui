import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * This is the icon UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-icon`: Placed on the primary container
 *
 * @example
 * <ts-icon>home</ts-icon>
 * <ts-icon theme="warn">help</ts-icon>
 *
 * <ts-icon svgIcon="left-arrow"></ts-icon>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: {
    class: 'ts-icon',
    '[class.ts-icon--inline]': 'inline',
    '[class.ts-icon--primary]': 'theme === "primary"',
    '[class.ts-icon--accent]': 'theme === "accent"',
    '[class.ts-icon--warn]': 'theme === "warn"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsIconComponent {
  /**
   * Define if the icon should be aligned inline with text
   */
  @Input()
  public inline: boolean = false;

  /**
   * Name of the icon in the SVG icon set
   */
  @Input()
  public svgIcon: string | undefined;

  /**
   * Define the icon theme
   */
  @Input()
  public theme: TsStyleThemeTypes | undefined;
}
