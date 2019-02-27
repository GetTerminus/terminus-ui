import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';

import { CSV_ICON } from './custom-icons/csv';
import { ENGAGE_ICON } from './custom-icons/engage';
import { LIGHTBULB_ICON } from './custom-icons/lightbulb';
import { LOGO_ICON } from './custom-icons/logo';
import { LOGO_COLOR_ICON } from './custom-icons/logo_color';


/**
 * Currently supported custom icons
 */
export type TS_CUSTOM_ICON
  = `csv`
  | `engage`
  | `lightbulb`
  | `logo`
  | `logo_color`
;


/**
 * An array of supported custom icons.
 */
export const TS_CUSTOM_ICONS: TS_CUSTOM_ICON[] = [
  'csv',
  'engage',
  'lightbulb',
  'logo',
  'logo_color',
];


/**
 * This is the icon UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-icon`: Placed on the primary container
 *
 * @example
 * <ts-icon>home</ts-icon>
 * <ts-icon theme="warn">help</ts-icon>
 * <ts-icon svgIcon="left-arrow"></ts-icon>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/icon</example-url>
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
    '[class.ts-icon--background]': 'background',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsIcon',
})
export class TsIconComponent {
  /**
   * Define if the icon should have a colored background.
   *
   * NOTE: This will affect layout and style.
   */
  @Input()
  public set background(value: boolean) {
    this._background = coerceBooleanProperty(value);
  }
  public get background(): boolean {
    return this._background;
  }
  private _background = false;

  /**
   * Define if the icon should be aligned inline with text
   */
  @Input()
  public inline = false;

  /**
   * Name of the custom icon
   */
  @Input()
  public set svgIcon(value: TS_CUSTOM_ICON | undefined) {
    // If an unsupported value is passed in
    if (value && TS_CUSTOM_ICONS.indexOf(value) < 0 && isDevMode()) {
      console.warn(`TsIconComponent: "${value}" is not a supported custom icon. ` +
      `See TS_CUSTOM_ICON for available options.`);
      return;
    }

    this._svgIcon = value;
  }
  public get svgIcon(): TS_CUSTOM_ICON | undefined {
    return this._svgIcon;
  }
  private _svgIcon: TS_CUSTOM_ICON | undefined;

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
    this.matIconRegistry.addSvgIconLiteral('engage', this.domSanitizer.bypassSecurityTrustHtml(ENGAGE_ICON));
    this.matIconRegistry.addSvgIconLiteral('lightbulb', this.domSanitizer.bypassSecurityTrustHtml(LIGHTBULB_ICON));
    this.matIconRegistry.addSvgIconLiteral('logo', this.domSanitizer.bypassSecurityTrustHtml(LOGO_ICON));
    this.matIconRegistry.addSvgIconLiteral('logo_color', this.domSanitizer.bypassSecurityTrustHtml(LOGO_COLOR_ICON));
  }

}
