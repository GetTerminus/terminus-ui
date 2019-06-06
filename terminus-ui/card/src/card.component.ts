import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


/**
 * Define the allowed aspect ratios. Used in {@link TsCardComponent}
 */
export type TsAspectRatioTypes
  = '16:9'
  | '4:3'
  | '3:2'
  | '5:4'
  | '1:1'
;


/**
 * Define allowed border sides. Used in {@link TsCardComponent}. Border color determined by the theme.
 */
export type TsCardBorderOptions
  = 'none'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
;


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * A presentational component to render a card
 *
 * #### QA CSS CLASSES
 * - `qa-card`: Placed on the primary element
 * - `qa-card-lock`: Placed on the lock icon for disabled cards
 *
 * @example
 * <ts-card
 *              aspectRatio="3:5"
 *              border="right"
 *              [centeredContent]="true"
 *              [isDisabled]="true"
 *              [flat]="true"
 *              id="my-id"
 *              [supportsInteraction]="true"
 *              theme="primary"
 *              [utilityMenuTemplate]="myTemplate"
 * >Here is my card!</ts-card>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/card</example-url>
 */
@Component({
  selector: 'ts-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {class: 'ts-card'},
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCard',
})
export class TsCardComponent {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-card-${nextUniqueId++}`;

  /**
   * Expose the aspect ratio as a percentage
   */
  public aspectRatioPadding!: string;

  /**
   * Define if the card should conform to a fixed aspect ratio
   *
   * @param value - The aspect ratio. See {@link TsAspectRatioTypes} for possible values.
   */
  @Input()
  public set aspectRatio(value: TsAspectRatioTypes) {
    const x: number = parseInt(value.split(':')[0], 10);
    const y: number = parseInt(value.split(':')[1], 10);
    const percentageMultiplier = 100;
    const percentage: number = (y / x) * percentageMultiplier;
    const percentageMaxLength = 2;

    this.aspectRatioPadding = `${percentage.toFixed(percentageMaxLength)}%`;
  }

  /**
   * Define if a border should be present on the card. {@link TsCardBorderOptions}
   */
  @Input()
  public set border(value: TsCardBorderOptions) {
    if (!value) {
      return;
    }

    this._border = value;
  }
  public get border(): TsCardBorderOptions {
    return this._border;
  }
  private _border: TsCardBorderOptions = 'none';

  /**
   * Define if the card should center child content
   */
  @Input()
  public centeredContent = false;

  /**
   * Define if the card is disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define if the card should not have a drop shadow
   */
  @Input()
  public flat = false;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this._uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this._uid;

  /**
   * Define if the card should support interaction (via hover)
   *
   * NOTE: This only alters style; not functionality
   */
  @Input()
  public supportsInteraction = false;

  /**
   * Define the card theme
   */
  @Input()
  public set theme(value: TsStyleThemeTypes) {
    if (!value) {
      return;
    }

    this._theme = value;
  }
  public get theme(): TsStyleThemeTypes {
    return this._theme;
  }
  private _theme: TsStyleThemeTypes = 'primary';

  /**
   * Allow a custom utility menu to be added
   */
  @Input()
  public utilityMenuTemplate: TemplateRef<ElementRef> | undefined;

  /**
   * Getter to return a border class if the border is set
   */
  public get borderClass(): string {
    return (!this.border || this.border === 'none') ? '' : `c-card--border-${this.border}`;
  }


  constructor() {
    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }

}
