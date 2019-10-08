import {
  Directive,
  ElementRef,
} from '@angular/core';


/**
 * Directive used to allow the consumer to define the view text for a {@link TsOptionComponent}
 */
@Directive({ selector: '[tsOptionDisplay]' })
export class TsOptionDisplayDirective {
  constructor(
    public elementRef: ElementRef,
  ) {}
}
