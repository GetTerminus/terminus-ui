import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import {
  CDK_TABLE_TEMPLATE,
  CdkTable,
} from '@angular/cdk/table';
import { DOCUMENT } from '@angular/common';
import {
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
import { isUndefined } from '@terminus/ngx-tools/type-guards';
import { debounce } from '@terminus/ngx-tools/utilities';
import {
  defer,
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import {
  switchMap,
  take,
} from 'rxjs/operators';

import {
  TsHeaderCellDirective,
  TsHeaderCellResizeEvent,
  TsHeaderCellResizeHoverEvent,
} from './cell';
import { TsRowComponent } from './row';


/**
 * The definition for a single column
 */
export interface TsColumn {
  // The column name
  name: string;
  // The desired width as a string (eg '200px', '14rem' etc)
  width?: string;
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
 * Default column width.
 *
 * NOTE: Columns will only expand until all cell content is visible for the entire column. So we are defaulting to a very large number and
 * rely on the consumer to constrain width where needed.
 */
const DEFAULT_COLUMN_WIDTH = '1000px';

/**
 * The default debounce delay for column sizing update calls
 */
const COLUMN_DEBOUNCE_DELAY = 100;

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


/**
 * The primary data table implementation
 *
 * @example
 *  <ts-table
 *    [dataSource]="dataSource"
 *    [columns]="myColumns"
 *    [trackBy]="myTrackByFn"
 *    [multiTemplateDataRows]="false"
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
export class TsTableComponent<T = any> extends CdkTable<T> implements OnInit, AfterViewChecked, OnDestroy {

  /**
   * Create a debounced function to update CDK sticky styles
   */
  public debouncedStickyColumnUpdate = debounce(this.updateStickyColumnStyles, COLUMN_DEBOUNCE_DELAY);

  /**
   * Store subscription references for header cell functionality
   */
  private headerCellResize$: Subscription;
  private headerCellHover$: Subscription;

  /**
   * An observable of all header cell resize events
   */
  public readonly headerCellResizes: Observable<TsHeaderCellResizeEvent> | Observable<{}> = defer(() => {
    if (this.headerCells && this.headerCells.length) {
      return merge(...this.headerCells.map(cell => cell.resized));
    }

    // If there are any subscribers before `ngAfterViewInit`, `headerCells` may be undefined.
    // In that case, return a stream that we'll replace with the real one once everything is in place.
    return this.ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.headerCellResizes));
  });

  /**
   * An observable of all header cell hover events
   */
  public readonly headerCellHovers: Observable<boolean> | Observable<{}> = defer(() => {
    if (this.headerCells && this.headerCells.length) {
      return merge(...this.headerCells.map(cell => cell.hovered));
    }

    // If there are any subscribers before `ngAfterViewInit`, `headerCells` may be undefined.
    // In that case, return a stream that we'll replace with the real one once everything is in place.
    return this.ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.headerCellHovers));
  });

  /**
   * Override the sticky CSS class set by the `CdkTable`
   */
  protected stickyCssClass = 'ts-table--sticky';

  /**
   * Return a simple array of column names
   *
   * Used by {@link TsHeaderRowDefDirective} and {@link TsRowDefDirective}.
   */
  public get columnNames(): string[] {
    return this.columns.map(c => c.name);
  }

  /**
   * Access child rows
   */
  @ContentChildren(TsRowComponent)
  public rows: QueryList<TsRowComponent>;

  /**
   * Access header cells
   */
  @ContentChildren(TsHeaderCellDirective, { descendants: true })
  public headerCells: QueryList<TsHeaderCellDirective>;

  /**
   * Define the array of columns
   */
  @Input()
  public set columns(value: ReadonlyArray<TsColumn>) {
    // istanbul ignore else
    if (value && value.length) {
      this._columns = value.map(column => {
        if (isUndefined(column.width)) {
          column.width = DEFAULT_COLUMN_WIDTH;
        }
        return column;
      });
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
   * Emit when a column is resized
   *
   * NOTE: This output is not debounce or throttled and may be called repeatedly
   */
  @Output()
  public readonly columnsChange = new EventEmitter<TsTableColumnsChangeEvent>();


  constructor(
    private platform: Platform,
    protected readonly differs: IterableDiffers,
    protected readonly changeDetectorRef: ChangeDetectorRef,
    @Optional() protected readonly dir: Directionality,
    public readonly elementRef: ElementRef,
    // tslint:disable-next-line no-attribute-decorator
    @Attribute('role') role: string,
    // tslint:disable-next-line no-any
    @Inject(DOCUMENT) public document: any,
    public renderer: Renderer2,
    public ngZone: NgZone,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }


  /**
   * Subscribe to header cell resize & hover events
   */
  public ngOnInit(): void {
    super.ngOnInit();
    this.initHeaderSubscriptions();
  }


  /**
   * Update the column width definitions when the rows change
   */
  public ngAfterViewChecked(): void {
    this.viewChange.subscribe(v => {
      this.initHeaderSubscriptions();
      // NOTE: We need to manually call this since we have likely adjusted the cell widths.
      this.updateStickyColumnStyles();
    });

    this.rows.changes.subscribe(() => {
      for (const column of this.columns) {
        this.setColumnWidthStyle(column.name, column.width);
      }
      this.initHeaderSubscriptions();
    });
  }


  /**
   * Must be present for `untilComponentDestroyed`
   */
  public ngOnDestroy(): void {}


  /**
   * Update the stored column width
   *
   * @param columnName - The name of the column
   * @param width - The width to set
   */
  public updateColumnWidth(columnName: string, width: string): void {
    this.setColumnWidthStyle(columnName, width);
    const columns = this.columns.slice();
    const foundIndex = columns.findIndex(c => c.name === columnName);

    // istanbul ignore else
    if (foundIndex >= 0) {
      columns[foundIndex].width = width;
      this.columns = columns;
      this.columnsChange.emit(new TsTableColumnsChangeEvent(this, this.columns.slice()));
    }
  }


  /**
   * Set the max-width style for a column of cells
   */
  public setColumnWidthStyle(columnName: string, width: string): void {
    const columnCells = this.getColumnElements(columnName);
    for (const cell of columnCells) {
      this.renderer.setStyle(cell, 'max-width', width);
    }

    // NOTE: To lessen the thrashing, only call the sticky column updater if there are defined sticky columns
    const stickyCells = this.headerCells.toArray().filter(c => c.columnDef.sticky || c.columnDef.stickyEnd);
    // istanbul ignore else
    if (stickyCells.length) {
      this.debouncedStickyColumnUpdate();
    }
  }


  /**
   * Collect all column elements from a column name
   *
   * @param columnName - The name of the column to collect
   * @return An array of HTMLElements
   */
  public getColumnElements(columnName: string): HTMLElement[] {
    const className = `.ts-column-${columnName}`;
    return Array.from(this.elementRef.nativeElement.querySelectorAll(className));
  }


  /**
   * Set the appropriate column class on mouseenter/mouseleave
   *
   * @param columnName - The name of the column to update
   * @param isHovered - Whether the column is currently hovered
   */
  public updateColumnHoverClass(columnName: string, isHovered: boolean): void {
    const columnCells = this.getColumnElements(columnName);
    for (const cell of columnCells) {
      if (isHovered) {
        this.renderer.addClass(cell, 'ts-cell--resizing');
      } else {
        this.renderer.removeClass(cell, 'ts-cell--resizing');
      }
    }
  }


  /**
   * Initialize subscriptions for header events
   */
  private initHeaderSubscriptions(): void {
    if (this.headerCellResize$) {
      this.headerCellResize$.unsubscribe();
    }
    if (this.headerCellHover$) {
      this.headerCellHover$.unsubscribe();
    }

    this.headerCellResize$ = this.headerCellResizes.subscribe(v => {
      const { instance, width } = v as TsHeaderCellResizeEvent;
      this.updateColumnWidth(instance.columnDef.name, width);
    });

    this.headerCellHover$ = this.headerCellHovers.subscribe(v => {
      const { instance, isHovered } = v as TsHeaderCellResizeHoverEvent;
      this.updateColumnHoverClass(instance.columnDef.name, isHovered);
    });
  }

}
