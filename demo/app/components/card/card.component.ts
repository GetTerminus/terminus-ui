import { Component } from '@angular/core';
import { TsCardBorderOptions } from '@terminus/ui';


@Component({
  selector: 'demo-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  supportsInteraction = false;
  centered = false;
  flat = false;
  theme = 'primary';
  border: TsCardBorderOptions = 'none';
}
