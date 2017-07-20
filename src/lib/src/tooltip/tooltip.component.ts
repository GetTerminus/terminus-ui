import {
  Component,
  Input,
} from '@angular/core';


export type TsTooltipPosition =
  'left' |
  'right' |
  'above' |
  'below' |
  'before' |
  'after';

/**
 * This is the tooltip UI Component
 *
 * @example
 * <tooltip
 *         [tooltipValue]="myTooltip"
 *         [tooltipPosition]="myPosition"
 * >My Tooltip!</tooltip>
 */
@Component({
  selector: 'ts-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TsTooltipComponent {
  /**
   * Define the position of the tooltip
   */
  @Input() tooltipPosition: TsTooltipPosition = 'below';

  /**
   * Define the content to display within the tooltip
   */
  @Input() tooltipValue: string;
}
