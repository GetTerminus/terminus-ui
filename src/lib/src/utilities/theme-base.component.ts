import {
  Component,
  Input,
  ElementRef,
} from '@angular/core';

import { TsStyleThemeTypes } from './../types/style-theme.types';


/**
 * A base class to set a class theme on a component
 */
@Component({
  selector: 'ts-theme-base',
})
export class TsThemeBaseComponent {
  /**
   * Define the button style
   */
  @Input() set theme(theme: TsStyleThemeTypes) {
    if (!theme) {
      return;
    }

    this.element.nativeElement.classList.add(`u-theme--${theme}`);
  };

  constructor(
    protected element: ElementRef,
  ) {}

}
