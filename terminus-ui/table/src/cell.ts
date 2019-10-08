// NOTE: In this case, we want an actual selector (so content can be nested inside) for our directive. So we are disabling the
// `directive-selector` rule
// tslint:disable: directive-selector
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  isDevMode,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools/browser';
import { TsUILibraryError } from '@terminus/ui/utilities';

import {
  TsColumnDefDirective,
  tsTableColumnAlignmentTypesArray,
} from './column';


/**
 * Cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[tsCellDef]',
  providers: [{
    provide: CdkCellDef,
    useExisting: TsCellDefDirective,
  }],
})
export class TsCellDefDirective extends CdkCellDef {}


/**
 * Header cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[tsHeaderCellDef]',
  providers: [{
    provide: CdkHeaderCellDef,
    useExisting: TsHeaderCellDefDirective,
  }],
})
export class TsHeaderCellDefDirective extends CdkHeaderCellDef {}


/**
 * Define the event object for header cell resizes
 */
export class TsHeaderCellResizeEvent {
  constructor(
    // The header cell instance that originated the event
    public instance: TsHeaderCellDirective,
    // The new width
    public width: string,
  ) {}
}

/**
 * Define the event object for a header cell resizer hover
 */
export class TsHeaderCellResizeHoverEvent {
  constructor(
    // The header cell instance that originated the event
    public instance: TsHeaderCellDirective,
    // If the cell is currently hovered
    public isHovered: boolean,
  ) {}
}


/**
 * Header cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-header-cell',
  host: {
    class: 'ts-header-cell',
    role: 'columnheader',
  },
  exportAs: 'tsHeaderCell',
})
export class TsHeaderCellDirective extends CdkHeaderCell implements AfterViewInit, OnDestroy {
  /**
   * Store reference to the document
   */
  private document: Document;

  /**
   * Store reference to the window
   */
  private window: Window;

  /**
   * Store references to event listener removal functions
   */
  private resizeListenerRemover: Function;
  private clickListenerRemover: Function;
  private mouseEnterListenerRemover: Function;
  private mouseLeaveListenerRemover: Function;

  /**
   * Store the starting offset when a resize event begins
   */
  public startOffsetX = 0;

  /**
   * Store the starting width of a cell before resizing
   */
  public startWidth = 0;

  /**
   * Create bound methods to preserve 'this' context
   */
  public readonly boundDragging = e => this.triggerDragging(e);
  public readonly boundDragEnd = e => this.triggerDragEnd(e);

  /**
   * Event emitted when the cell is hovered
   */
  @Output()
  public readonly hovered = new EventEmitter<TsHeaderCellResizeHoverEvent>();

  /**
   * Event emitted when the cell is resized
   */
  @Output()
  public readonly resized = new EventEmitter<TsHeaderCellResizeEvent>();


  constructor(
    public columnDef: CdkColumnDef,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    private documentService: TsDocumentService,
    private windowService: TsWindowService,
  ) {
    super(columnDef, elementRef);
    this.document = documentService.document;
    this.window = windowService.nativeWindow;
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // eslint-disable-next-line no-underscore-dangle
    if (columnDef._stickyEnd) {
      elementRef.nativeElement.classList.add(`ts-table--sticky-end`);
    }
  }


  /**
   * Inject the cell resizer
   */
  public ngAfterViewInit(): void {
    this.injectResizeElement();
  }


  /**
   * Remove all event listeners when destroyed
   */
  public ngOnDestroy(): void {
    this.removeAllEventListeners();
  }


  /**
   * Remove any existing event listeners
   */
  private removeAllEventListeners(): void {
    if (this.resizeListenerRemover) {
      this.resizeListenerRemover();
    }
    if (this.clickListenerRemover) {
      this.clickListenerRemover();
    }
    if (this.mouseEnterListenerRemover) {
      this.mouseEnterListenerRemover();
    }
    if (this.mouseLeaveListenerRemover) {
      this.mouseLeaveListenerRemover();
    }
  }


  /**
   * Inject the resize 'grabber' element
   */
  private injectResizeElement(): void {
    const resizeElement = this.renderer.createElement('span');
    resizeElement.classList.add('ts-header-cell__resizer');
    resizeElement.classList.add(`ts-header-cell__resizer--${this.columnDef.cssClassFriendlyName}`);
    resizeElement.title = 'Drag to resize column.';
    this.renderer.appendChild(this.elementRef.nativeElement, resizeElement);

    // Remove any existing event listeners
    this.removeAllEventListeners();
    this.resizeListenerRemover = this.renderer.listen(resizeElement, 'mousedown', e => this.onResizeColumn(e));

    // Stop click events so that sorting is not triggered
    this.clickListenerRemover = this.renderer.listen(resizeElement, 'click', e => e.stopPropagation());

    // Listen to mouse enter/leave and emit events
    this.mouseEnterListenerRemover =
      this.renderer.listen(resizeElement, 'mouseenter', () => this.hovered.emit(new TsHeaderCellResizeHoverEvent(this, true)));
    this.mouseLeaveListenerRemover =
      this.renderer.listen(resizeElement, 'mouseleave', () => this.hovered.emit(new TsHeaderCellResizeHoverEvent(this, false)));
  }


  /**
   * Save initial width and offset, bind to more events
   *
   * @param event - The mouse event
   */
  private onResizeColumn(event: MouseEvent): void {
    this.startOffsetX = event.clientX;
    this.document.addEventListener('mousemove', this.boundDragging);
    this.document.addEventListener('mouseup', this.boundDragEnd);
    const style = this.window.getComputedStyle(this.elementRef.nativeElement);
    // NOTE: Else branch should never be reachable in the browser
    this.startWidth = style.width ? parseInt(style.width, 10) /* istanbul ignore next */ : 0;
  }


  /**
   * Determine the new width as the cell is resized and emit the width
   *
   * @param event - The mouse event
   */
  private triggerDragging(event: MouseEvent): void {
    const diff = event.clientX - this.startOffsetX;
    const newWidth = `${this.startWidth + diff}px`;
    this.resized.emit(new TsHeaderCellResizeEvent(this, newWidth));
  }


  /**
   * Reset resize items
   *
   * @param event - The mouse event
   */
  private triggerDragEnd(event: MouseEvent): void {
    this.startOffsetX = 0;
    this.document.removeEventListener('mousemove', this.boundDragging);
    this.document.removeEventListener('mouseup', this.boundDragEnd);
    this.startWidth = 0;
  }

}


/**
 * Cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-cell',
  host: {
    class: 'ts-cell',
    role: 'gridcell',
  },
})
export class TsCellDirective extends CdkCell {
  /**
   * Store a reference to the column
   */
  public column: TsColumnDefDirective;


  constructor(
    public elementRef: ElementRef,
    private columnDef: CdkColumnDef,
    private renderer: Renderer2,
  ) {
    super(columnDef, elementRef);
    // NOTE: Changing the type in the constructor from `CdkColumnDef` to `TsColumnDefDirective` doesn't seem to play well with the CDK.
    // Coercing the type here is a hack, but allows us to reference properties that do not exist on the underlying `CdkColumnDef`.
    this.column = columnDef as TsColumnDefDirective;

    // Set a custom class for each column
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // Set the no-wrap class if needed
    if (this.column.noWrap) {
      elementRef.nativeElement.classList.add(`ts-column-no-wrap`);
    }

    TsCellDirective.setColumnAlignment(this.column, renderer, elementRef);

    // eslint-disable-next-line no-underscore-dangle
    if (columnDef._stickyEnd) {
      elementRef.nativeElement.classList.add(`ts-table--sticky-end`);
    }

  }


  /**
   * Set the column alignment styles
   *
   * @param column - The column definition
   * @param renderer - The Renderer2
   * @param elementRef - The element ref to add the class to
   */
  private static setColumnAlignment(column: TsColumnDefDirective, renderer: Renderer2, elementRef: ElementRef): void {
    if (column.alignment) {
      // Verify the alignment value is allowed
      if (tsTableColumnAlignmentTypesArray.indexOf(column.alignment) < 0 && isDevMode()) {
        throw new TsUILibraryError(`TsCellDirective: "${column.alignment}" is not an allowed alignment.`
          + `See "TsTableColumnAlignment" type for available options.`);
      }

      // Set inline style for text-align
      renderer.setStyle(elementRef.nativeElement, 'textAlign', column.alignment);
    }
  }

}
