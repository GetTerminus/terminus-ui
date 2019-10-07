import { CdkTable } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { isUndefined } from '@terminus/ngx-tools/type-guards';


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

// Default column width = ~112px
const DEFAULT_COLUMN_WIDTH = '7rem';


/**
 * Wrapper for the CdkTable with Material design styles.
 *
 * @example
 *  <ts-table [dataSource]="dataSource" tsSort>
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
 *    <ts-header-row *tsHeaderRowDef="displayedColumns">
 *    </ts-header-row>
 *
 *    <ts-row *tsRowDef="let row; columns: displayedColumns;">
 *    </ts-row>
 *  </ts-table>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/table</example-url>
 */
@Component({
  selector: 'ts-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: { class: 'ts-table' },
  providers: [{
    provide: CdkTable,
    useExisting: TsTableComponent,
  }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'tsTable',
})
export class TsTableComponent<T> extends CdkTable<T> {
  /**
   * Override the sticky CSS class set by the `CdkTable`
   */
  protected stickyCssClass = 'ts-cell--sticky';

  /**
   * Return a simple array of column names
   *
   * Used by {@link TsHeaderRowDefDirective} and {@link TsRowDefDirective}.
   */
  public get columnNames(): string[] {
    return this.columns.map(c => c.name);
  }

  /**
   * Define the array of columns
   */
  @Input()
  public set columns(value: ReadonlyArray<TsColumn>) {
    this._columns = value.map(column => {
      if (isUndefined(column.width)) {
        column.width = DEFAULT_COLUMN_WIDTH;
      }
      return column;
    });
  }
  public get columns(): ReadonlyArray<TsColumn> {
    return this._columns;
  }
  private _columns: ReadonlyArray<TsColumn>;

}
