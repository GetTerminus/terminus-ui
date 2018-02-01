import {
  Directive,
  HostBinding,
} from '@angular/core';


@Directive({
  selector: '[tsCardTitle]',
})
export class TsCardTitleDirective {
  /**
   * Set the card title class
   */
  @HostBinding('class')
  tsCardTitle = 'c-card__title';
}
