### Basic usage


##### 1. Define the table's columns

Define the table's columns. Each column definition should be given a unique name and contain the
content for its header and row cells.

Here's a simple column definition with the name `userName`. The header cell contains the text `Username`
and the row cell will render the name property of each row's data.

```html
<ng-container tsColumnDef="username">
  <ts-header-cell *tsHeaderCellDef>
    Username
  </ts-header-cell>

  <ts-cell *tsCellDef="let item">
    {{ item.username }}
  </ts-cell>
</ng-container>
```


##### 2. Define the table's rows

After defining your columns, provide the header and data row templates that will be rendered out by
the table. Each row needs to be given a list of the columns that it should contain. The order of the
names will define the order of the cells rendered.

It is not required to provide a list of all the defined column names, but only the ones that you
want to have rendered.

```html
<ts-header-row *tsHeaderRowDef="['userName', 'age']">
</ts-header-row>

<!-- `let row;` is  exposing the row data to the template as the variable `row` -->
<ts-row *tsRowDef="let row; columns: ['userName', 'age']">
</ts-row>
```


##### 3. Provide data

The column and row definitions now capture how data will render - all that's left is to provide the
data itself.

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

An interface for your table item can be passed to `TsTableDataSource` for stricter typing:

```typescript
export interface MyTableItem {
  name: string;
  id: number;
}

this.myDataSource: TsTableDataSource<MyTableItem> = new TsTableDataSource(INITIAL_DATA)
```


##### 4. Full HTML example

```html
<!-- Pass in the dataSource -->
<ts-table [dataSource]="myDataSource">

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
  <ts-header-row *tsHeaderRowDef="displayedColumns" fxLayout="row">
  </ts-header-row>

  <!-- Define the table's body row(s) -->
  <ts-row *tsRowDef="let row; columns: displayedColumns;" fxLayout="row">
  </ts-row>

</ts-table>
```


### Dynamically update table data

Your data source was created during the bootstraping of your component:

```typescript
this.myDataSource = new TsTableDataSource();
```

Simply assign the new data to `myDataSource.data`. The table will flush the old data and display the
new data:

```typescript
this.myDataSource.data = dataToRender;
```


### Dynamic columns

Enable dynamic columns using a `TsSelectComponent`:

```typescript
// Define a data source
this.myDataSource = new TsTableDataSource();

// Define all available columns (`TsSelectComponent` requires an array of objects)
allColumns = [
  {
    name: 'Username',
    myValue: 'username',
  },
  {
    name: 'Age',
    myValue: 'age',
  },
];
```

Both the `TsSelectComponent` and the `tsRowDef` `columns` input should reference the same `ngModel`
(`displayedColumns` in this example).

```html
<ts-select
  multipleAllowed="true"
  valueKey="myValue"
  [(ngModel)]="displayedColumns"
  [items]="allColumns"
  (open)="selectOpen($event)"
  (change)="selectChange($event)"
></ts-select>

<ts-table [dataSource]="myDataSource" tsSort>
  <!-- Custom column definitions excluded for brevity -->

  <!-- `displayedColumns` is referencing the same model as the `ts-select` -->
  <ts-header-row *tsHeaderRowDef="displayedColumns" fxLayout="row">
  </ts-header-row>

  <!-- `displayedColumns` is referencing the same model as the `ts-select` -->
  <ts-row *tsRowDef="let row; columns: displayedColumns;" fxLayout="row">
  </ts-row>

</ts-table>
```


### Sorting by column

To add sorting behavior to the table, add the `tsSort` directive to the `<ts-table>` and add
`ts-sort-header` to each column header cell that should trigger sorting. Provide the
`TsSortDirective` directive to the `TsTableDataSource` and it will automatically listen for sorting
changes and change the order of data rendered by the table.

By default, the `TsTableDataSource` sorts with the assumption that the sorted column's name matches
the data property name that the column displays. For example, the following column definition is
named `position`, which matches the name of the property displayed in the row cell.

```html
<!-- Add the `tsSort` directive to the table -->
<ts-table [dataSource]="myDataSource" tsSort>

  <!-- Name the column -->
  <ng-container tsColumnDef="position">
    <!-- Add the `ts-sort-header` directive -->
    <ts-header-cell *tsHeaderCellDef ts-sort-header>
      Position
    </ts-header-cell>

    <ts-cell *tsCellDef="let element">
      <!-- tsColumnDef is named to match the data item displayed here -->
      {{ element.position }}
    </ts-cell>
  </ng-container>

</ts-table>
```

In your class, get a reference to the `TsSortDirective` using `@ViewChild`:

```typescript
import { AfterViewInit } from '@angular/core';
import { TsSortDirective } from '@terminus/ui';

export class TableComponent implements AfterViewInit {
  // Get a reference to the TsSortDirective instance
  @ViewChild(TsSortDirective) sort: TsSortDirective;

  public ngAfterViewInit(): void {
    // Subscribe to the sortChange event to reset pagination, fetch new data, etc
    this.sort.sortChange.subscribe(() => {
      // Table was sorted - go get new data!
    });
  }
}
```


### Row selection

Possible but not implemented until a valid use-case arises.


### No-wrap for a column

Sometimes a column's content should not wrap even at small viewport sizes. Adding the directive
`noWrap="true"` to the column will keep then contents from wrapping regardless of the viewport
width.

```html
<!-- set noWrap on the column -->
<ng-container tsColumnDef="created" noWrap="true">
  <ts-header-cell *tsHeaderCellDef ts-sort-header>
    Created
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.created_at | date:shortDate }}
  </ts-cell>
</ng-container>
```


### Min-width for a column

Defining a minimum width for specific columns can help the layout not compress certain columns past
a readable point. Add the directive `minWidth` and pass it any valid CSS min-width value (`100px`,
`10%`, `12rem`, etc..).

```html
<!-- set minWidth on the column -->
<ng-container tsColumnDef="created" minWidth="100px">
  <ts-header-cell *tsHeaderCellDef ts-sort-header>
    Created
  </ts-header-cell>
  <ts-cell *tsCellDef="let item">
    {{ item.created_at | date:shortDate }}
  </ts-cell>
</ng-container>
```

---


### Full example with pagination, sorting and dynamic columns


```typescript
import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs/Observable';

import {
  TsTableDataSource,
  TsSortDirective,
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from '@terminus/ui';


@Component({
  selector: 'my-component',
  template: `
    <!-- Align the select to the right side -->
    <div fxLayout="row" fxLayoutAlign="end center">
      <ts-select
        label="Show/hide columns"
        multipleAllowed="true"
        valueKey="value"
        [(ngModel)]="displayedColumns"
        [items]="allColumns"
      ></ts-select>
    </div>


    <ts-table
      [dataSource]="dataSource"
      tsSort
      tsVerticalSpacing
    >

      <ng-container tsColumnDef="created" noWrap="true" minWidth="100px">
        <ts-header-cell *tsHeaderCellDef ts-sort-header>
          Created
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.created_at | date:shortDate }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="number" noWrap="true">
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

      <ng-container tsColumnDef="state" noWrap="true">
        <ts-header-cell *tsHeaderCellDef>
          State
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.state }}
        </ts-cell>
      </ng-container>

      <ng-container tsColumnDef="comments" noWrap="true">
        <ts-header-cell *tsHeaderCellDef ts-sort-header>
          Comments
        </ts-header-cell>
        <ts-cell *tsCellDef="let item">
          {{ item.comments }}
        </ts-cell>
      </ng-container>

      <ts-header-row *tsHeaderRowDef="displayedColumns">
      </ts-header-row>

      <ts-row *tsRowDef="let row; columns: displayedColumns;">
      </ts-row>

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
  allColumns: any[] = [
    {
      name: 'Created',
      value: 'created',
    },
    {
      name: 'Title',
      value: 'title',
    },
    {
      name: 'Comments',
      value: 'comments',
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
  displayedColumns: string[] = [
    'created',
    'number',
    'title',
    'state',
    'comments',
  ];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: TsTableDataSource = new TsTableDataSource();
  resultsLength: number = 0;

  @ViewChild(TsSortDirective)
  sort: TsSortDirective;

  @ViewChild(TsPaginatorComponent)
  paginator: TsPaginatorComponent;


  constructor(
    private http: HttpClient,
  ) {}

  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.currentPageIndex = 0;
    });

    // Fetch new data anytime the sort is changed, the page is changed, or the records shown per
    // page is changed
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

  getRepoIssues(sort: string, order: string, page: number, perPage: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:GetTerminus/terminus-ui`;
    const requestParams = `&sort=${sort}&order=${order}&page=${page + 1}&per_page=${perPage}`;

    return this.http.get<GithubApi>(`${requestUrl}${requestParams}`);
  }
}
```
