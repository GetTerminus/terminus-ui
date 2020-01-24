import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  CDK_TABLE_TEMPLATE,
  CdkTable,
} from '@angular/cdk/table';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  IterableDiffers,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { TsWindowService } from '@terminus/ngx-tools/browser';
import {
  debounce,
  untilComponentDestroyed,
} from '@terminus/ngx-tools/utilities';
import {
  defer,
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import {
  pluck,
  switchMap,
  take,
} from 'rxjs/operators';

import {
  TsHeaderCellDirective,
  TsHeaderCellResizeEvent,
} from './cell';
import { TsRowComponent } from './row';


/**
 * The definition for a single column
 */
export interface TsColumn {
  // The column name
  name: string;
  // The desired width in pixels as a integer (eg '200')
  width: number;
  // Allow any other data properties the consumer may need
  // tslint:disable-next-line no-any
  [key: string]: any;
}

/**
 * The possible table density settings
 */
export type TsTableDensity
  = 'comfy'
  | 'compact'
;

/**
 * The default debounce delay for column sizing update calls
 */
const COLUMN_DEBOUNCE_DELAY = 100;
const VIEWPORT_DEBOUNCE = 500;

/**
 * The payload for a columns change event
 */
export class TsTableColumnsChangeEvent {
  constructor(
    // The table instance that originated the event
    public table: TsTableComponent,
    // The updated array of columns
    public columns: TsColumn[],
  ) {}
}

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * The primary data table implementation
 *
 * @example
 *  <ts-table
 *    [columns]="myColumns"
 *    [dataSource]="dataSource"
 *    [multiTemplateDataRows]="false"
 *    [trackBy]="myTrackByFn"
 *    (columnsChange)="columnsWereUpdated($event)
 *    #myTable="tsTable"
 *  >
 *    <ng-container tsColumnDef="title">
 *      <ts-header-cell *tsHeaderCellDef>
 *        Title
 *      </ts-header-cell>
 *      <ts-cell *tsCellDef="let item">
 *        {{ item.title }}
 *      </ts-cell>
 *    </ng-container>
 *
 *    <ng-container tsColumnDef="id">
 *      <ts-header-cell *tsHeaderCellDef>
 *        ID
 *      </ts-header-cell>
 *      <ts-cell *tsCellDef="let item">
 *        {{ item.id }},
 *      </ts-cell>
 *    </ng-container>
 *
 *    <ts-header-row *tsHeaderRowDef="myTable.columnNames"></ts-header-row>
 *    <ts-row *tsRowDef="let row; columns: myTable.columnNames;"></ts-row>
 *  </ts-table>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/table</example-url>
 */
@Component({
  selector: 'ts-table, table[ts-table]',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['./table.component.scss'],
  host: {
    'class': 'ts-table',
    '[class.ts-table--comfy]': 'density === "comfy"',
    '[class.ts-table--compact]': 'density === "compact"',
    '[id]': 'id',
  },
  providers: [{
    provide: CdkTable,
    useExisting: TsTableComponent,
  }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'tsTable',
})
// tslint:disable-next-line no-any
export class TsTableComponent<T = any> extends CdkTable<T> implements
  OnInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  OnDestroy {

  /**
   * Combined stream of all of the columns resized events
   */
  public readonly columnResizeChanges$: Observable<TsHeaderCellDirective> = defer(() => {
    if (this.headerCells && this.headerCells.length) {
      return merge<TsHeaderCellResizeEvent>(...this.headerCells.map(cell => cell.resized)).pipe(
        pluck('instance'),
        untilComponentDestroyed(this),
      );
    }

    // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
    // In that case, return a stream that we'll replace with the real one once everything is in place.
    return this.ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.columnResizeChanges$));
  });

  /**
   * Create a debounced function to update CDK sticky styles
   */
  public debouncedStickyColumnUpdate = debounce(this.updateStickyColumnStyles, COLUMN_DEBOUNCE_DELAY);

  /**
   * Store the header cell subscription
   */
  private headerCellSubscription: Subscription;

  /**
   * Store a mutable array of internal column definitions
   */
  private columnsInternal: TsColumn[] = [];

  /**
   * Override the sticky CSS class set by the `CdkTable`
   */
  protected stickyCssClass = 'ts-table--sticky';

  /**
   * Store the stream of viewport changes
   */
  private viewportChange$: Observable<Event>;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-table-${nextUniqueId++}`;

  /**
   * Store a reference to the window object
   */
  private window: Window;

  /**
   * Return a simple array of column names
   *
   * Used by {@link TsHeaderRowDefDirective} and {@link TsRowDefDirective}.
   */
  public get columnNames(): string[] {
    return this.columns.map(c => c.name);
  }

  /**
   * Build array of columns to emit out to the consumer
   */
  public get columnsToSendToConsumer(): TsColumn[] {
    const internalColumns = this.getFreshColumnsCopy(this.columnsInternal);
    const userColumns = this.getFreshColumnsCopy();
    const lastIndex = internalColumns.length - 1;
    // Reset the last column width to the consumer defined width
    internalColumns[lastIndex].width = userColumns[lastIndex].width;
    return internalColumns;
  }

  /**
   * Return the width of the element wrapping the table
   */
  public get containerWidth(): number {
    return this.parentElement.offsetWidth;
  }

  /**
   * Determine if the container around the table has overflow (ie the table is scrollable)
   */
  public get hasOverflowX(): boolean {
    return this.parentElement.scrollWidth > this.tableWidth;
  }

  /**
   * Return the parent HTMLElement
   */
  private get parentElement(): HTMLElement {
    return (this.elementRef.nativeElement as HTMLElement).parentNode as HTMLElement;
  }

  /**
   * Determine the remaining space in the table after the columns take up their needed width
   */
  private get remainingTableSpace(): number {
    // NOTE: The outer borders take up 2px so we subtract them here to avoid a 2px overflow.
    const borderOffset = 2;
    const remainingWidth = (this.containerWidth - this.totalWidthOfColumns) - borderOffset;
    return (remainingWidth > 0) ? remainingWidth : 0;
  }

  /**
   * Return the width of the table
   */
  private get tableWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  /**
   * Return the total width of all visible columns
   */
  private get totalWidthOfColumns(): number {
    const currentWidths = this.headerCells.map(hc => hc.cellWidth);
    const userWidths = this.columns.map(v => v.width);
    const columnsToReduce = currentWidths.slice();
    // NOTE: Since the last column is never resized by the user, we should use the original size for the last column and the current
    // size for all other columns.
    const lastIndex = userWidths.length - 1;
    columnsToReduce[lastIndex] = this.columns[lastIndex].width;
    return columnsToReduce.reduce((a, b) => a + b, 0);
  }

  /**
   * Access header cells
   */
  @ContentChildren(TsHeaderCellDirective, { descendants: true })
  public headerCells: QueryList<TsHeaderCellDirective>;

  /**
   * Access child rows
   */
  @ContentChildren(TsRowComponent)
  public rows: QueryList<TsRowComponent>;

  /**
   * Define the array of columns
   */
  @Input()
  public set columns(value: ReadonlyArray<TsColumn>) {
    // istanbul ignore else
    if (value && (value.length > 0)) {
      this._columns = this.getFreshColumnsCopy(value);
      this.columnsInternal = this.getFreshColumnsCopy(value);
    }
  }
  public get columns(): ReadonlyArray<TsColumn> {
    return this._columns;
  }
  private _columns: TsColumn[] = [];

  /**
   * Define the density of the cells
   */
  @Input()
  public density: TsTableDensity = 'comfy';

  /**
   * Define a custom ID
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  private _id: string = this.uid;

  /**
   * Emit when a column is resized
   *
   * NOTE: This output is not debounce or throttled and may be called repeatedly
   */
  @Output()
  public readonly columnsChange = new EventEmitter<TsTableColumnsChangeEvent>();


  constructor(
    // tslint:disable-next-line no-attribute-decorator
    @Attribute('role') role: string,
    // tslint:disable-next-line no-any
    @Inject(DOCUMENT) public document: any,
    private platform: Platform,
    protected readonly differs: IterableDiffers,
    protected readonly changeDetectorRef: ChangeDetectorRef,
    @Optional() protected readonly dir: Directionality,
    public readonly elementRef: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private windowService: TsWindowService,
    private viewportRuler: ViewportRuler,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
    this.window = windowService.nativeWindow;
  }


  /**
   * Subscribe to viewport changes
   */
  public ngOnInit(): void {
    super.ngOnInit();

    this.viewportChange$ = this.viewportRuler.change(VIEWPORT_DEBOUNCE).pipe(untilComponentDestroyed(this));
    this.viewportChange$.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.window.requestAnimationFrame(() => {
        this.updateInternalColumns(this.getFreshColumnsCopy());
        this.columnsChange.emit(new TsTableColumnsChangeEvent(this, this.columnsToSendToConsumer));
      });
    });
  }

  /**
   * Set up header cell changes subscription
   */
  public ngAfterViewChecked(): void {
    this.subscribeToHeaderCellChanges();
  }

  /**
   * Subscribe to column resize events
   */
  public ngAfterContentInit(): void {
    this.columnResizeChanges$
      .subscribe(v => {
        this.updateLastColumnWidth();
        // Update the recorded width for the changed column
        this.columnsInternal.find(column => column.name === v.columnDef.name).width = v.cellWidth;
        this.columnsChange.emit(new TsTableColumnsChangeEvent(this, this.columnsToSendToConsumer));
      });
  }

  /**
   * NOTE: Must be present for `untilComponentDestroyed`
   */
  public ngOnDestroy(): void {
    this.headerCellSubscription.unsubscribe();
  }

  /**
   * Adjusts the last column of the array to fill any remaining space inside the table
   *
   * NOTE: Due to issues during testing, we have not made this function static.
   *
   * @param columns - The array of columns to adjust
   * @param remainingWidth - The remaining table width to be added to the last column
   * @return The adjusted array of columns
   */
  private addRemainingSpaceToLastColumn(columns: TsColumn[], remainingWidth: number): TsColumn[] {
    const lastColumn = columns[columns.length - 1];
    lastColumn.width = lastColumn.width + remainingWidth;
    return columns;
  }

  /**
   * Return a fresh clone of the passed in array of columns
   *
   * @param columns - The array of columns to clone
   * @return The array of fresh columns
   */
  private getFreshColumnsCopy(columns: ReadonlyArray<TsColumn> = this.columns): TsColumn[] {
    return columns.slice().map(c => ({ ...c }));
  }

  /**
   * Set the column widths for all columns passed in
   *
   * @param columns - The array of columns
   */
  private setAllColumnsToDefinedWidths(columns: TsColumn[]): void {
    for (const column of columns) {
      this.setColumnWidthStyle(column.name, column.width, false);
    }
    this.updateStickyCellsIfNeeded();
  }

  /**
   * Set the width for a specific column
   *
   * @param columnName - The name of the column that needs it's width updated
   * @param width - The width to set
   * @param updateStickCells - Whether the sticky cells should be updated
   */
  private setColumnWidthStyle(columnName: string, width: number, updateStickCells = true): void {
    // eslint-disable-next-line no-underscore-dangle
    const columnDirective = this.headerCells.find(cell => cell.columnDef._name === columnName);
    // istanbul ignore else
    if (columnDirective) {
      columnDirective.setColumnWidth(width);

      // istanbul ignore else
      if (updateStickCells) {
        this.updateStickyCellsIfNeeded();
      }
    }
  }

  /**
   * Set up subscription to header cell changes
   */
  private subscribeToHeaderCellChanges(): void {
    if (this.headerCellSubscription) {
      this.headerCellSubscription.unsubscribe();
    }

    this.headerCellSubscription = this.headerCells.changes
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        // 1. Set user widths
        this.setAllColumnsToDefinedWidths(this.getFreshColumnsCopy());
        // 2. Add space to last column as needed
        this.updateLastColumnWidth();
        // 3. Set all widths to internal columns
        this.setAllColumnsToDefinedWidths(this.getFreshColumnsCopy(this.columnsInternal));
        // 4. Alert the consumer
        this.columnsChange.emit(new TsTableColumnsChangeEvent(this, this.columnsToSendToConsumer));

        // Inject the header cell resize element in every cell except the last (last column is not resizable)
        this.headerCells.forEach((headerCellDirective, i) => {
          if (i !== this.headerCells.length - 1) {
            headerCellDirective.injectResizeElement();
          }
        });
      });
  }

  /**
   * Update the internal columns array and set widths
   *
   * @param columns - The array of columns to update
   */
  private updateInternalColumns(columns: TsColumn[]): void {
    // If there is space left over, add all remaining space to the last column
    if (!this.hasOverflowX) {
      columns = this.addRemainingSpaceToLastColumn(columns, this.remainingTableSpace);
    }
    this.columnsInternal = columns;
    this.setAllColumnsToDefinedWidths(this.columnsInternal);
  }

  /**
   * Update the last column's width and update the internal columns
   */
  private updateLastColumnWidth(): void {
    // 1. Determine last column width
    const columns = this.getFreshColumnsCopy();
    const lastIndex = columns.length - 1;
    const lastColumn = columns[lastIndex];
    let newWidth = lastColumn.width;
    if (!this.hasOverflowX) {
      newWidth = lastColumn.width + this.remainingTableSpace;
    }
    // 2. Set the width
    this.setColumnWidthStyle(lastColumn.name, newWidth);
    // 3. Update internal columns
    this.columnsInternal[lastIndex].width = newWidth;
  }

  /**
   * Trigger an update on sticky cells if they exist
   */
  private updateStickyCellsIfNeeded(): void {
    // NOTE: To lessen the thrashing, only call the sticky column updater if there are defined sticky columns
    const stickyCells = this.headerCells.toArray().filter(c => c.columnDef.sticky || c.columnDef.stickyEnd);
    // istanbul ignore else
    if (stickyCells.length) {
      this.debouncedStickyColumnUpdate();
    }
  }

}
