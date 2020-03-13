/**
 * Define positions that popover accepts
 */
export type TsPopoverPosition
  = 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'bottom-start'
  | 'left-start'
  | 'right-start'
  | 'top-end'
  | 'bottom-end'
  | 'left-end'
  | 'right-end'
  | 'auto'
  | 'auto-start'
  | 'auto-end'
;

/**
 * List of accepted positions
 */
export const tsPopoverPositions = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'bottom-start',
  'right-start',
  'top-end',
  'bottom-end',
  'left-end',
  'right-end',
  'top-end',
  'bottom-end',
  'left-end',
  'right-end',
  'auto',
  'auto-start',
  'auto-end',
];

/**
 * A class of defined positions.
 */
export class TsPopoverPositions {
  public static Top: TsPopoverPosition = 'top';
  public static Bottom: TsPopoverPosition = 'bottom';
  public static Left: TsPopoverPosition = 'left';
  public static Right: TsPopoverPosition = 'right';
  public static TopStart: TsPopoverPosition = 'top-start';
  public static BottomStart: TsPopoverPosition = 'bottom-start';
  public static LeftStart: TsPopoverPosition = 'left-start';
  public static RightStart: TsPopoverPosition = 'right-start';
  public static TopEnd: TsPopoverPosition = 'top-end';
  public static BottomEnd: TsPopoverPosition = 'bottom-end';
  public static LeftEnd: TsPopoverPosition = 'left-end';
  public static RightEnd: TsPopoverPosition = 'right-end';
  public static Auto: TsPopoverPosition = 'auto';
  public static AutoStart: TsPopoverPosition = 'auto-start';
  public static AutoEnd: TsPopoverPosition = 'auto-end';
}

/**
 * Define Trigger type.
 */
export type TsTrigger = 'click';

/**
 * A class of Triggers.
 */
export class TsTriggers {
  public static CLICK: TsTrigger = 'click';
}

/**
 * Our defined option interface.
 */
export interface TsPopoverOptions {
  ariaRole?: string;
  trigger?: TsTrigger;
  placement?: TsPopoverPosition;
  popperModifiers?: {};
  styles?: Object;
}
