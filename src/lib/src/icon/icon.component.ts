import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';


/**
 * This is the icon UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-icon`: Placed on the primary container
 *
 * @example
 * <ts-icon>icon_name</ts-icon>
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsIconComponent {
  /**
   * Name of the icon in the SVG icon set
   */
  @Input()
  public svgIcon: string;

  /**
   * Define if the icon should be aligned inline with text
   */
  @Input()
  public inline: boolean = false;
}
