import {
  HostBinding,
  Input,
  Directive,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[tsTabHeader]',
})
export class TsTabHeaderDirective {
  /**
   * Add class to every tab header.
   */
  @HostBinding('class.tabs__header__item')
  public readonly hasClasses: boolean;

  /**
   * Defines the tab's header.
   */
  @Input()
  public tsTabHeader!: string;

  /**
   * Used to keep track of whether the header is active or not.
   */
  private _isActive: boolean;

  // Enables use of [(isActive)] so state can be set using booleans.
  /**
   * Enables use of [(isActive)] so state can be set using booleans.
   */
  @Output()
  public isActiveChange: EventEmitter<boolean>;

  /**
   * Triggers when isActive changes due to user's input.
   */
  public isActiveExternalChange: EventEmitter<boolean>;

  /**
   * Fires whenever a tab is activated having previously been deactivated.
   */
  @Output()
  public activate: EventEmitter<void>;

  /**
   * Fires whenever a tab is deactivated having previously been activated.
   */
  @Output()
  public deactivate: EventEmitter<void>;

  /**
   * Add active header class.
   *
   * Input is defined whether the header is active or not, so that class can be added.
   */
  @HostBinding('class.tabs__header__item-active')
  @Input()
  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(active: boolean) {
    let isActive = active;
    /**
     * Only used by @Input(), runs whenever user input changes `isActive`.
     *
     * Run in timeout because `isDisabled` can prohibit user from changing `isActive`.
     * so update is delayed to avoid 'changed after checked' error.
     */
    setTimeout(() => {
      /**
       * Only allow change if tab header is not disabled.
       */
      isActive = !this.isDisabled ? active : false;
      this.setActiveState(isActive);

      /**
       * Fire 'external change' event as user input has occured.
       */
      this.isActiveExternalChange.emit(isActive);
    });
  }

  private _isDisabled!: boolean;

  /**
   * Add disabled class to the header.
   *
   * Input is used to define whether the class is disabled or not.
   */
  @HostBinding('class.tabs__header__item-disabled')
  @Input()
  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  public set isDisabled(disabled: boolean) {
    /**
     * Only update if value provided is different to current one.
     */
    if (this._isDisabled !== disabled) {
      this._isDisabled = disabled;

      /**
       * If now disabled, then tab header must be deactivated.
       */
      if (this.isDisabled) {
        this.isActive = false;
      }
    }
  }

  constructor() {
    this._isActive = false;
    this.isActiveChange = new EventEmitter<boolean>();
    this.isActiveExternalChange = new EventEmitter<boolean>();

    this.activate = new EventEmitter<void>();
    this.deactivate = new EventEmitter<void>();

    this.isDisabled = false;

    this.hasClasses = true;
  }

  /**
   * Internally update active state.
   *
   * @param active - update the active state.
   */
  public setActiveState(active: boolean): void {
    /**
     * If (cast) active value has changed:
     */
    if (!!this._isActive !== active) {
      /**
       * Update to the new value.
       */
      this._isActive = active;

      /**
       * Fire the appropriate activation event.
       */
      if (active) {
        this.activate.emit();
      } else {
        this.deactivate.emit();
      }
    }

    /**
     * Regardless, emit a change to `isActive`, so [(isActive)] works correctly.
     */
    this.isActiveChange.emit(active);
  }

  @HostListener('click')
  public onClick(): void {
    if (!this.isDisabled) {
      /**
       * Activate the tab when clicked, so long as it isn't disabled.
       */
      this.isActive = true;
    }
  }
}
