import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ElementRef,
} from '@angular/core';

import {
  TsStyleThemeTypes,
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
 *              [utilityMenuTemplate]="myTemplate"
 * >Here is my card!</ts-card>
 *
 * <example-url>http://bnj.bz/3J0j450T2x2b</example-url>
 */
@Component({
  selector: 'ts-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsCardComponent {
  /**
   * Define if the card should support interaction (via click)
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
}
