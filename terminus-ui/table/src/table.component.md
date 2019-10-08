<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [1. Define the columns HTML](#1-define-the-columns-html)
  - [2. Define the displayed columns](#2-define-the-displayed-columns)
  - [3. Define the table's rows](#3-define-the-tables-rows)
  - [4. Provide data](#4-provide-data)
  - [Full HTML example](#full-html-example)
- [Dynamically update table data](#dynamically-update-table-data)
- [Dynamic columns](#dynamic-columns)
- [Sorting by column](#sorting-by-column)
- [Row selection](#row-selection)
- [No-wrap for a column](#no-wrap-for-a-column)
- [Cell alignment](#cell-alignment)
- [Sticky header](#sticky-header)
- [Sticky column](#sticky-column)
  - [Sticky column at end](#sticky-column-at-end)
- [Events](#events)
  - [Table](#table)
  - [Cell](#cell)
- [Full example with pagination, sorting, and dynamic columns](#full-example-with-pagination-sorting-and-dynamic-columns)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

### 1. Define the columns HTML

Define the table's columns. Each column definition should be given a unique name and contain the content for its header and row cells.

Here's a simple column definition with the name `userName`. The header cell contains the text `Username` and the row cell will render the
name property of each row's data.

```html
<ng-container tsColumnDef="username">
  <ts-header-cell *tsHeaderCellDef>
    Username
  </ts-header-cell>

  <ts-cell *tsCellDef="let item">
    <!-- Place any HTML content here -->
    {{ item.username }}
  </ts-cell>
</ng-container>
```


### 2. Define the displayed columns

The table expects an array of `TsColumn` definitions to manage the displayed columns and (optionally) their associated widths.

```typescript
const columns: TsColumn = [
  {name: 'title', width: '200px'},
  {name: 'body', width: '400px'},
  // The width will default to `7rem` if not defined here
  {name: 'link'},
];
```

> NOTE: Any valid CSS string can be passed in for the width: `1rem|12px|13vw|etc`. But when the user resizes the column, the width will be
> converted into pixels.

### 3. Define the table's rows

After defining your columns, provide the header and data row templates that will be rendered out by the table. Each row needs to be given a
list of the columns that it should contain. The order of the names will define the order of the cells rendered.

NOTE: It is not required to provide a list of all the defined column names, but only the ones that you want to have rendered.

```html
<ts-header-row *tsHeaderRowDef="['userName', 'age']"></ts-header-row>

<!-- `let row;` is  exposing the row data to the template as the variable `row` -->
<ts-row *tsRowDef="let row; columns: ['userName', 'age']"></ts-row>
```

The table component provides an array of column names built from the array of `TsColumn` definitions passed to the table. You can use this
reference for the rows rather than defining two different arrays:

```html
<ts-table
  [dataSource]="dataSource"
  [columns]="resizableColumns"
  #myTable="tsTable"
>

  <ts-header-row *tsHeaderRowDef="myTable.columnNames">
  </ts-header-row>

  <!-- 
    `myTable` is the template reference for the table component.
    `columnNames` is a getter that returns an array of column names.
  -->
  <ts-row *tsRowDef="let row; columns: myTable.columnNames">
  </ts-row>
</ts-table>
```

Mapping the array of names manually is also fairly simple:

```typescript
const columns: TsColumn = [
  {name: 'title', width: '200px'},
  {name: 'body', width: '400px'},
  {name: 'link'},
];
const columnName = this.columns.map(c => c.name);
```


### 4. Provide data

The column and row definitions now capture how data will render - all that's left is to provide the data itself.

Create an instance of `TsTableDataSource` and set the items to be displayed to the `data` property.

```typescript
this.myDataSource = new TsTableDataSource();
this.myDataSource.data = dataToRender;
```

```html
<ts-table [dataSource]=”myDataSource”>
  ...
</ts-table>
```

The `DataSource` can be seeded with initial data:

```typescript
this.myDataSource = new TsTableDataSource(INITIAL_DATA);
```

An interface for your table data can be passed to `TsTableDataSource` for stricter typing:

```typescript
export interface MyTableItem {
  name: string;
  id: number;
}

this.myDataSource = new TsTableDataSource<MyTableItem>(INITIAL_DATA);
```


### Full HTML example

```html
<!-- Pass in the dataSource -->
<ts-table [dataSource]="myDataSource" [columns]="myColumns" #myTable="tsTable">
  <!-- Define the header cell and body cell for the `username` Column -->
  <ng-container tsColumnDef="username">
    <ts-header-cell *tsHeaderCellDef>
      Username
    </ts-header-cell>

    <ts-cell *tsCellDef="let item">
      {{ item.username }}
    </ts-cell>
  </ng-container>

  <!-- Define the header cell and body cell for the `age` Column -->
  <ng-container tsColumnDef="age">
    <ts-header-cell *tsHeaderCellDef>
      Age
    </ts-header-cell>

    <ts-cell *tsCellDef="let item">
      {{ item.age }}
    </ts-cell>
  </ng-container>

  <!-- Define the table's header row -->
  <ts-header-row *tsHeaderRowDef="myTable.columnNames"></ts-header-row>

  <!-- Define the table's body row(s) -->
  <ts-row *tsRowDef="let row; columns: myTable.columnNames;"></ts-row>
</ts-table>
```


## Dynamically update table data

Your data source was created during the bootstraping of your component:

```typescript
this.myDataSource = new TsTableDataSource<MyDataType>();
```

Simply assign the new data to `myDataSource.data`. The table will flush the old data and display the new data:

```typescript
this.myDataSource.data = dataToRender;
```


## Dynamic columns

Columns can be dynamically added and removed with any control. The selected control should affect the array of columns passed to the table
(`myColumns` in the example below).

```html
<!-- As the `myColumns` array is changed, columns will be shown/hidden in real time -->
<ts-table [dataSource]="myDataSource" [columns]="myColumns" #myTable="tsTable">
  <!-- Custom column definitions excluded for brevity -->

  <ts-header-row *tsHeaderRowDef="myTable.columnNames"></ts-header-row>
  <ts-row *tsRowDef="let row; columns: myTable.columnNames;"></ts-row>
</ts-table>
```


## Sorting by column

To add sorting behavior to the table, add the `tsSort` directive to the `<ts-table>` and add `ts-sort-header` to each column header cell
that should trigger sorting. Provide the `TsSortDirective` directive to the `TsTableDataSource` and it will automatically listen for sorting
changes and change the order of data rendered by the table.

By default, the `TsTableDataSource` sorts with the assumption that the sorted column's name matches the data property name that the column
displays. For example, the following column definition is named `position`, which matches the name of the property displayed in the row
cell.

```html
<!-- Add the `tsSort` directive to the table -->
<ts-table [dataSource]="myDataSource" [columns]="myColumns" tsSort>
  <ng-container tsColumnDef="position">
    <!-- Add the `ts-sort-header` directive to the column -->
    <ts-header-cell *tsHeaderCellDef ts-sort-header>
      Position
    </ts-header-cell>

    <ts-cell *tsCellDef="let element">
      {{ element.position }}
    </ts-cell>
  </ng-container>
</ts-table>
```

In your class, get a reference to the `TsSortDirective` using `@ViewChild`:

```typescript
import { AfterViewInit, ViewChild } from '@angular/core';
import { TsSortDirective } from '@terminus/ui/sort';

export class TableComponent implements AfterViewInit {
  // Get a reference to the TsSortDirective instance
  @ViewChild(TsSortDirective, {static: false})
  sort: TsSortDirective;

  public ngAfterViewInit(): void {
    // Subscribe to the sortChange event to reset pagination, fetch new data, etc
    this.sort.sortChange.subscribe(sortState => {
      // Table was sorted - go get new data!
      console.log('Table sort changed! ', sortState);
    });
  }
}
```


## Row selection

This can be implemented at the consumer level by adding a column that contains a checkbox.


## No-wrap for a column

Sometimes a column's content should not wrap, even at small viewport sizes. Setting the `@Input` `[noWrap]="true"` on the column will keep
the contents from wrapping regardless of the viewport width.

```html
<!-- Set noWrap on the column -->
<ng-container tsColumnDef="created" [noWrap]="true">
  <ts-header-cell *tsHeaderCellDef ts-sort-header>
    Created
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.created_at | date:shortDate }}
  </ts-cell>
</ng-container>
```


## Cell alignment

Defining an alignment style for a cell will set the horizontal alignment of text inside the cell. Set the directive `alignment` and pass it
any valid TsTableColumnAlignment value (`left`, `center` or `right`).

```html
<!-- Set alignment on the column -->
<ng-container tsColumnDef="created" alignment="right">
  <ts-header-cell *tsHeaderCellDef ts-sort-header>
    Created
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.created_at | date:shortDate }}
  </ts-cell>
</ng-container>
```


## Sticky header

Defining the header as sticky will ensure it is always visible as the table scrolls. Set `sticky: true` in the `ts-header-row`'s
`tsHeaderRowDef` directive.

```html
<ts-header-row *tsHeaderRowDef="displayedColumns; sticky: true"></ts-header-row>
```


## Sticky column

Defining a sticky column will pin it to the left side as the table scrolls horizontally. Add the sticky data attribute to the column
definition. This can be applied to more than one column.

```html
<ng-container tsColumnDef="updated" sticky>
  <ts-header-cell *tsHeaderCellDef>
    Updated
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.updated_at | date:"shortDate" }}
  </ts-cell>
</ng-container>
```

### Sticky column at end

Adding the data attribute `stickyEnd` will pin the column to the end of the table as it scrolls horizontally. This can be applied to more
than one column.


```html
<ng-container tsColumnDef="updated" stickyEnd>
  <ts-header-cell *tsHeaderCellDef>
    Updated
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.updated_at | date:"shortDate" }}
  </ts-cell>
</ng-container>
```

## Events

### Table

| Event           | Description                      | Payload                     |
|:----------------|:---------------------------------|:----------------------------|
| `columnsChange` | Fired when any column is changed | `TsTableColumnsChangeEvent` |

> NOTE: This event is not throttled or debounced and may be called repeatedly.

```html
<ts-table (columnsChange)="whenColumnsChange($event)">
  ...
</ts-table>
```

The `TsTableColumnsChangeEvent` structure:

```typescript
class TsTableColumnsChangeEvent {
  constructor(
    // The table instance that originated the event
    public table: TsTableComponent,
    // The updated array of columns
    public columns: TsColumn[],
  ) {}
}
```

###  Cell

| Event     | Description                           | Payload                   |
|:----------|:--------------------------------------|:--------------------------|
| `resized` | Fired when the header cell is resized | `TsHeaderCellResizeEvent` |

```html
<ng-container tsColumnDef="title">
  <ts-header-cell *tsHeaderCellDef (resized)="whenCellIsResized($event)">
    Title
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.title }}
  </ts-cell>
</ng-container>
```

```typescript
class TsHeaderCellResizeEvent {
  constructor(
    // The header cell instance that originated the event
    public instance: TsHeaderCellDirective,
    // The new width
    public width: string,
  ) {}
}
```


## Full example with pagination, sorting, and dynamic columns

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { TsSortDirective } from '@terminus/ui/sort';
import { TsTableDataSource, TsColumn } from '@terminus/ui/table';
import { TsPaginatorComponent } from '@terminus/ui/paginator';


@Component({
  selector: 'my-component',
  template: `
    <!-- Align the select to the right side -->
    <div fxLayout="row" fxLayoutAlign="end center">
      <ts-select
        label="Show/hide columns"
        [multipleAllowed]="true"
        valueKey="value"
        [(ngModel)]="displayedColumns"
        [items]="allColumns"
      ></ts-select>
    </div>

    <ts-table
      [dataSource]="dataSource"
      [columns]="displayedColumns"
      tsSort
      #myTable="tsTable"
    >
      <ng-container tsColumnDef="created" [noWrap]="true">
        <ts-header-cell *tsHeaderCellDef ts-sort-header>
          Created
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.created_at | date:shortDate }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="number" [noWrap]="true" alignment="right">
        <ts-header-cell *tsHeaderCellDef>
          Number
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.number }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="title">
        <ts-header-cell *tsHeaderCellDef>
          Title
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.title }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="state" [noWrap]="true">
        <ts-header-cell *tsHeaderCellDef>
          State
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.state }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="comments">
        <ts-header-cell *tsHeaderCellDef ts-sort-header>
          Comments
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.comments }}
        </ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="myTable.columnNames"></ts-header-row>
      <ts-row *tsRowDef="let row; columns: myTable.columnNames;"></ts-row>
    </ts-table>


    <!-- Align the paginator to the right side -->
    <div fxLayout="row" fxLayoutAlign="end center">
      <ts-paginator
        [totalRecords]="resultsLength"
        recordCountTooHighMessage="Please refine your filters."
        (pageSelect)="onPageSelect($event)"
        (recordsPerPageChange)="perPageChange($event)"
        (firstPageChosen)="first($event)"
        (previousPageChosen)="previous($event)"
        (nextPageChosen)="next($event)"
        (lastPageChosen)="last($event)"
      ></ts-paginator>
    </div>
  `,
})
export class TableComponent implements AfterViewInit {
  allColumns: TsColumn[] = [
    {
      name: 'Created',
      value: 'created',
    },
    {
      name: 'Title',
      value: 'title',
      width: '12.5rem',    
    },
    {
      name: 'Comments',
      value: 'comments',
      width: '500px',
    },
    {
      name: 'State',
      value: 'state',
    },
    {
      name: 'Number',
      value: 'number',
    },
  ];
  // Default to all columns visible
  displayedColumns: TsColumn[] = this.allColumns.slice();
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new TsTableDataSource<GithubIssue>();
  resultsLength = 0;

  @ViewChild(TsSortDirective, {static: true})
  sort: TsSortDirective;

  @ViewChild(TsPaginatorComponent, {static: true})
  paginator: TsPaginatorComponent;

  constructor(
    private http: HttpClient,
  ) {}

  public ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.currentPageIndex = 0);

    // Fetch new data anytime the sort is changed, the page is changed, or the records shown per page is changed
    merge(this.sort.sortChange, this.paginator.pageSelect, this.paginator.recordsPerPageChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.currentPageIndex,
            this.paginator.recordsPerPage,
          );
        }),
        map(data => {
          console.log('Demo: fetched data: ', data)
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          console.warn('GitHub API rate limit has been reached!')
          return of([]);
        })
      ).subscribe(data => {
        this.dataSource.data = data;
      });
  }
}


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/**
 * An example database that this example uses to retrieve data for the table.
 */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  public getRepoIssues(sort: string, order: string, page: number, perPage: number): Observable<GithubApi> {
    const href = `https://api.github.com/search/issues`;
    const requestUrl = `${href}?q=repo:GetTerminus/terminus-ui`;
    const requestParams = `&sort=${sort}&order=${order}&page=${page + 1}&per_page=${perPage}`;
    return this.http.get<GithubApi>(`${requestUrl}${requestParams}`);
  }
}
```

## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/table/testing`;

[[source]][test-helpers-src]

| Function                    |
|-----------------------------|
| `getElements`               |
| `getHeaderRow`              |
| `getRows`                   |
| `getCells`                  |
| `getHeaderCells`            |
| `expectTableToMatchContent` |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/table/testing/src/test-helpers.ts
