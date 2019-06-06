import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  ViewEncapsulation,
} from '@angular/core';


/**
 * Define the accepted string values for the {@link TsTooltipComponent} position
 */
export type TsTooltipPositionTypes
  = 'above'
  | 'below'
  | 'before'
  | 'after'
;

/**
 * Define the allowed tooltips Used by {@link TsTooltipComponent} position
 */
export const allowedTooltipTypes: TsTooltipPositionTypes[] = [
  'above',
  'below',
  'before',
  'after',
];


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
 * <example-url>https://getterminus.github.io/ui-demos-release/components/tooltip</example-url>
 */
@Component({
  selector: 'ts-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  host: {class: 'ts-tooltip'},
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsTooltipComponent {
  /**
   * Define the position of the tooltip
   */
  @Input()
  public set tooltipPosition(value: TsTooltipPositionTypes) {
    if (value && isDevMode() && (allowedTooltipTypes.indexOf(value) < 0)) {
      console.warn(`TsTooltipComponent: "${value}" is not an allowed position. Allowed positions defined by "TsTooltipPositionTypes".`);
    }
    this._tooltipPosition = value;
  }
  public get tooltipPosition(): TsTooltipPositionTypes {
    return this._tooltipPosition;
  }
  private _tooltipPosition: TsTooltipPositionTypes = 'below';

  /**
   * Define the content to display within the tooltip
   */
  @Input()
  public tooltipValue!: string;

  /**
   * Define whether there is a dotted underline shown on the text
   */
  @Input()
  public hasUnderline = false;
}
