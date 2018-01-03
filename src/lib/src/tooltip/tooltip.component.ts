import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { TsTooltipPositionTypes } from './../utilities/types';


/**
 * This is the tooltip UI Component
 *
 * -- QA CSS CLASSES
 *
 * qa-tooltip : Placed on the span element used for this component
 *
 * @example
 * <ts-tooltip
 *              [tooltipValue]="myTooltip"
 *              [tooltipPosition]="myPosition"
 * >My Tooltip!</ts-tooltip>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
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
