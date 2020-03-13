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
  TsTableColumnsChangeEvent,
  TsTableComponent,
  TsTableDataSource,
  TsTableDensity,
  TsTableModule,
} from '@terminus/ui/table';

import {
  FakeDataSource,
  TestData,
} from './test-helpers';

@Component({
  template: `
    <table
      ts-table
      [dataSource]="dataSource"
      [density]="density"
      [columns]="columns"
      [id]="myId"
      (columnsChange)="columnsChanged($event)"
      #myTable="tsTable"
    >
      <ng-container tsColumnDef="column_a">
        <th ts-header-cell *tsHeaderCellDef> Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_b">
        <th ts-header-cell *tsHeaderCellDef> Column B</th>
        <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_c">
        <th ts-header-cell *tsHeaderCellDef> Column C</th>
        <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
      </ng-container>

      <ng-container tsColumnDef="special_column">
        <td ts-cell *tsCellDef="let row">fourth_row</td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>
      <tr ts-row *tsRowDef="let row; columns: myTable.columnNames"></tr>
      <tr ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></tr>
    </table>
  `,
})
export class TableApp {
  @ViewChild(TsTableComponent, { static: true })
  public table!: TsTableComponent<TestData>;
  public density: TsTableDensity = 'comfy';
  public dataSource: FakeDataSource | null = new FakeDataSource();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));
  public myId = 'foobar';
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;
  public columnsChanged(e: TsTableColumnsChangeEvent) {}
}

@Component({
  template: `
    <table ts-table [dataSource]="dataSource" [columns]="columns">
      <ng-container tsColumnDef="column_a">
        <th ts-header-cell *tsHeaderCellDef> Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>

      <ng-container tsColumnDef="special_column">
        <td ts-cell *tsCellDef="let row">fourth_row</td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="['column_a']"></tr>
      <tr ts-row *tsRowDef="let row; columns: ['column_a']"></tr>
      <tr ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></tr>
    </table>
  `,
})
export class TableWithWhenRowApp {
  @ViewChild(TsTableComponent, { static: true })
  public table!: TsTableComponent<TestData>;
  public dataSource: FakeDataSource | null = new FakeDataSource();
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;
  public columnsToRender = ['column_a'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));
}

@Component({
  template: `
    <table ts-table [dataSource]="dataSource" [columns]="columns" tsSort>
      <ng-container tsColumnDef="column_a" noWrap="true">
        <th ts-header-cell *tsHeaderCellDef ts-sort-header="a">Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_b" noWrap="true">
        <th ts-header-cell *tsHeaderCellDef>Column B</th>
        <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_c">
        <th ts-header-cell *tsHeaderCellDef>Column C</th>
        <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="columnsToRender"></tr>
      <tr ts-row *tsRowDef="let row; columns: columnsToRender"></tr>
    </table>
  `,
})
export class ArrayDataSourceTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));

  @ViewChild(TsTableComponent, { static: true })
  public table!: TsTableComponent<TestData>;
  @ViewChild(TsSortDirective, { static: true })
  public sort!: TsSortDirective;
  @ViewChild(TsSortHeaderComponent, { static: true })
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
    <table ts-table [dataSource]="dataSource" [columns]="columns" tsSort>
      <ng-container tsColumnDef="column_a" alignment="left">
        <th ts-header-cell *tsHeaderCellDef>Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_b" alignment="center">
        <th ts-header-cell *tsHeaderCellDef>Column B</th>
        <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_c" alignment="right">
        <th ts-header-cell *tsHeaderCellDef>Column C</th>
        <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="columnsToRender"></tr>
      <tr ts-row *tsRowDef="let row; columns: columnsToRender"></tr>
    </table>
  `,
})
export class TableColumnAlignmentTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));

  @ViewChild(TsTableComponent, { static: true })
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
    <table ts-table [dataSource]="dataSource" [columns]="columns" tsSort>
      <ng-container tsColumnDef="column_a" alignment="top">
        <th ts-header-cell *tsHeaderCellDef>Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>
      <tr ts-header-row *tsHeaderRowDef="columnsToRender"></tr>
      <tr ts-row *tsRowDef="let row; columns: columnsToRender"></tr>
    </table>
  `,
})
export class TableColumnInvalidAlignmentTableApp {
  public underlyingDataSource = new FakeDataSource();
  public dataSource = new TsTableDataSource<TestData>();
  public columnsToRender = ['column_a'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));

  @ViewChild(TsTableComponent, { static: true })
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
    <table ts-table [dataSource]="dataSource" [columns]="columns">
      <ng-container tsColumnDef="column_a" sticky>
        <th ts-header-cell *tsHeaderCellDef> Column A</th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_b">
        <th ts-header-cell *tsHeaderCellDef> Column B</th>
        <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
      </ng-container>

      <ng-container tsColumnDef="column_c" stickyEnd>
        <th ts-header-cell *tsHeaderCellDef> Column C</th>
        <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
      </ng-container>

      <ng-container tsColumnDef="special_column">
        <td ts-cell *tsCellDef="let row">fourth_row</td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="columnsToRender; sticky: true"></tr>
      <tr ts-row *tsRowDef="let row; columns: columnsToRender"></tr>
      <tr ts-row *tsRowDef="let row; columns: ['special_column']; when: isFourthRow"></tr>
    </table>
  `,
})
export class PinnedTableHeaderColumn {
  @ViewChild(TsTableComponent, { static: true })
  public table!: TsTableComponent<TestData>;

  public dataSource: FakeDataSource | null = new FakeDataSource();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));
  public isFourthRow = (i: number, _rowData: TestData) => i === 3;
}

@Component({
  template: `
    <div style="width: 250px;">
      <table
        ts-table
        [dataSource]="dataSource"
        [columns]="columns"
        (columnsChange)="columnsChanged($event)"
        #myTable="tsTable"
      >
        <ng-container tsColumnDef="column_a">
          <th ts-header-cell *tsHeaderCellDef> Column A</th>
          <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
        </ng-container>

        <ng-container tsColumnDef="column_b">
          <th ts-header-cell *tsHeaderCellDef> Column B</th>
          <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
        </ng-container>

        <ng-container tsColumnDef="column_c">
          <th ts-header-cell *tsHeaderCellDef> Column C</th>
          <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
        </ng-container>

        <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>
        <tr ts-row *tsRowDef="let row; columns: myTable.columnNames"></tr>
      </table>
    </div>
  `,
})
export class ScrollingTable {
  public dataSource: FakeDataSource | null = new FakeDataSource();
  public columnsToRender = ['column_a', 'column_b', 'column_c'];
  public columns = this.columnsToRender.map(c => ({
    name: c,
    width: 100,
  }));
  public columnsChanged(e: TsTableColumnsChangeEvent) {}
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
    ScrollingTable,
    TableApp,
    TableColumnAlignmentTableApp,
    TableColumnInvalidAlignmentTableApp,
    TableWithWhenRowApp,
  ],
})
export class TsTableTestComponentsModule {}
