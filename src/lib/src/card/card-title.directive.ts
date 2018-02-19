import {
  Directive,
  HostBinding,
  Optional,
  Host,
  SkipSelf,
  OnChanges,
  isDevMode,
} from '@angular/core';

import { TsCardComponent } from './card.component';


@Directive({
  selector: '[tsCardTitle]',
})
export class TsCardTitleDirective implements OnChanges {
  /**
   * Store a reference to the parent component
   */
  private _parent: TsCardComponent;

  /**
   * Set the card title class
   */
  @HostBinding('class')
  tsCardTitle = 'c-card__title';

  /**
   * Verify the directive is nested within a {@link TsCardComponent}
   */
  constructor(
    @Optional() @Host() @SkipSelf() parent: TsCardComponent,
  ) {
    this._parent = parent;
  }


  /**
   * Verify correct nesting on all changes
   */
  ngOnChanges() {
    this.checkParent();
  }


  /**
   * Verify the directive is nested inside of a {@link TsCardComponent}
   */
  checkParent() {
    // istanbul ignore else
    if (!(this._parent instanceof TsCardComponent) && isDevMode()) {
      throw Error(`The 'tsCardTitle' directive must be inside a <ts-card> component.`)
    }
  }
}
