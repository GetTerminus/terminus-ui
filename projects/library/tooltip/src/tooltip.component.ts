import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';


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
 * @example
 * <ts-tooltip
 *              [hasUnderline]="myUnderlineOption"
 *              [tooltipPosition]="myPosition"
 *              [tooltipValue]="myTooltip"
 * >My Tooltip!</ts-tooltip>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/tooltip</example-url>
 */
@Component({
  selector: 'ts-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  host: { class: 'ts-tooltip' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsTooltipComponent {
  /**
   * Define whether there is a dotted underline shown on the text
   */
  @Input()
  public hasUnderline = false;

  /**
   * Define the position of the tooltip
   *
   * @param value
   */
  @Input()
  public set tooltipPosition(value: TsTooltipPositionTypes) {
    if (value && isDevMode() && (allowedTooltipTypes.indexOf(value) < 0)) {
      // eslint-disable-next-line no-console
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
   * Access Material Tooltip Directive
   */
  @ViewChild('tooltip', { static: true })
  public matTooltip!: MatTooltip;

  /**
   * Call Material Tooltip's show() method
   */
  public showTooltip(): void {
    this.matTooltip.show();
  }
}
