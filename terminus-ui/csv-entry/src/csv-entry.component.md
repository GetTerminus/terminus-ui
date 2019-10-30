<h1>csv-entry</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Column Count](#column-count)
  - [Row count](#row-count)
  - [Max rows](#max-rows)
- [Column validation](#column-validation)
- [Static Column Headers](#static-column-headers)
- [Full Width Table](#full-width-table)
- [Custom footer content](#custom-footer-content)
- [Footer direction](#footer-direction)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

The most basic implementation only needs the HTML and a single method. Each time the CSV table is updated, a new File Blob is generated and
emitted.

```html
<ts-csv-entry (blobGenerated)="myFunc($event)">
</ts-csv-entry>
```

```typescript
myFunc(blob: Blob) {
  ...
}
```


### Column Count

Control the default column count via an Input:

```html
<ts-csv-entry [columnCount]="7">
  <!-- Will generate a table with 7 columns -->
</ts-csv-entry>
```

> NOTE: Column count does not restrict what is pasted into the table.


### Row count

Control the default number of rows via an Input:

```html
<ts-csv-entry [rowCount]="5">
  <!-- Will generate a table with 5 rows -->
</ts-csv-entry>
```

> NOTE: Row count does not restrict what is pasted into the table.


### Max rows

Control the maximum number of rows a table will allow

```html
<ts-csv-entry [maxRows]="100">
</ts-csv-entry>
```

If the user attempts to paste or manually add more rows than are allowed, a validation message will appear below the table.


## Column validation

> NOTE: Currently, custom validation messaging is only supported for the URL validator. More will be added as needs arise.

Pass in an array of validators matching the column count.

```typescript
myValidators = [null, this.validatorsService.url(), null, null];
```

```html
<ts-csv-entry [columnCount]="4" [columnValidators]="myValidators">
</ts-csv-entry>
```

This example would add the URL validation to the second column only.


## Static Column Headers

If there are certain headers that must be available, these can be set via an input:

```html
<ts-csv-entry [columnHeaders]="['Header One', 'Header Two']">
</ts-csv-entry>
```

Setting static column headers will set the header cells to `readonly`. This will still allow keyboard navigation but will not allow the user
to change the contents of the set header cells.

## Full Width Table
If the table should be one full-width column, set both in the input:

```html
<ts-csv-entry [columnCount]="1" [fullWidth]="true">
</ts-csv-entry>
```
> NOTE: full width should only be with one column

## Custom footer content

Consumer's can add custom footer content by enclosing it within the CSVEntry component:

```html
<ts-csv-entry>
  <button>My custom footer button!</button>
</ts-csv-entry>
```

This content will be added opposite the default footer buttons set.


## Footer direction

The footer layout defaults to `ltr` mode which lays out the default buttons on the left and any custom content on the
right. This can be reversed by the `footerDirection` input.

```html
<ts-csv-entry footerDirection="rtl">
</ts-csv-entry>
```

Allowed directions are: `ltr`, `rtl`.

