import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ElementRef,
} from '@angular/core';

import {
  TsAspectRatioTypes,
} from './../utilities/types';


/**
 * A presentational component to render a card
 *
 * #### QA CSS CLASSES
 * - `qa-card`: Placed on the primary element
 *
 * @example
 * <ts-card
 *              supportsInteraction="true"
 *              centeredContent="true"
 *              aspectRatio="3:5"
 *              [utilityMenuTemplate]="myTemplate"
 * >Here is my card!</ts-card>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'ts-card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCard',
})
export class TsCardComponent {
  /**
   * Expose the aspect ratio as a percentage
   */
  public aspectRatioPadding: string;

  /**
   * Define if the card should conform to a fixed aspect ratio
   *
   * @param value - The aspect ratio. See {@link TsAspectRatioTypes} for possible values.
   */
  @Input()
  public set aspectRatio(value: TsAspectRatioTypes) {
    const x: number = parseInt(value.split(':')[0], 10);
    const y: number = parseInt(value.split(':')[1], 10);
    const percentage: number = ((y / x) * 100);

    this.aspectRatioPadding = `${percentage.toFixed(2)}%`;
  }

  /**
   * Define if the card should support interaction (via hover)
   *
   * NOTE: This only alters style; not functionality
   */
  @Input()
  public supportsInteraction: boolean = false;

  /**
   * Define if the card should center child content
   */
  @Input()
  public centeredContent: boolean = false;

  /**
   * Allow a custom utility menu to be added
   */
  @Input()
  public utilityMenuTemplate: TemplateRef<ElementRef>;

  /**
   * Define if the card is disabled
   */
  @Input()
  public disabled: boolean = false;

}
