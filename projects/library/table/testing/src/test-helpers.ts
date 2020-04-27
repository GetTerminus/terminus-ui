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
 * @return The instance
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
 * @return An array of Elements
 */
export function getElements(element: Element, query: string): Element[] {
  return [].slice.call(element.querySelectorAll(query));
}

/**
 * Get the header row
 *
 * @param tableElement - The table element to search within
 * @return The table element
 */
export function getHeaderRow(tableElement: Element): Element {
  return tableElement.querySelector('.ts-header-row')!;
}

/**
 * Return all footer rows
 *
 * @param tableElement - The table element to search within
 * @returns An array of footer rows
 */
export function getFooterRows(tableElement: Element): Element[] {
  return Array.from(tableElement.querySelectorAll('.ts-footer-row'));
}

/**
 * Get all row elements
 *
 * @param tableElement - The table to search within
 * @return An array of row elements
 */
export function getRows(tableElement: Element): Element[] {
  return getElements(tableElement, '.ts-row');
}

/**
 * Get all cells within a row
 *
 * @param row - The row to search within
 * @return An array of cells
 */
export function getCells(row: Element): Element[] {
  return row ? getElements(row, '.ts-cell') : [];
}

/**
 * Get all header cells
 *
 * @param tableElement - The table to search within
 * @return An array of header cells
 */
export function getHeaderCells(tableElement: Element): Element[] {
  return getElements(getHeaderRow(tableElement), '.ts-header-cell');
}

/**
 * Get all footer cells
 *
 * @param footerRow - The Row to search within
 * @return An array of footer cells
 */
export function getFooterCells(footerRow: Element): Element[] {
  let cells = getElements(footerRow, 'ts-footer-cell');
  if (!cells.length) {
    cells = getElements(footerRow, 'td');
  }
  return cells;
}

/**
 * Get all cells within a column
 *
 * @param columnName - The name of the column to search for
 * @param tableElement - The table to search within
 * @return An array of column cells
 */
export function getColumnElements(columnName: string, tableElement: Element): HTMLElement[] {
  const className = `.ts-column-${columnName}`;
  return Array.from(tableElement.querySelectorAll(className));
}

/**
 * Custom matcher to determine if the table's contents are correct
 *
 * @param tableElement - The table element to check
 * @param expectedTableContent - The content that should be found in the table
 */
export function expectTableToMatchContent(tableElement: Element, expectedTableContent: any[]): void {
  const missedExpectations: string[] = [];
  function checkCellContent(cell: Element, expectedTextContent: string) {
    const actualTextContent = cell.textContent!.trim();
    if (actualTextContent !== expectedTextContent) {
      missedExpectations.push(
        `Expected cell contents to be ${expectedTextContent} but was ${actualTextContent}`
      );
    }
  }

  // Check header cells
  const expectedHeaderContent = expectedTableContent.shift();
  getHeaderCells(tableElement).forEach((cell, index) => {
    const expected = expectedHeaderContent
      ? expectedHeaderContent[index]
      : null;
    checkCellContent(cell, expected);
  });

  // Check data row cells
  const rows = getRows(tableElement);
  expect(rows.length).toBe(expectedTableContent.length);
  rows.forEach((row, rowIndex) => {
    getCells(row).forEach((cell, cellIndex) => {
      const expected = expectedTableContent.length
        ? expectedTableContent[rowIndex][cellIndex]
        : null;
      checkCellContent(cell, expected);
    });
  });

  if (missedExpectations.length) {
    // eslint-disable-next-line no-undef
    fail(missedExpectations.join('\n'));
  }
}

