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
- [Content wrapping](#content-wrapping)
- [Cell alignment](#cell-alignment)
- [Sticky header](#sticky-header)
- [Sticky column](#sticky-column)
  - [Sticky column at end](#sticky-column-at-end)
- [Re-orderable columns](#re-orderable-columns)
- [Density](#density)
- [Outer border](#outer-border)
- [Scrolling](#scrolling)
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
  <th ts-header-cell *tsHeaderCellDef>
    Username
  </th>

  <td ts-cell *tsCellDef="let item">
    <!-- Place any HTML content here -->
    {{ item.username }}
  </td>
</ng-container>
```

> NOTE: `ts-header-cell` & `ts-cell` can both be used as a component selector or an attribute selector. We _highly_ encourage the attribute
> usage as it is more accessible and has better support for items such as multiple sticky headers etc.

### 2. Define the displayed columns

The table expects an array of `TsColumn` definitions to manage the displayed columns and the initial column width.

```typescript
import { TsColumn } from '@terminus/ui/table'; 

const columns: TsColumn = [
  {name: 'title', width: 200},
  {name: 'body', width: 400},
];
```

### 3. Define the table's rows

After defining your columns, provide the header and data row templates that will be rendered out by the table. Each row needs to be given a
list of the columns that it should contain. The order of the names will define the order of the cells rendered.

NOTE: It is not required to provide a list of all the _defined_ column names, but only the ones that you want to have
rendered.

```html
<tr ts-header-row *tsHeaderRowDef="['userName', 'age']"></tr>

<!-- `let row;` is  exposing the row data to the template as the variable `row` -->
<tr ts-row *tsRowDef="let row; columns: ['userName', 'age']"></tr>
```

> NOTE: `ts-header-row` & `ts-row` can both be used as a component selector or an attribute selector. Attribute usage is _highly_ encouraged  
> as it is more accessible and has better support for items such as multiple sticky headers etc.

The table component provides an array of column names built from the array of `TsColumn` definitions passed to the table. You can use this  
 reference for the rows rather than defining two seperate arrays:

```html
<table
  ts-table
  [dataSource]="dataSource"
  [columns]="resizableColumns"
  #myTable="tsTable"
>

  <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>

  <!-- 
    `myTable` is the template reference for the table component.
    `columnNames` is a getter that returns an array of column names.
  -->
  <tr ts-row *tsRowDef="let row; columns: myTable.columnNames"></tr>
</table>
```

> NOTE: `ts-table` can be used as a component selector or an attribute selector. Attribute usage is _highly_ encouraged as it is more  
> accessible and has better support for items such as multiple sticky headers etc.

Mapping the array of names manually is also fairly simple:

```typescript
import { TsColumn } from '@terminus/ui/table'; 

const columns: TsColumn = [
  {name: 'title', width: 200},
  {name: 'body', width: 400},
];
const columnName = this.columns.map(c => c.name);
```


### 4. Provide data

The column and row definitions capture how data will render - all that's left is to provide the data itself.

Create an instance of `TsTableDataSource` and set the items to be displayed to the `data` property.

```typescript
import { TsTableDataSource } from '@terminus/ui/table'; 

this.myDataSource = new TsTableDataSource();
this.myDataSource.data = dataToRender;
```

```html
<table ts-table [dataSource]=”myDataSource”>
  ...
</table>
```

The `DataSource` can be seeded with initial data:

```typescript
import { TsTableDataSource } from '@terminus/ui/table'; 

this.myDataSource = new TsTableDataSource(INITIAL_DATA);
```

An interface for your table data can be passed to `TsTableDataSource` for stricter typing:

```typescript
import { TsTableDataSource } from '@terminus/ui/table'; 

export interface MyTableItem {
  name: string;
  id: number;
}

this.myDataSource = new TsTableDataSource<MyTableItem>(INITIAL_DATA);
```


### Full HTML example

```html
<!-- Pass in the dataSource -->
<table ts-table [dataSource]="myDataSource" [columns]="myColumns" #myTable="tsTable">
  <!-- Define the header cell and body cell for the `username` Column -->
  <ng-container tsColumnDef="username">
    <th ts-header-cell *tsHeaderCellDef>
      Username
    </th>

    <td ts-cell *tsCellDef="let item">
      {{ item.username }}
    </td>
  </ng-container>

  <!-- Define the header cell and body cell for the `age` Column -->
  <ng-container tsColumnDef="age">
    <th ts-header-cell *tsHeaderCellDef>
      Age
    </th>

    <td ts-cell *tsCellDef="let item">
      {{ item.age }}
    </td>
  </ng-container>

  <!-- Define the table's header row -->
  <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>

  <!-- Define the table's body row(s) -->
  <tr ts-row *tsRowDef="let row; columns: myTable.columnNames;"></tr>
</table>
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
<table ts-table [dataSource]="myDataSource" [columns]="myColumns" #myTable="tsTable">
  <!-- Custom column definitions excluded for brevity -->

  <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>
  <tr ts-row *tsRowDef="let row; columns: myTable.columnNamesr;"></tr>
</table>
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
<table ts-table [dataSource]="myDataSource" [columns]="myColumns" tsSort>
  <ng-container tsColumnDef="position">
    <!-- Add the `ts-sort-header` directive to the column -->
    <th ts-header-cell *tsHeaderCellDef ts-sort-header>
      Position
    </th>

    <td ts-cell *tsCellDef="let element">
      {{ element.position }}
    </td>
  </ng-container>
</table>
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


## Content wrapping

By default, cell contents do not wrap. This can be overridden by adding container around your content with `white-space: normal`.


## Cell alignment

Defining an alignment style for a cell will set the horizontal alignment of text inside the cell. Set the directive `alignment` and pass it
any valid TsTableColumnAlignment value (`left`, `center` or `right`).

```html
<!-- Set alignment on the column -->
<ng-container tsColumnDef="created" alignment="right">
  <th ts-header-cell *tsHeaderCellDef ts-sort-header>
    Created
  </th>
  <td ts-cell *tsCellDef="let item">
    {{ item.created_at | date:shortDate }}
  </td>
</ng-container>
```


## Sticky header

Defining the header as sticky will ensure it is always visible as the table scrolls. Set `sticky: true` in the `ts-header-row`'s
`tsHeaderRowDef` directive.

```html
<tr ts-header-row *tsHeaderRowDef="displayedColumns; sticky: true"></tr>
```

> NOTE: Multiple sticky headers can be defined.


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

> NOTE: Multiple `sticky` columns can be defined.


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

> NOTE: Multiple `stickyEnd` columns can be defined.


## Re-orderable columns

Column reordering is not built into the table itself, but it is supported with the help of the Angular CDK.
 
The example below shows how to allow users to adjust column visibility *and* column order via a menu.

> NOTE: Use the custom icon `table_large_plus` to indicate a table settings menu.

```html
<!-- Set up a TsMenuComponent to control which columns are visible and their order -->
<ts-menu [menuItemsTemplate]="columns" theme="accent">
  <ts-icon svgIcon="table_large_plus"></ts-icon>
  Edit Columns
</ts-menu>

<!-- Here we are defining the list of controls that will be shown in the menu -->
<ng-template #columns>
  <!-- Here we wire up a two CDK drop list directives and one CDK emitter -->
  <form
    [formGroup]="columnsForm"
    cdkDropList
    cdkDropListLockAxis="y"
    (cdkDropListDropped)="columnDropped($event)"
  >
    <!-- Pass an array of all columns that can be made visible. This array's order will be update when column order is changed. -->
    <ng-container *ngFor="let column of allPossibleColumns">
      <!-- The menu normally closes after each interaction, so we need to stop propagation here to
      support multiple selections without closing using the `(click)` event. -->
      <ts-checkbox
        [formControl]="column.control"
        (click)="$event.stopPropagation()"
        theme="accent"
        cdkDrag
      >
        <span>
          {{ column.display }}
        </span>

        <!-- Here we specify the drag handle with another CDK directive (optional). -->    
        <!-- We also need to stop drag interactions from affecting the checkbox status. -->
        <ts-icon
          cdkDragHandle
          (click)="$event.preventDefault() && $event.stopPropagation()"
        >drag_indicator</ts-icon>

        <!-- Define a placeholder that is seen in the slot the current item will fill when released (optional) -->
        <div *cdkDragPlaceholder></div>
      </ts-checkbox>
    </ng-container>
  </form>
</ng-template>

<!-- The table (column & row definitions omitted for brevity) -->
<table
  ts-table
  [dataSource]="dataSource"
  [columns]="visibleColumns"
  (columnsChange)="columnsChange($event)"
  #myTable="tsTable"
>
  <!-- ... -->
</table>
```

```typescript
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TsColumn } from '@terminus/ui/table';

/**
 * Extend the TsColumn interface with properties our component needs.
 *
 * This allows us to add a control we can use to determine which columns should be shown
 */
export interface CustomColumn extends TsColumn {
  // The UI text for the column dropdown
  display: string;
  // The associated FormControl
  control: FormControl;
}

@Component({...})
export class TableComponent {
  // Define the original column source with all columns defaulted to visible
  private readonly columnsSource: CustomColumn[] = [
    {
      display: 'Title',
      name: 'title',
      width: 300,
      control: new FormControl(true),
    },
    {
      display: 'Number',
      name: 'number',
      control: new FormControl(true),
      width: 100,
    },
    // ...etc
  ];

  // Define the mutable version of your columns (must be mutable as we will be changing the order)
  public allPossibleColumns: CustomColumn[] = this.columnsSource.slice();

  // Define a getter that filters our columns whose control is currently `false`.
  // This is what will get passed to the table's `columns` input.
  public get visibleColumns(): CustomColumn[] {
    return this.allPossibleColumns.filter(c => c.control && c.control.value);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  // Define a method to handle the drop event. When an item is dropped in the UI, the underlying data has not been changed yet.
  public columnDropped(event: CdkDragDrop<string[]>): void {
    // `moveItemInArray` mutates the original array, so first we clone the array
    const columns = this.allPossibleColumns.slice();
    // Then update the positions (this function is provided by the CDK)
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    // Update the original columns array
    this.allPossibleColumns = columns;
    // Fire the change detector so that the table will update all columns. (Without this, the column widths aren't re-set until
    // closing the menu.
    this.changeDetectorRef.detectChanges();
  }
}
```


## Density

The table supports two density settings: `comfy` (default) & `compact`.

```html
<table ts-table density="compact">
  ...
</table>
```

## Outer border

Since the scrolling container around the table is now a consumer responsibility, adding a border around the table also
must be done by the consumer:

```scss
.my-table-container {
  border: 1px solid color(utility, light);
}
```

## Scrolling

Scrolling is controlled by the containing element that is placed around the table. If persistent scrollbars are desired,
the scrollbars mixin can be used:

```scss
.my-table-container {
  @include visible-scrollbars;
}
```


## Events

### Table

| Event           | Description                      | Payload                     |
|:----------------|:---------------------------------|:----------------------------|
| `columnsChange` | Fired when any column is changed | `TsTableColumnsChangeEvent` |

> NOTE: This event is not throttled or debounced and may be called repeatedly.

```html
<table ts-table (columnsChange)="whenColumnsChange($event)">
  ...
</table>
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
  <th ts-header-cell *tsHeaderCellDef (resized)="whenCellIsResized($event)">
    Title
  </th>
  <td ts-cell *tsCellDef="let item">
    {{ item.title }}
  </td>
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

    <table
      ts-table
      [dataSource]="dataSource"
      [columns]="displayedColumns"
      tsSort
      #myTable="tsTable"
    >
      <ng-container tsColumnDef="created">
        <th ts-header-cell *tsHeaderCellDef ts-sort-header>
          Created
        </th>
        <td ts-cell *tsCellDef="let item">
          {{ item.created_at | date:shortDate }}
        </td>
      </ng-container>

      <ng-container tsColumnDef="number" alignment="right">
        <th ts-header-cell *tsHeaderCellDef>
          Number
        </th>
        <td ts-cell *tsCellDef="let item">
          {{ item.number }}
        </td>
      </ng-container>

      <ng-container tsColumnDef="title">
        <th ts-header-cell *tsHeaderCellDef>
          Title
        </th>
        <td ts-cell *tsCellDef="let item">
          {{ item.title }}
        </td>
      </ng-container>

      <ng-container tsColumnDef="state">
        <th ts-header-cell *tsHeaderCellDef>
          State
        </th>
        <td ts-cell *tsCellDef="let item">
          {{ item.state }}
        </td>
      </ng-container>

      <ng-container tsColumnDef="comments">
        <th ts-header-cell *tsHeaderCellDef ts-sort-header>
          Comments
        </th>
        <td ts-cell *tsCellDef="let item">
          {{ item.comments }}
        </td>
      </ng-container>

      <tr ts-header-row *tsHeaderRowDef="myTable.columnNames"></tr>
      <tr ts-row *tsRowDef="let row; columns: myTable.columnNames;"></tr>
    </table>


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
      width: 100,
    },
    {
      name: 'Title',
      value: 'title',
      width: 100,
    },
    {
      name: 'Comments',
      value: 'comments',
      width: 200,
    },
    {
      name: 'State',
      value: 'state',
      width: 100,
    },
    {
      name: 'Number',
      value: 'number',
      width: 100,
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
