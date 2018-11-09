import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  TsWindowService,
  TsDocumentService,
} from '@terminus/ngx-tools';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';


/**
 * This is the TsCopyComponent UI Component
 *
 * #### QA CSS CLASSES
 * `qa-copy`: Placed on the div element which contains this component
 * `qa-copy-content`: Placed on a div element which contains the content which will be copied
 * `qa-copy-icon`: Placed on the icon which copies the content to the clipboard when clicked
 *
 * @example
 * <ts-copy
 *              disableInitialSelection="true"
 *              enableQuickCopy="true"
 *              theme="accent"
 * >My text to copy!</ts-copy>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
  host: {
    class: 'ts-copy',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCopy',
})
export class TsCopyComponent {
  /**
   * Store a reference to the document object
   */
  private document: Document = this.documentService.document;

  /**
   * Internal flag to track if the contents have been selected
   */
  public hasSelected = false;

  /**
   * Define the copy icon
   */
  public icon: string = 'content_copy';

  /**
   * Define the color of the material ripple
   */
  // FIXME: This color should be coming from a config
  public rippleColor: string = '#1a237e';

  /**
   * Store a reference to the window object
   */
  private window: Window = this.windowService.nativeWindow;

  /**
   * Define access to the wrapper around the content to be copied
   */
  @ViewChild('content')
  public content!: ElementRef;

  /**
   * Define if the initial click should select the contents
   */
  @Input()
  public set disableInitialSelection(value: boolean) {
    this._disableInitialSelection = coerceBooleanProperty(value);
  }
  public get disableInitialSelection(): boolean {
    return this._disableInitialSelection;
  }
  private _disableInitialSelection = false;

  /**
   * Define if the copy to clipboard functionality is enabled
   */
  @Input()
  public set enableQuickCopy(value: boolean) {
    this._enableQuickCopy = coerceBooleanProperty(value);
  }
  public get enableQuickCopy(): boolean {
    return this._enableQuickCopy;
  }
  private _enableQuickCopy = false;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';


  /**
   * Inject services
   */
  constructor(
    private documentService: TsDocumentService,
    private windowService: TsWindowService,
  ) {}


  /**
   * Return the inner text content
   *
   * @return The text content of the inner <ng-content>
   */
  public get textContent(): string {
    const hasInnerText =
      this.content && this.content.nativeElement && this.content.nativeElement.innerText;

    if (hasInnerText) {
      return this.content.nativeElement.innerText;
    } else {
      return '';
    }
  }


  /**
   * Select the text content of the passed in element
   *
   * @param element - The element whose text should be selected
   * @param hasSelected - The flag defining if the selection has already been made
   * @param disabled - The flag defining if the selection functionality should be disabled
   * @return The value representing if the copy was successful
   */
  public selectText(element: ElementRef, hasSelected: boolean, disabled: boolean): boolean {
    // If this functionality is disabled OR the text has already been selected,
    // do not intercept any more clicks until the focus is reset
    if (disabled || hasSelected) {
      return false;
    }

    const selection = this.window.getSelection();
    // NOTE: Adding the type of 'Range' to this causes an error with `range.selectNodeContents`
    // `Argument of type ElementRef is not assignable to type 'Node'`
    const range = this.document.createRange();

    range.selectNodeContents(element as any);
    selection.removeAllRanges();
    selection.addRange(range);

    this.hasSelected = true;
    return true;
  }


  /**
   * Reset the text selection
   * NOTE: The containing div must have a `tabindex` set or no blur event will be fired
   */
  public resetSelection(): void {
    this.hasSelected = false;
  }


  /**
   * Copy text to the user's clipboard
   *
   * @param text - The text to copy
   */
  public copyToClipboard(text: string): void {
    // Create a hidden textarea to seed with text content
    const target = this.document.createElement('textarea');
    target.className = 'targetElement';
    target.style.position = 'absolute';
    target.style.left = '101%';
    target.style.top = '0';
    target.style.width = '1px';
    target.style.height = '1px';
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
      this.window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
    }
  }

}
