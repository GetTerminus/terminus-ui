import { Component } from '@angular/core';

@Component({
  selector: 'demo-typography',
  styles: [`
    .first {
    }

    .second {
    }

    .third {
    }
  `],
  template: `
    <div class="first">
      brand enterprise paradigms
    </div>

    <div class="second">
      benchmark magnetic supply-chains
    </div>

    <div class="third">
      mesh collaborative methodologies
    </div>
  `,
})
export class TooltipComponent {
  myTooltip = 'Here is my content';
  myPosition = 'right';
}
