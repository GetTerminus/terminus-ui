import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser';

import { FULL_ACCOUNT_HUB_LOGO } from './logo-types/full-account-hub';
import { FULL_GRADIENT_LOGO } from './logo-types/full-gradient';
import { FULL_SOLID_LOGO } from './logo-types/full-solid';
import { MARK_GRADIENT_LOGO } from './logo-types/mark-gradient';
import { MARK_SOLID_LOGO } from './logo-types/mark-solid';


/**
 * Currently supported logo types
 */
export type TS_LOGO_TYPE
  = 'full-account-hub'
  | 'full-gradient'
  | 'full-solid'
  | 'mark-gradient'
  | 'mark-solid'
;


/**
 * An array of supported logo types.
 */
export const TS_LOGO_TYPES: TS_LOGO_TYPE[] = [
  'full-account-hub',
  'full-gradient',
  'full-solid',
  'mark-gradient',
  'mark-solid',
];

/**
 * Currently supported logo colors
 */
export type TS_LOGO_COLOR
  = 'white'
  | 'black'
  | 'gray'
;


/**
 * An array of supported logo colors.
 */
export const TS_LOGO_COLORS: TS_LOGO_COLOR[] = [
  'white',
  'black',
  'gray',
];


/**
 * This is the logo UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-label`: Placed on the primary container
 *
 * @example
 * <ts-logo type="full-gradient"></ts-logo>
 * <ts-logo type="solid-mark" logoColor="gray"></ts-logo>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/logo</example-url>
 */
@Component({
  selector: 'ts-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  host: {
    'class': 'ts-logo',
    '[class.ts-logo--black]': 'logoColor === "black"',
    '[class.ts-logo--gray]': 'logoColor === "gray"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsLogo',
})
export class TsLogoComponent implements OnInit {
  public svg: SafeHtml = ``;

  /**
   * Name of the logo types
   */
  @Input()
  public set type(value: TS_LOGO_TYPE) {
    // If an unsupported value is passed in
    if (value && TS_LOGO_TYPES.indexOf(value) < 0 && isDevMode()) {
      console.warn(`TsLogoComponent: "${value}" is not a supported logo type. `
      + `See TS_LOGO_TYPE for available options.`);
      return;
    }
    this._type = value;
  }
  public get type(): TS_LOGO_TYPE {
    return this._type;
  }
  private _type: TS_LOGO_TYPE = 'full-gradient';


  /**
   * Name of the logo colors
   */
  @Input()
  public set logoColor(value: TS_LOGO_COLOR) {
    // If an unsupported value is passed in
    if (value && TS_LOGO_COLORS.indexOf(value) < 0 && isDevMode()) {
      console.warn(`TsLogoComponent: "${value}" is not a supported logo color. `
      + `See TS_LOGO_COLOR for available options.`);
      return;
    }
    this._logoColor = value;
  }
  public get logoColor(): TS_LOGO_COLOR {
    return this._logoColor;
  }
  private _logoColor: TS_LOGO_COLOR = 'white';


  constructor(
    private domSanitizer: DomSanitizer,
  ) {}


  public ngOnInit(): void {
    this.setType();
  }


  /**
   * sets the svg based on the type selected; resets logoColor for logo types with gradient
   */
  private setType(): void {
    switch (this.type) {
      case ('full-account-hub'):
        this.logoColor = 'white';
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(FULL_ACCOUNT_HUB_LOGO);
        break;
      case ('full-gradient'):
        this.logoColor = 'white';
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(FULL_GRADIENT_LOGO);
        break;
      case ('full-solid'):
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(FULL_SOLID_LOGO);
        break;
      case ('mark-gradient'):
        this.logoColor = 'white';
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(MARK_GRADIENT_LOGO);
        break;
      case ('mark-solid'):
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(MARK_SOLID_LOGO);
        break;
      default:
        this._logoColor = 'white';
        this.svg = this.domSanitizer.bypassSecurityTrustHtml(FULL_GRADIENT_LOGO);
        break;
    }
  }
}
