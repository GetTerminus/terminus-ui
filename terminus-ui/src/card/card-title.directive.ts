import {
  Directive,
  HostBinding,
  Optional,
  Host,
  SkipSelf,
  OnChanges,
  isDevMode,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
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
    console.log('foo', parent);
    this._parent = parent;
  }


  /**
   * Verify correct nesting on all changes
   */
  ngOnChanges() {
    console.log('changes');
    this.checkParent();
  }


  /**
   * Verify the directive is nested inside of a {@link TsCardComponent}
   */
  checkParent() {
    console.log('in check', this._parent);
    // istanbul ignore else
    if (!(this._parent instanceof TsCardComponent) && isDevMode()) {
      throw Error(`The 'tsCardTitle' directive must be inside a <ts-card> component.`);
    }
  }
}
