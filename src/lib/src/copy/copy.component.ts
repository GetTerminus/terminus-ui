import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Inject,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { hasIn } from 'lodash';

const _ = {
  hasIn: hasIn,
};

import { WindowService } from './../utilities/window.service';


/**
 * This is the TsCopyComponent UI Component
 * TODO: Add a tooltip to the copy button telling users it will copy to clipboard
 * TODO: Add a snackbar or alert to give the user feedback on copy success & failure
 *
 * @example
 * <ts-copy
 *              showIcon="true"
 *              disableInitialSelection="true"
 * >My text to copy!</ts-copy>
 */
@Component({
  selector: 'ts-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
})
export class TsCopyComponent {
  /**
   * Internal flag to track if the contents have been selected
   */
  public hasSelected: boolean = false;

  /**
   * Define the copy icon
   */
  private icon: string = 'content_copy';

  /**
   * Define the color of the md-ripple
   */
  public rippleColor: string = '#1a237e';

  /**
   * Store a reference to the window object
   */
  private window: any = this.windowService.nativeWindow;

  /**
   * Define access to the wrapper around the content to be copied
   */
  @ViewChild('content') content: ElementRef;

  /**
   * Define if the initial click should select the contents
   */
  @Input() disableInitialSelection: boolean = false;

  /**
   * Define if the copy to clipboard functionality is enabled
   */
  @Input() enableQuickCopy: boolean = false;


  constructor(
    @Inject(DOCUMENT) private document: any,
    private windowService: WindowService,
  ) {}


  /**
   * Return the inner text content
   *
   * @return {String} textContent The text content of the inner <ng-content>
   */
  get textContent(): string {
    if (_.hasIn(this.content, 'nativeElement.innerText')) {
      return this.content.nativeElement.innerText;
    } else {
      return '';
    }
  }


  /**
   * Select the text content of the passed in element
   *
   * @param {Element} element The element whose text should be selected
   * @param {Boolean} hasSelected The flag defining if the selection has already been made
   * @param {Boolean} disabled The flag defining if the selection functionality should be disabled
   */
  selectText(element: ElementRef, hasSelected: boolean, disabled: boolean): void {
    // If this functionality is disabled OR the text has already been selected,
    // do not intercept any more clicks until the focus is reset
    if (disabled || hasSelected) {
      return;
    }

    let range;
    let selection;

    // Select text using document.body or window.getSelection
    if (this.document.body.createTextRange) {
      range = this.document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (this.window.getSelection) {
      selection = this.window.getSelection();
      range = this.document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    this.hasSelected = true;
  }


  /**
   * Reset the text selection
   * NOTE: The div must have a `tabindex` set or no blur event will be fired
   */
  resetSelection(): void {
    this.hasSelected = false;
  }


  /**
   * Copy text to the user's clipboard
   *
   * @param {String} text The text to copy
   */
  copyToClipboard(text: string): void {
    // Create a hidden textarea to seed with text content
    const target = this.document.createElement('textarea');
    target.style.position = 'absolute';
    target.style.left = '101%';
    target.style.top = '0';
    target.textContent = text;

    // Add the textarea, focus and select the text
    this.document.body.appendChild(target);
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // Copy the selection or fall back to prompt
    try {
      this.document.execCommand('copy');
      target.remove();
    } catch (error) {
      // Fall back to the native alert
      window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
    }
  }

}
