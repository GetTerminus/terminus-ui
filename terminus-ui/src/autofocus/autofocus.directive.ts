import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  isDevMode,
  ChangeDetectorRef,
} from '@angular/core';

import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';


/**
 * Autofocus any focusable element on-load.
 *
 * Passing any truthy value OR an empty string will enable the autofocus.
 *
 * @example
 * <input type="text" tsAutofocus />
 * <button [tsAutofocus]="true">Click Me</button>
 */
@Directive({
  selector: '[tsAutofocus]',
})
export class TsAutofocusDirective implements AfterViewInit {
  /**
   * Store the shouldFocus value
   */
  private shouldFocus!: boolean;

  /**
   * Define if the element should be focused after initialization
   */
  @Input()
  public set tsAutofocus(value: any) {
    this.shouldFocus = coerceBooleanProperty(value);
  }

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Focus the input after the view has initialized
   */
  public ngAfterViewInit(): void {
    if (this.shouldFocus) {
      const el = this.elementRef.nativeElement;

      if (el.focus) {
        el.focus();
        this.changeDetectorRef.detectChanges();
      } else {
        // istanbul ignore else
        if (isDevMode()) {
          throw Error(`TsAutofocusDirective must be used on an element that has a .focus() method.`);
        }
      }
    }
  }
}
