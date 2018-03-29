import { Component } from '@angular/core';


@Component({
  selector: 'demo-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  supportsInteraction = false;
  centered = false;
}
