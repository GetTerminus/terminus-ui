<h1>Sort</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Adding sort to table headers](#adding-sort-to-table-headers)
- [Changing the sort order](#changing-the-sort-order)
- [Disabling sorting](#disabling-sorting)
- [Using sort with the `ts-table`](#using-sort-with-the-ts-table)
- [Accessibility](#accessibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Adding sort to table headers

To add sorting behavior and styling to a set of table headers, add `ts-sort-header` to each header
and provide an id that will identify it. These headers should be contained within a parent element
with the `tsSort` directive, which will emit a `sortChange` event when the user triggers sorting
on the header.

Users can trigger the sort header through a mouse click or keyboard action. When this happens, the
`tsSort` will emit an `sortChange` event that contains the ID of the header triggered and the
direction to sort (`asc` or `desc`).


## Changing the sort order

By default, a sort header starts its sorting at `asc` and then `desc`. Triggering the sort header
after `desc` will remove sorting.

To reverse the sort order for all headers, set the `tsSortStart` to `desc` on the `tsSort`
directive. To reverse the order only for a specific header, set the start input only on the header
instead.

To prevent the user from clearing the sort sort state from an already sorted column, set
`tsSortDisableClear` to true on the `tsSort` to affect all headers, or set `disableClear` to true on
a specific header.


## Disabling sorting

If you want to prevent the user from changing the sorting order of any column, you can use the
`tsSortDisabled` binding on the `ts-sort`, or the `disabled` on an single `ts-sort-header`.


## Using sort with the `ts-table`

When used on an `ts-table` header, it is not required to set an `ts-sort-header` id on because by
default it will use the id of the column.


## Accessibility

The `aria-label` for the sort button can be set in `TsSortHeaderIntl`.
