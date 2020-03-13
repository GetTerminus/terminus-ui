import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';


/**
 * The ink bar is used to display and animate the line underneath the current active tab label
 *
 * NOTE: Only used internally
 */
@Component({
  selector: 'ts-tab-ink-bar',
  template: ``,
  styleUrls: ['./ink-bar.component.scss'],
  host: { class: 'ts-ink-bar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsTabInkBar',
})
export class TsTabInkBarComponent {

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
  ) {}


  /**
   * Calculate the styles from the provided element in order to align the ink-bar to that element.
   * Shows the ink bar if previously set as hidden.
   *
   * @param element
   */
  public alignToElement(element: HTMLElement): void {
    if (typeof requestAnimationFrame === 'undefined') {
      this.setStyles(element);
    } else {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => this.setStyles(element));
      });
    }
  }

  /**
   * Sets the proper styles to the ink bar element.
   *
   * @param element - The element to align the ink bar to
   */
  private setStyles(element: HTMLElement): void {
    const positions = this.determineInkBarPositions(element);
    const inkBar: HTMLElement = this.elementRef.nativeElement;
    inkBar.style.left = positions.left;
    inkBar.style.width = positions.width;
  }

  /**
   * Return an object representing the correct ink bar positions
   *
   * @param element - The element to align the ink bar to
   * @returns The object of positions
   */
  private determineInkBarPositions(element: HTMLElement): {left: string; width: string} {
    return {
      left: element ? `${(element.offsetLeft || 0)}px` : '0',
      width: element ? `${(element.offsetWidth || 0)}px` : '0',
    };
  }
}
