import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { CSV_ICON } from './custom-icons/csv';


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


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
     this.matIconRegistry.addSvgIconLiteral('csv', this.domSanitizer.bypassSecurityTrustHtml(CSV_ICON));
  }

}
