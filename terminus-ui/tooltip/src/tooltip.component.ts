import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { isBoolean } from '@terminus/ngx-tools';


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
 * <example-url>https://getterminus.github.io/ui-demos-master/components/tooltip</example-url>
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
  public set tooltipPosition(value: TsTooltipPositionTypes) {
    if (value && isDevMode() && (allowedTooltipTypes.indexOf(value) < 0)) {
      console.warn(`TsTooltipComponent: "${value}" is not an allowed position. ` + 'Allowed positions defined by "allowedTooltipTypes".');
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
  public set hasUnderline(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsTooltipComponent: "hasUnderline" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._hasUnderline = coerceBooleanProperty(value);
  }
  public get hasUnderline(): boolean {
    return this._hasUnderline;
  }
  private _hasUnderline = false;
}
