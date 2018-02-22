// tslint:disable: no-non-null-assertion component-class-suffix
// NOTE(B$): I am not sure why I need to re-import jest items here. It has something to do with
// using the TestBed.
// Removing 'jest-preset-angular' throws a `zone.js not loaded` error.
// Removing 'jestGlobalMocks' throws a `CSS is not defined` error.
import 'jest-preset-angular';
import './../../jestGlobalMocks';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TsWindowService } from '@terminus/ngx-tools';
import { TsWindowServiceMock } from '@terminus/ngx-tools/testing';

import { TsPaginatorComponent } from './../paginator/paginator.component';
import { TsPaginatorModule } from './../paginator/paginator.module';
import { TsSortDirective } from './../sort/sort.directive';
import { TsSortHeaderComponent } from './../sort/sort-header.component';
import { TsSortModule } from './../sort/sort.module';
import { TsTableDataSource } from './table-data-source';
import { TsTableModule } from './table.module';
import { TsTableComponent } from './table.component';




/**
 * HELPERS
 */


interface TestData {
  a: string;
  b: string;
  c: string;
}

// TODO: change to my datasource - says properties connect aren't the same???
class FakeDataSource extends DataSource<TestData> {
  _dataChange = new BehaviorSubject<TestData[]>([]);
  set data(data: TestData[]) { this._dataChange.next(data); }
  get data() { return this._dataChange.getValue(); }

  constructor() {
    super();
    for (let i = 0; i < 4; i++) { this.addData(); }
  }

  connect(): Observable<TestData[]> {
    return this._dataChange;
  }

  disconnect() {}

  addData() {
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

@Component({
  template: `
    <ts-table [dataSource]="dataSource">
      <ng-container tsColumnDef="column_a">
        <ts-header-cell *tsHeaderCellDef> Column A</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.a }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_b">
        <ts-header-cell *tsHeaderCellDef> Column B</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.b }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_c">
        <ts-header-cell *tsHeaderCellDef> Column C</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.c }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="special_column">
        <ts-cell *tsCellDef="let row">fourth_row</ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="columnsToRender"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: columnsToRender"></ts-row>
      <ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></ts-row>
    </ts-table>
  `,
})
class TableApp {
  @ViewChild(TsTableComponent)
  table: TsTableComponent<TestData>;

  dataSource: FakeDataSource | null = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
  isFourthRow = (i: number, _rowData: TestData) => i === 3;

}


@Component({
  template: `
    <ts-table [dataSource]="dataSource">
      <ng-container tsColumnDef="column_a">
        <ts-header-cell *tsHeaderCellDef> Column A</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.a }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="special_column">
        <ts-cell *tsCellDef="let row">fourth_row</ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="['column_a']"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: ['column_a']"></ts-row>
      <ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></ts-row>
    </ts-table>
  `,
})
class TableWithWhenRowApp {
  @ViewChild(TsTableComponent) table: TsTableComponent<TestData>;
  dataSource: FakeDataSource | null = new FakeDataSource();
  isFourthRow = (i: number, _rowData: TestData) => i === 3;
}


@Component({
  template: `
    <ts-table [dataSource]="dataSource" tsSort>
      <ng-container tsColumnDef="column_a" noWrap="true">
        <ts-header-cell *tsHeaderCellDef ts-sort-header="a">Column A</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.a }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_b" minWidth="100px"  noWrap="true">
        <ts-header-cell *tsHeaderCellDef>Column B</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.b }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_c">
        <ts-header-cell *tsHeaderCellDef>Column C</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.c }}</ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="columnsToRender"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: columnsToRender"></ts-row>
    </ts-table>

    <ts-paginator></ts-paginator>
  `,
})
class ArrayDataSourceTableApp {
  underlyingDataSource = new FakeDataSource();
  dataSource = new TsTableDataSource<TestData>();
  columnsToRender = ['column_a', 'column_b', 'column_c'];

  @ViewChild(TsTableComponent)table: TsTableComponent<TestData>;
  @ViewChild(TsPaginatorComponent) paginator: TsPaginatorComponent;
  @ViewChild(TsSortDirective) sort: TsSortDirective;
  @ViewChild(TsSortHeaderComponent) sortHeader: TsSortHeaderComponent;

  constructor() {
    this.underlyingDataSource.data = [];

    // Add three rows of data
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();

    this.underlyingDataSource.connect().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}

@Component({
  template: `
    <ts-table [dataSource]="dataSource">
      <ng-container tsColumnDef="column_a">
        <ts-header-cell *tsHeaderCellDef ts-sort-header>Column A</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.a }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_b">
        <ts-header-cell *tsHeaderCellDef>Column B</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.b }}</ts-cell>
      </ng-container>

      <ng-container tsColumnDef="column_c">
        <ts-header-cell *tsHeaderCellDef>Column C</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.c }}</ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="columnsToRender"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: columnsToRender"></ts-row>
    </ts-table>

    <ts-paginator></ts-paginator>
  `,
})
class ArrayDataSourceTableAppNoSort {
  underlyingDataSource = new FakeDataSource();
  dataSource = new TsTableDataSource<TestData>();
  columnsToRender = ['column_a', 'column_b', 'column_c'];

  @ViewChild(TsTableComponent)table: TsTableComponent<TestData>;
  @ViewChild(TsPaginatorComponent) paginator: TsPaginatorComponent;
  @ViewChild(TsSortDirective) sort: TsSortDirective;
  @ViewChild(TsSortHeaderComponent) sortHeader: TsSortHeaderComponent;

  constructor() {
    this.underlyingDataSource.data = [];

    // Add three rows of data
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();

    this.underlyingDataSource.connect().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}




// Utilities copied from CDKTable's spec
function getElements(element: Element, query: string): Element[] {
  return [].slice.call(element.querySelectorAll(query));
}

function getHeaderRow(tableElement: Element): Element {
  return tableElement.querySelector('.ts-header-row')!;
}

function getRows(tableElement: Element): Element[] {
  return getElements(tableElement, '.ts-row');
}
function getCells(row: Element): Element[] {
  return row ? getElements(row, '.ts-cell') : [];
}

function getHeaderCells(tableElement: Element): Element[] {
  return getElements(getHeaderRow(tableElement), '.ts-header-cell');
}

function expectTableToMatchContent(tableElement: Element, expectedTableContent: any[]) {
  const missedExpectations: string[] = [];
  function checkCellContent(cell: Element, expectedTextContent: string) {
    const actualTextContent = cell.textContent!.trim();
    if (actualTextContent !== expectedTextContent) {
      missedExpectations.push(
          `Expected cell contents to be ${expectedTextContent} but was ${actualTextContent}`);
    }
  }

  // Check header cells
  const expectedHeaderContent = expectedTableContent.shift();
  getHeaderCells(tableElement).forEach((cell, index) => {
    const expected = expectedHeaderContent ?
        expectedHeaderContent[index] :
        null;
    checkCellContent(cell, expected);
  });

  // Check data row cells
  const rows = getRows(tableElement);
  expect(rows.length).toBe(expectedTableContent.length, `Found ${rows.length} rows but expected ${expectedTableContent.length}`);
  rows.forEach((row, rowIndex) => {
    getCells(row).forEach((cell, cellIndex) => {
      const expected = expectedTableContent.length ?
          expectedTableContent[rowIndex][cellIndex] :
          null;
      checkCellContent(cell, expected);
    });
  });

  if (missedExpectations.length) {
    fail(missedExpectations.join('\n'));
  }
}




/**
 * TESTS
 */


describe(`TsTableComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TsTableModule,
        TsPaginatorModule,
        TsSortModule,
      ],
      providers: [
        {
          provide: TsWindowService,
          useClass: TsWindowServiceMock,
        },
      ],
      declarations: [
        TableApp,
        TableWithWhenRowApp,
        ArrayDataSourceTableApp,
        ArrayDataSourceTableAppNoSort,
      ],
    }).compileComponents();
  }));


  describe(`with basic data source`, () => {

    test(`should be able to create a table with the right content and without when row`, () => {
      const fixture = TestBed.createComponent(TableApp);
      fixture.detectChanges();

      const tableElement = fixture.nativeElement.querySelector('.ts-table')!;
      const data = fixture.componentInstance.dataSource!.data;
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        [data[0].a, data[0].b, data[0].c],
        [data[1].a, data[1].b, data[1].c],
        [data[2].a, data[2].b, data[2].c],
        ['fourth_row'],
      ]);
    });

    it(`should create a table with special when row`, () => {
      const fixture = TestBed.createComponent(TableWithWhenRowApp);
      fixture.detectChanges();

      const tableElement = document.querySelector('.ts-table');
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1'],
        ['a_2'],
        ['a_3'],
        ['fourth_row'],
      ]);
    });
  });


  describe(`with TsTableDataSource`, () => {
    let tableElement: HTMLElement;
    let fixture: ComponentFixture<ArrayDataSourceTableApp>;
    let dataSource: TsTableDataSource<TestData>;
    let component: ArrayDataSourceTableApp;

    beforeEach(() => {
      fixture = TestBed.createComponent(ArrayDataSourceTableApp);
      fixture.detectChanges();

      tableElement = fixture.nativeElement.querySelector('.ts-table');
      component = fixture.componentInstance;
      dataSource = fixture.componentInstance.dataSource;
    });


    it(`should create table and display data source contents`, () => {
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1', 'b_1', 'c_1'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
      ]);
    });


    it(`changing data should update the table contents`, () => {
      // Add data
      component.underlyingDataSource.addData();
      fixture.detectChanges();
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1', 'b_1', 'c_1'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
        ['a_4', 'b_4', 'c_4'],
      ]);

      // Remove data
      const modifiedData = dataSource.data.slice();
      modifiedData.shift();
      dataSource.data = modifiedData;
      fixture.detectChanges();
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
        ['a_4', 'b_4', 'c_4'],
      ]);
    });


    it(`should add the no wrap class`, () => {
      const noWrapColumn = fixture.nativeElement.querySelector('.ts-column-no-wrap');

      expect(noWrapColumn).toBeTruthy();
    });


    test(`should add the min-width style`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['min-width'];
      }

      expect(style).toEqual('100px');
    });

  });

});
