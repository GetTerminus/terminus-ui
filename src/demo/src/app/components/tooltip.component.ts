import { Component } from '@angular/core';

@Component({
  selector: 'demo-tooltip',
  template: `
    <p>
      Here is some text with
      <ts-tooltip
        [tooltipValue]="myTooltip"
      >a tooltip here</ts-tooltip>
      for everyone to see!
    </p>
  `,
})
export class TooltipComponent {
  myTooltip = 'Here is my content';
  myPosition = 'right';
}
