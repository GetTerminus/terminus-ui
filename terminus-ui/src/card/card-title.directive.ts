import {
  Directive,
  HostBinding,
  Optional,
  Host,
  SkipSelf,
  isDevMode,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TsCardComponent } from './card.component';


@Directive({
  selector: '[tsCardTitle]',
})
export class TsCardTitleDirective {
  /**
   * Option to add a border to the header
   */
  @Input()
  public set tsTitleAccentBorder(value: boolean) {
    const setTitleAccBorder = coerceBooleanProperty(value);
    if (setTitleAccBorder) {
      this.tsCardTitle = this.tsCardTitle + ' c-card__title-accent-border';
    }
  }
  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

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
    if (!(parent instanceof TsCardComponent) && isDevMode()) {
      throw Error(`The 'tsCardTitle' directive must be inside a <ts-card> component.`);
    }
  }

}
