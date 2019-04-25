import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  isDevMode,
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
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/autofocus</example-url>
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
  public set tsAutofocus(value: string | boolean) {
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
      } else if (isDevMode()) {
        throw Error(`TsAutofocusDirective must be used on an element that has a .focus() method.`);
      }
    }
  }
}
