
### Adding sort to table headers

To add sorting behavior and styling to a set of table headers, add the `<ts-sort-header>` component
to each header and provide an id that will identify it. These headers should be contained within a
parent element with the `tsSort` directive, which will emit a `tsSortChange` event when the user
triggers sorting on the header.

Users can trigger the sort header through a mouse click or keyboard action. When this happens, the
`tsSort` will emit an `tsSortChange` event that contains the ID of the header triggered and the
direction to sort (`asc` or `desc`).


### Changing the sort order

By default, a sort header starts its sorting at `asc` and then `desc`. Triggering the sort header
after `desc` will remove sorting.

To reverse the sort order for all headers, set the `tsSortStart` to `desc` on the `tsSort`
directive. To reverse the order only for a specific header, set the start input only on the header
instead.

To prevent the user from clearing the sort sort state from an already sorted column, set
`tsSortDisableClear` to true on the `tsSort` to affect all headers, or set `disableClear` to true on
a specific header.


### Disabling sorting

If you want to prevent the user from changing the sorting order of any column, you can use the
`tsSortDisabled` binding on the `ts-sort`, or the `disabled` on an single `ts-sort-header`.


### Using sort with the `ts-table`

When used on an `ts-table` header, it is not required to set an `ts-sort-header` id on because by
default it will use the id of the column.


### Accessibility

The `aria-label` for the sort button can be set in `TsSortHeaderIntl`.
