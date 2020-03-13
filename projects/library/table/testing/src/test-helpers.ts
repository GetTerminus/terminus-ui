import { DataSource } from '@angular/cdk/collections';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsTableComponent } from '@terminus/ui/table';
import { TsUILibraryError } from '@terminus/ui/utilities';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

export interface TestData {
  a: string;
  b: string;
  c: string;
}

export class FakeDataSource extends DataSource<TestData> {
  public _dataChange = new BehaviorSubject<TestData[]>([]);
  public set data(data: TestData[]) {
    this._dataChange.next(data);
  }
  public get data() {
    return this._dataChange.getValue();
  }

  public constructor() {
    super();
    for (let i = 0; i < 4; i++) {
      this.addData();
    }
  }

  public connect(): Observable<TestData[]> {
    return this._dataChange;
  }

  public disconnect() {}

  public addData() {
    const nextIndex = this.data.length + 1;
    const copiedData = this.data.slice();
    copiedData.push({
      a: `a_${nextIndex}`,
      b: `b_${nextIndex}`,
      c: `c_${nextIndex}`,
    });
    this.data = copiedData;
  }
}

/**
 * Get the instance for a TsTableComponent
 *
 * @param fixture - The test fixture
 * @returns The instance
 */
export function getTableInstance<T = unknown>(fixture: ComponentFixture<T>): TsTableComponent {
  const debugElement = fixture.debugElement.query(By.directive(TsTableComponent));
  if (!debugElement) {
    throw new TsUILibraryError(`'getTableInstance' did not find an instance.`);
  }
  return debugElement.componentInstance;
}

/**
 * Query elements within another element
 *
 * @param element - The element to search within
 * @param query - The selector to query
 * @returns An array of Elements
 */
export const getElements = (element: Element, query: string): Element[] => [].slice.call(element.querySelectorAll(query));

/**
 * Get the header row
 *
 * @param tableElement - The table element to search within
 * @returns The table element
 */
export const getHeaderRow = (tableElement: Element): Element => tableElement.querySelector('.ts-header-row')!;

/**
 * Get all row elements
 *
 * @param tableElement - The table to search within
 * @returns An array of row elements
 */
export const getRows = (tableElement: Element): Element[] => getElements(tableElement, '.ts-row');

/**
 * Get all cells within a row
 *
 * @param row - The row to search within
 * @returns An array of cells
 */
export const getCells = (row: Element): Element[] => (row ? getElements(row, '.ts-cell') : []);

/**
 * Get all header cells
 *
 * @param tableElement - The table to search within
 * @returns An array of header cells
 */
export const getHeaderCells = (tableElement: Element): Element[] => getElements(getHeaderRow(tableElement), '.ts-header-cell');

/**
 * Get all cells within a column
 *
 * @param columnName - The name of the column to search for
 * @param tableElement - The table to search within
 * @returns An array of column cells
 */
export function getColumnElements(columnName: string, tableElement: Element): HTMLElement[] {
  const className = `.ts-column-${columnName}`;
  return Array.from(tableElement.querySelectorAll(className));
}

