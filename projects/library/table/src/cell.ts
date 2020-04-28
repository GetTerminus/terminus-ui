import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
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
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
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


/**
 * The minimum width for columns
 */
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
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ts-header-cell, th[ts-header-cell]',
  host: {
    'class': 'ts-header-cell',
    'role': 'columnheader',
    '[id]': 'uid',
  },
  exportAs: 'tsHeaderCell',
})
export class TsHeaderCellDirective extends CdkHeaderCell implements OnInit, OnDestroy {
  /**
   * Store a reference to the column
   */
  public column!: TsColumnDefDirective;

  /**
   * Stream used inside takeUntil pipes
   */
  private killStream$ = new Subject<void>();

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
    private ngZone: NgZone,
  ) {
    super(columnDef, elementRef);
  }

  /**
   * Initial setup
   */
  public ngOnInit(): void {
    this.column = this.columnDef as TsColumnDefDirective;
    this.elementRef.nativeElement.classList.add(`ts-column-${this.column.cssClassFriendlyName}`);

    // eslint-disable-next-line no-underscore-dangle
    if (this.column._stickyEnd) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky-end`);
    }

    if (this.column.sticky) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky`);
    }

    setColumnAlignment(this.column, this.renderer, this.elementRef);
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
      // TODO: Refactor deprecation
      // eslint-disable-next-line deprecation/deprecation
      fromEvent<MouseEvent>(resizeElement, 'mousedown')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(e => this.onResizeColumn(e));

      // TODO: Refactor deprecation
      // eslint-disable-next-line deprecation/deprecation
      fromEvent<MouseEvent>(resizeElement, 'click')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(e => e.stopPropagation());

      // TODO: Refactor deprecation
      // eslint-disable-next-line deprecation/deprecation
      fromEvent<MouseEvent>(resizeElement, 'mouseenter')
        .pipe(untilComponentDestroyed<MouseEvent>(this))
        .subscribe(() => this.syncHoverClass(true));

      // TODO: Refactor deprecation
      // eslint-disable-next-line deprecation/deprecation
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
   * @returns The final column width
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

    // TODO: Refactor deprecation
    // eslint-disable-next-line deprecation/deprecation
    fromEvent<MouseEvent>(this.documentService.document, 'mousemove')
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

    // TODO: Refactor deprecation
    // eslint-disable-next-line deprecation/deprecation
    fromEvent<MouseEvent>(this.documentService.document, 'mouseup')
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
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ts-cell, td[ts-cell]',
  host: {
    class: 'ts-cell',
    role: 'gridcell',
  },
})
export class TsCellDirective extends CdkCell implements OnInit {
  /**
   * Store a reference to the column
   */
  public column!: TsColumnDefDirective;

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
  }

  /**
   * Initial setup
   */
  public ngOnInit(): void {
    // HACK: Changing the type in the constructor from `CdkColumnDef` to `TsColumnDefDirective` doesn't seem to play well with the CDK.
    // Coercing the type here is a hack, but allows us to reference properties that do not exist on the underlying `CdkColumnDef`.
    this.column = this.columnDef as TsColumnDefDirective;

    // Set a custom class for each column
    this.elementRef.nativeElement.classList.add(`ts-column-${this.column.cssClassFriendlyName}`);

    setColumnAlignment(this.column, this.renderer, this.elementRef);

    // eslint-disable-next-line no-underscore-dangle
    if (this.column._stickyEnd) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky-end`);
    }

    if (this.column.sticky) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky`);
    }
  }
}


/**
 * Footer cell definition for the mat-table.
 *
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[tsFooterCellDef]',
  providers: [{
    provide: CdkFooterCellDef,
    useExisting: TsFooterCellDefDirective,
  }],
})
export class TsFooterCellDefDirective extends CdkFooterCellDef {}

/**
 * Footer cell template container that adds the right classes and role.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ts-footer-cell, td[ts-footer-cell]',
  host: {
    class: 'ts-footer-cell',
    role: 'gridcell',
  },
})
export class TsFooterCellDirective extends CdkFooterCell implements OnInit {
  /**
   * Store a reference to the column
   */
  public column!: TsColumnDefDirective;

  constructor(
    public columnDef: CdkColumnDef,
    public elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    super(columnDef, elementRef);
  }

  /**
   * Initial setup
   */
  public ngOnInit(): void {
    // HACK: Changing the type in the constructor from `CdkColumnDef` to `TsColumnDefDirective` doesn't seem to play well with the CDK.
    // Coercing the type here is a hack, but allows us to reference properties that do not exist on the underlying `CdkColumnDef`.
    this.column = this.columnDef as TsColumnDefDirective;

    // Set a custom class for each column
    this.elementRef.nativeElement.classList.add(`ts-column-${this.column.cssClassFriendlyName}`);

    setColumnAlignment(this.column, this.renderer, this.elementRef);

    // eslint-disable-next-line no-underscore-dangle
    if (this.column._stickyEnd) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky-end`);
    }

    if (this.column.sticky) {
      this.elementRef.nativeElement.classList.add(`ts-table__column--sticky`);
    }
  }
}
