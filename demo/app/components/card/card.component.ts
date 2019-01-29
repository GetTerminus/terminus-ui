// tslint:disable: no-non-null-assertion
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TsCardBorderOptions, TsCardComponent } from '@terminus/ui/card';


@Component({
  selector: 'demo-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements AfterViewInit {
  supportsInteraction = false;
  centered = false;
  flat = false;
  theme = 'primary';
  border: TsCardBorderOptions = 'none';

  @ViewChild('transitionCard')
  transitionCard!: TsCardComponent;

  ngAfterViewInit() {
    // Default the card to 100px height for demo purposes
    const innerCard = document.getElementById(this.transitionCard.id);
    innerCard!.style.height = '100px';
  }

  changeCardHeight() {
    const innerCard = document.getElementById(this.transitionCard.id);
    innerCard!.style.height = (innerCard!.style.height === '100px') ? '200px' : '100px';
  }
}
