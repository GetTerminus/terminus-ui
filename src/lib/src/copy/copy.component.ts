import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
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
export class TsCopyComponent implements OnInit {
  /**
   * Store a reference to the clipboard
   */
  private clipboard: any;

  /**
   * Internal flag to track if the contents have been selected
   */
  private hasSelected: boolean = false;

  /**
   * Define the copy icon
   */
  private icon: string = 'content_copy';

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
   * Define if the copy icon should be included
   */
  @Input() showIcon: boolean = false;


  constructor(
    @Inject(DOCUMENT) private document: any,
    private windowService: WindowService,
  ) {}


  ngOnInit(): void {
    // init clipboard functionality here
  }


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

}
