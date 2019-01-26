import { HostBinding, Directive, Input } from '@angular/core';

@Directive({
  selector: '[tsTabContent]',
})
export class TsTabContentDirective {
  /**
   * Add class to every tab content.
   */
  @HostBinding('class.tabs__content')
  public readonly hasClasses: boolean;

  /**
   * Defines the content for the tab's content (no content means no data will be shown)
   */
  @Input()
  public tsTabContent!: string;

  /**
   * Adds active class for the active tab
   */
  @HostBinding('class.tabs__content-active')
  public isActive: boolean;

  constructor() {
    this.isActive = false;

    this.hasClasses = true;
  }
}
