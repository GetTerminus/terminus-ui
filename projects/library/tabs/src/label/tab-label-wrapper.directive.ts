import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';


/**
 * Used in the `ts-tab-collection` view to display tab labels
 *
 * NOTE: Only used internally
 */
@Directive({
  selector: '[tsTabLabelWrapper]',
  host: {
    '[class.ts-tab-label--disabled]': 'isDisabled',
    '[attr.aria-disabled]': '!!isDisabled',
  },
})
export class TsTabLabelWrapperDirective {
  // This is needed by the CdkListKeyManager - they are checking for `disabled` rather than `isDisabled`
  public disabled = false;

  /**
   * Determine the left offset
   */
  public get offsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  /**
   * Determine the offset width
   */
  public get offsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  /**
   * Define if the label is disabled
   *
   * @param value
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._isDisabled = value;
    this.disabled = value;
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;


  constructor(
    public elementRef: ElementRef,
  ) {}


  /**
   * Set focus on the wrapper element
   */
  public focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
