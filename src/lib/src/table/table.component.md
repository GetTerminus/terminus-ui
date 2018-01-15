### Basic usage


##### 1. Define the table's columns

Define the table's columns. Each column definition should be given a unique name and contain the
content for its header and row cells.

Here's a simple column definition with the name 'userName'. The header cell contains the text "Name"
and each row cell will render the name property of each row's data.

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

<!-- `let row;` is telling the table to expose the row data to the template as the variable `row` -->
<ts-row *tsRowDef="let row; columns: ['userName', 'age']">
</ts-row>
```


##### 3. Provide data

The column and row definitions now capture how data will render - all that's left is to provide the
data itself.

For simple scenarios with client-side operations, `TsTableDataSource` offers a quick and easy
starting point. Simply create an instance of `TsTableDataSource` and set the items to be displayed
to the `data` property. For more advanced scenarios, applications will implement one or more custom
`DataSource` to capture more specific behaviors.

```typescript
this.myDataSource = new TsTableDataSource();
this.myDataSource.data = dataToRender;
```

```html
<ts-table [dataSource]=”myDataSource”>
  ...
</ts-table>
```

You can also seed the `DataSource` with initial data:

```typescript
this.myDataSource = new TsTableDataSource(INITIAL_DATA);
```

You can pass an interface for your table item to `TsTableDataSource` for stricter typing:

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

Simply assign the new data to `myDataSource.data`:

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
`ts-sort-header` to each column header cell that should trigger sorting. Provide the `TsSort`
directive to the `TsTableDataSource` and it will automatically listen for sorting changes and change
the order of data rendered by the table.

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
      Name
    </ts-header-cell>

    <ts-cell *tsCellDef="let element">
      {{ element.position }}
    </ts-cell>
  </ng-container>

</ts-table>
```

In your class, get a reference to the sort using `@ViewChild` and assign that reference to
`myDataSource.sort`:

```typescript
import { AfterViewInit } from '@angular/core';

export class TableComponent implements AfterViewInit {
  // Create your data source
  myDataSource = new TsTableDataSource(DATA_MOCK);

  // Get a reference to the directive instance
  @ViewChild(TsSortDirective) sort: TsSortDirective;

  public ngAfterViewInit(): void {
    // Assign the reference to our data source
    this.myDataSource.sort = this.sort;
  }
}
```




If the data properties do not match the column names, or if a more complex data property accessor is
required, then a custom `sortingDataAccessor` function can be set to override the default data
accessor on the `TsTableDataSource`.


### Filtering

Possible but should be handled on the server.


### Row selection

Possible but not fully implemented until a valid use-case arises.

