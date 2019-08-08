import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  TsSortDirective,
  TsSortHeaderComponent,
} from '@terminus/ui/sort';
import {
  TsTableComponent,
  TsTableDataSource,
  TsTableModule,
} from '@terminus/ui/table';

import {
  FakeDataSource,
  TestData,
} from './test-helpers';


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
export class TableApp {
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
export class TableWithWhenRowApp {
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
  `,
})
export class ArrayDataSourceTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];

  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;
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
export class TableColumnAlignmentTableApp {
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
export class TableColumnInvalidAlignmentTableApp {
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


@Component({
  template: `
    <ts-table [dataSource]="dataSource">
      <ng-container tsColumnDef="column_a" sticky>
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

      <ts-header-row *tsHeaderRowDef="columnsToRender; sticky: true"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: columnsToRender"></ts-row>
      <ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></ts-row>
    </ts-table>
  `,
})
export class PinnedTableHeaderColumn {
  @ViewChild(TsTableComponent, {static: true})
  public table!: TsTableComponent<TestData>;

  public dataSource: FakeDataSource | null = new FakeDataSource();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsTableModule,
  ],
  declarations: [
    ArrayDataSourceTableApp,
    PinnedTableHeaderColumn,
    TableApp,
    TableColumnAlignmentTableApp,
    TableColumnInvalidAlignmentTableApp,
    TableWithWhenRowApp,
  ],
})
export class TsTableTestComponentsModule {}
