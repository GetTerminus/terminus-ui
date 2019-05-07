import {
  Directive,
  ElementRef,
} from '@angular/core';


/**
 * Directive used to allow the consumer to define the view text for a {@link TsOptionComponent}
 */
@Directive({
  selector: '[tsSelectOptionDisplay]',
})
export class TsSelectOptionDisplayDirective {
  constructor(
    public elementRef: ElementRef,
  ) {}
}
