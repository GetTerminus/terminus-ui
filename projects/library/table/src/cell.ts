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
  Directive,
  ElementRef,
  EventEmitter,
  isDevMode,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools/browser';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { TsUILibraryError } from '@terminus/ui/utilities';
import {
  fromEvent,
  Subject,
} from 'rxjs';
import {
  take,
  takeUntil,
} from 'rxjs/operators';

import {
  TsColumnDefDirective,
  tsTableColumnAlignmentTypesArray,
} from './column';


export const TS_TABLE_MIN_COLUMN_WIDTH = 70;

// Unique ID for each instance
let cellNextUniqueId = 0;
let headerNextUniqueId = 0;

/**
 * Set the column alignment styles
 *
 * @param column - The column definition
 * @param renderer - The Renderer2
 * @param elementRef - The element ref to add the class to
 */
export function setColumnAlignment(column: TsColumnDefDirective, renderer: Renderer2, elementRef: ElementRef): void {
  if (column.alignment) {
    // Verify the alignment value is allowed
    if (tsTableColumnAlignmentTypesArray.indexOf(column.alignment) < 0 && isDevMode()) {
      throw new TsUILibraryError(`TsCellDirective: "${column.alignment}" is not an allowed alignment.`
        + `See "TsTableColumnAlignment" type for available options.`);
    }

    renderer.addClass(elementRef.nativeElement, `ts-cell--align-${column.alignment}`);
  }
}


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
 * Define the event object for header cell resize events
 */
export class TsHeaderCellResizeEvent {
  constructor(
    // The header cell instance that originated the event
    public instance: TsHeaderCellDirective,
    // The new width
    public width: number,
  ) {}
}


/**
 * Header cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-header-cell, th[ts-header-cell]',
  host: {
    'class': 'ts-header-cell',
    'role': 'columnheader',
    '[id]': 'uid',
  },
  exportAs: 'tsHeaderCell',
})
export class TsHeaderCellDirective extends CdkHeaderCell implements OnDestroy {
  /**
   * Store a reference to the column
   */
  public column: TsColumnDefDirective;

  /**
   * Store reference to the document
   */
  private document: Document;

  /**
   * Stream used inside takeUntil pipes
   */
  private killStream$ = new Subject<void>();

  /**
   * Stub in listener storage
   */
  private resizableMousemove: () => void;
  private resizableMouseup: () => void;

  /**
   * Define the class for the resizable element
   */
  private readonly resizerClass = 'ts-header-cell__resizer';

  /**
   * Store the starting offset when a resize event begins
   */
  public startOffsetX = 0;

  /**
   * Store the starting width of a cell before resizing
   */
  public startWidth = 0;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-table-header-cell-${headerNextUniqueId++}`;

  /**
   * Store the current cell width
   */
  public width = 'auto';

  /**
   * Store reference to the window
   */
  private window: Window;

  /**
   * Return the current set width
   */
  public get cellWidth(): number {
    return parseInt(this.width, 0);
  }

  /**
   * Return a reference to the resize element
   */
  private get resizeElement(): HTMLElement | null {
    return this.elementRef.nativeElement.querySelector(`.${this.resizerClass}`);
  }

  /**
   * Event emitted when the cell is resized
   */
  @Output()
  public readonly resized = new EventEmitter<TsHeaderCellResizeEvent>();


  constructor(
    public columnDef: CdkColumnDef,
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private documentService: TsDocumentService,
    private windowService: TsWindowService,
    private ngZone: NgZone,
  ) {
    super(columnDef, elementRef);
    this.column = columnDef as TsColumnDefDirective;
    this.document = documentService.document;
    this.window = windowService.nativeWindow;
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // eslint-disable-next-line no-underscore-dangle
    if (columnDef._stickyEnd) {
      elementRef.nativeElement.classList.add(`ts-table__column--sticky-end`);
    }

    if (columnDef.sticky) {
      elementRef.nativeElement.classList.add(`ts-table__column--sticky`);
    }

    setColumnAlignment(this.column, renderer, elementRef);
  }

  /**
   * Remove all event listeners when destroyed
   */
  public ngOnDestroy(): void {
    this.killStream$.complete();
  }

  /**
   * Inject the resize 'grabber' element.
   *
   * Called by {@link TsTableComponent}
   */
  public injectResizeElement(): void {
    // If the element has been injected before, remove it
    if (this.resizeElement) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.resizeElement);
    }

    const resizeElement = this.renderer.createElement('span');
    resizeElement.classList.add(this.resizerClass);
    resizeElement.classList.add(`${this.resizerClass}--${this.columnDef.cssClassFriendlyName}`);
    resizeElement.title = 'Drag to resize column.';
    this.renderer.appendChild(this.elementRef.nativeElement, resizeElement);

    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(resizeElement, 'mousedown')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(e => this.onResizeColumn(e));

      fromEvent<MouseEvent>(resizeElement, 'click')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(e => e.stopPropagation());

      fromEvent<MouseEvent>(resizeElement, 'mouseenter')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(() => this.syncHoverClass(true));

      fromEvent<MouseEvent>(resizeElement, 'mouseleave')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(() => this.syncHoverClass(false));
    });
  }

  /**
   * Return the new width if above the minimum width
   *
   * @param start - The starting width
   * @param difference - The amount moved
   * @return The final column width
   */
  private static determineWidth(start: number, difference: number): number {
    const total = start + difference;
    return (total >= TS_TABLE_MIN_COLUMN_WIDTH) ? total : TS_TABLE_MIN_COLUMN_WIDTH;
  }

  /**
   * Save initial width and offset, bind to more events
   *
   * @param event - The mouse event
   */
  private onResizeColumn(event: MouseEvent): void {
    this.startOffsetX = event.clientX;
    this.startWidth = this.cellWidth;

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        untilComponentDestroyed(this),
        takeUntil(this.killStream$),
      ).subscribe(e => {
        const diff = e.clientX - this.startOffsetX;
        const newWidth = TsHeaderCellDirective.determineWidth(this.startWidth, diff);

        // istanbul ignore else
        if (newWidth) {
          this.setColumnWidth(newWidth);
        }
      });

    fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(
        untilComponentDestroyed(this),
        take(1),
      ).subscribe(() => {
        this.startOffsetX = 0;
        this.startWidth = 0;
        this.killStream$.next(void 0);
        this.resized.emit(new TsHeaderCellResizeEvent(this, this.elementRef.nativeElement.offsetWidth));
      });
  }

  /**
   * Set the column width style and save the width
   *
   * @param width - The width to set
   */
  public setColumnWidth(width: number): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${width}px`);
    this.width = `${width}px`;
  }

  /**
   * Sync the hovered class
   *
   * @param isHovered - Whether the resize element is currently hovered
   */
  private syncHoverClass(isHovered: boolean): void {
    isHovered
      ? this.renderer.addClass(this.elementRef.nativeElement, 'ts-cell--resizing')
      : this.renderer.removeClass(this.elementRef.nativeElement, 'ts-cell--resizing');
  }

}


/**
 * Cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-cell, td[ts-cell]',
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

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-table-cell-${cellNextUniqueId++}`;


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

    setColumnAlignment(this.column, renderer, elementRef);

    // eslint-disable-next-line no-underscore-dangle
    if (columnDef._stickyEnd) {
      elementRef.nativeElement.classList.add(`ts-table__column--sticky-end`);
    }

    if (columnDef.sticky) {
      elementRef.nativeElement.classList.add(`ts-table__column--sticky`);
    }
  }

}
