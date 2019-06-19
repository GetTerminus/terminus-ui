/* eslint-disable no-underscore-dangle */
import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  Provider,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TsWindowService } from '@terminus/ngx-tools';
import {
  createComponent as createComponentInner,
  TsWindowServiceMock,
} from '@terminus/ngx-tools/testing';
import {
  TsPaginatorComponent,
  TsPaginatorModule,
} from '@terminus/ui/paginator';
import {
  TsSortDirective,
  TsSortHeaderComponent,
  TsSortModule,
} from '@terminus/ui/sort';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { TsTableDataSource } from './table-data-source';
import { TsTableComponent } from './table.component';
import { TsTableModule } from './table.module';




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
  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;

  public dataSource: FakeDataSource | null = new FakeDataSource();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;

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
  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;
  public dataSource: FakeDataSource | null = new FakeDataSource();
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;
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
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];

  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;
  @ViewChild(TsPaginatorComponent, {static: true})
  public paginator!: TsPaginatorComponent;
  @ViewChild(TsSortDirective, {static: true})
  public sort!: TsSortDirective;
  @ViewChild(TsSortHeaderComponent, {static: true})
  public sortHeader!: TsSortHeaderComponent;

  public constructor() {
    this.underlyingDataSource.data = [];

    // Add three rows of data
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();
    this.underlyingDataSource.addData();

    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}

@Component({
  template: `
    <ts-table [dataSource]="dataSource" tsSort>
      <ng-container tsColumnDef="column_a" alignment="left">
        <ts-header-cell *tsHeaderCellDef>Column A</ts-header-cell>
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
  `,
})
class TableColumnAlignmentTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];

  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;

  public constructor() {
    this.underlyingDataSource.data = [];

    // Add a row of data
    this.underlyingDataSource.addData();

    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}

@Component({
  template: `
    <ts-table [dataSource]="dataSource" tsSort>
      <ng-container tsColumnDef="column_a" alignment="top">
        <ts-header-cell *tsHeaderCellDef>Column A</ts-header-cell>
        <ts-cell *tsCellDef="let row">{{ row.a }}</ts-cell>
      </ng-container>
      <ts-header-row *tsHeaderRowDef="columnsToRender"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: columnsToRender"></ts-row>
    </ts-table>
  `,
})
class TableColumnInvalidAlignmentTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a'];

  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;

  public constructor() {
    this.underlyingDataSource.data = [];

    // Add a row of data
    this.underlyingDataSource.addData();

    this.underlyingDataSource.connect().subscribe(data => {
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




/**
 * TESTS
 */


describe(`TsTableComponent`, function() {

  describe(`with basic data source`, function() {

    test(`should be able to create a table with the right content and without when row`, function() {
      const fixture = createComponent(TableApp);
      fixture.detectChanges();

      const tableElement = fixture.nativeElement.querySelector('.ts-table');
      const data = fixture.componentInstance.dataSource!.data;
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        [data[0].a, data[0].b, data[0].c],
        [data[1].a, data[1].b, data[1].c],
        [data[2].a, data[2].b, data[2].c],
        ['fourth_row'],
      ]);
    });


    test(`should create a table with special when row`, function() {
      const fixture = createComponent(TableWithWhenRowApp);
      fixture.detectChanges();

      const tableElement = document.querySelector('.ts-table');
      expectTableToMatchContent(tableElement!, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1'],
        ['a_2'],
        ['a_3'],
        ['fourth_row'],
      ]);
    });
  });


  describe(`with TsTableDataSource`, function() {
    let tableElement: HTMLElement;
    let fixture: ComponentFixture<ArrayDataSourceTableApp>;
    let dataSource: TsTableDataSource<TestData>;
    let component: ArrayDataSourceTableApp;

    beforeEach(() => {
      fixture = createComponent(ArrayDataSourceTableApp);
      fixture.detectChanges();

      tableElement = fixture.nativeElement.querySelector('.ts-table');
      component = fixture.componentInstance;
      dataSource = fixture.componentInstance.dataSource;
    });


    test(`should create table and display data source contents`, function() {
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1', 'b_1', 'c_1'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
      ]);
    });


    test(`changing data should update the table contents`, function() {
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


    test(`should add the no wrap class`, function() {
      const noWrapColumn = fixture.nativeElement.querySelector('.ts-column-no-wrap');

      expect(noWrapColumn).toBeTruthy();
    });


    test(`should add the min-width style`, function() {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['min-width'];
      }

      expect(style).toEqual('100px');
    });

  });

  describe(`table column alignment`, () => {
    let fixture: ComponentFixture<TableColumnAlignmentTableApp>;

    beforeEach(() => {
      fixture = createComponent(TableColumnAlignmentTableApp);
      fixture.detectChanges();
    });

    test(`should add the text-align style and set value to left`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_a');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toEqual('left');
    });

    test(`should NOT add the text-align style if alignment is not provided`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toBeUndefined();
    });

    test(`should NOT add the text-align style if alignment is not a valid alignment`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_c');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toBeUndefined();
    });

  });


  describe(`invalid alignment argument`, () => {

    test(`should throw warning`, () => {
      window.console.warn = jest.fn();
      const fixture = createComponent(TableColumnInvalidAlignmentTableApp);
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
    });

  });

});




/**
 * HELPERS
 */

export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  return createComponentInner<T>(component,
    [
      {
        provide: TsWindowService,
        useClass: TsWindowServiceMock,
        ...providers,
      },
    ],
    [
      NoopAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      TsTableModule,
      TsPaginatorModule,
      TsSortModule,
      ...imports,
    ],);
}
