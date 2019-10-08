import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';

import {
  TsTooltipComponent,
  TsTooltipModule,
  TsTooltipPositionTypes,
} from '@terminus/ui/tooltip';


@Component({
  template: `
    <ts-tooltip>Tooltip Text!</ts-tooltip>
  `,
})
export class Basic {
  @ViewChild(TsTooltipComponent, { static: false })
  public tooltipComponent!: TsTooltipComponent;
}


@Component({
  template: `
    <ts-tooltip
      [hasUnderline]="hasUnderline"
      [tooltipPosition]="tooltipPosition"
      >Tooltip Text!</ts-tooltip>
  `,
})
export class TestHostComponent {
  public hasUnderline: boolean;
  public tooltipPosition: TsTooltipPositionTypes;

  @ViewChild(TsTooltipComponent, { static: false })
  public tooltipComponent!: TsTooltipComponent;
}


@Component({
  template: `
    <ts-tooltip
      [tooltipValue]="tooltipValue"
      >Tooltip Text!</ts-tooltip>
  `,
})
export class TooltipValue {
  public tooltipValue: string;

  @ViewChild(TsTooltipComponent, { static: false })
  public tooltipComponent!: TsTooltipComponent;
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsTooltipModule,
  ],
  declarations: [
    Basic,
    TestHostComponent,
    TooltipValue,
  ],
})
export class TsTooltipTestComponentsModule {}
