import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';


/**
 * Define the accepted string values for the {@link TsTooltipComponent} position
 */
export type TsTooltipPositionTypes =
  'left' |
  'right' |
  'above' |
  'below' |
  'before' |
  'after'
;


/**
 * This is the tooltip UI Component
 *
 * #### QA CSS CLASSES
 *
 * - qa-tooltip : Placed on the span element used for this component
 *
 * @example
 * <ts-tooltip
 *              [tooltipValue]="myTooltip"
 *              [tooltipPosition]="myPosition"
 *              [hasUnderline]="myUnderlineOption"
 * >My Tooltip!</ts-tooltip>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  host: {
    class: 'ts-tooltip',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsTooltipComponent {
  /**
   * Define the position of the tooltip
   */
  @Input()
  public tooltipPosition: TsTooltipPositionTypes = 'below';

  /**
   * Define the content to display within the tooltip
   */
  @Input()
  public tooltipValue!: string;

  /**
   * Define whether there is a dotted underline shown on the text
   */
  @Input()
  public set hasUnderline(value: boolean) {
    this._hasUnderline = coerceBooleanProperty(value);
  }
  public get hasUnderline(): boolean {
    return this._hasUnderline;
  }
  private _hasUnderline = false;
}
