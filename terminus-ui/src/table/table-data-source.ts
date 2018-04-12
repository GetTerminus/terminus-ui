// FIXME: Can we refactor non-null-assertion?
// tslint:disable: no-non-null-assertion
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';



/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using {@link TsSortDirective}), and paginator (using {@link TsPaginatorComponent}).
 */
export class TsTableDataSource<T> implements DataSource<T> {
  /**
   * Stream that emits when a new data array is set on the data source.
   */
  private _data: BehaviorSubject<T[]>;

  /**
   * Stream emitting render data to the table (depends on ordered data changes).
   */
  private _renderData = new BehaviorSubject<T[]>([]);

  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription!: Subscription;

  /**
   * The filtered set of data that has been matched by the filter string, or all the data if there
   * is no filter. Useful for knowing the set of data the table represents.
   * For example, a 'selectAll()' function would likely want to select the set of filtered data
   * shown to the user rather than all the data.
   */
  filteredData!: T[];

  /**
   * Array of data that should be rendered by the table, where each object represents one row.
   */
  set data(data: T[]) {
    this._data.next(data);
  }
  get data() {
    return this._data.value;
  }


  /**
   * Set up data and change subscriptions
   */
  constructor(initialData: T[] = []) {
    this._data = new BehaviorSubject<T[]>(initialData);
    this._updateChangeSubscription();
  }


  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with the
   * provided base data and send it to the table for rendering.
   */
  _updateChangeSubscription(): void {
    if (this._renderChangesSubscription) {
      this._renderChangesSubscription.unsubscribe();
    }

    // Watch for base data or filter changes to provide a filtered set of data.
    this._renderChangesSubscription = this._data
    // Watched for paged data changes and send the result to the table to render.
    .subscribe((data) => this._renderData.next(data));
  }


  /**
   * Used by the {@link TsTableComponent}. Called when it connects to the data source.
   */
  connect() { return this._renderData; }


  /**
   * Used by the {@link TsTableComponent}. Called when it is destroyed. No-op.
   */
  disconnect() {}

}
