import { Component } from '@angular/core';
import { TsTooltipPositionTypes } from '@terminus/ui';


@Component({
  selector: 'demo-tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  myTooltip = 'Here is my content';
  myPosition: TsTooltipPositionTypes = 'below';
  showUnderline = true;
}
