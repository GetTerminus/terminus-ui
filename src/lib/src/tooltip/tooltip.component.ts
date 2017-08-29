import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { TsTooltipPositionTypes } from './../utilities/types';


/**
 * This is the tooltip UI Component
 *
 * @example
 * <tooltip
 *              [tooltipValue]="myTooltip"
 *              [tooltipPosition]="myPosition"
 * >My Tooltip!</tooltip>
 */
@Component({
  selector: 'ts-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public tooltipValue: string;
}
