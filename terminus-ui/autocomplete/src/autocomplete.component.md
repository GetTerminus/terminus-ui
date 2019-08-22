<h1>Autocomplete</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage with a FormControl](#basic-usage-with-a-formcontrol)
- [Duplicate selections](#duplicate-selections)
- [Keep Panel Open After Selection](#keep-panel-open-after-selection)
- [Debouncing](#debouncing)
- [Minimum Characters](#minimum-characters)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage with a FormControl

a) Pass an array of available options in. These are the options displayed to the user in the
   dropdown.

b) Create a local reference to the autocomplete component.

```html
<ts-autocomplete
  [showProgress]="inProgress"
>
 <ts-option
    [value]="state"
    [option]="state"
    *ngFor="let state of states | async"
  >
    {{ state.name }}
  </ts-option>
</ts-autocomplete>
```

c) Subscribe to the `query` events coming from the autocomplete. This is a stream of query strings
entered by the user. This stream is debounced and de-duped by default.


## Duplicate selections

By default, duplicate selections are ignored. They can be allowed via a flag:

```html
<ts-autocomplete
  [formControl]="myCtrl"
  [allowMultiple]="true"
  [allowDuplicateSelections]="true"
>
  ...
</ts-autocomplete>
```


## Keep Panel Open After Selection

By default, the panel will close after each selection. It can be forced to stay open via a flag.

> NOTE: While the panel seems to stay open, it is actually closing and reopening immediately. That is why the `@Input` is named
`reopenAfterSelection`

```html
<ts-autocomplete
  [formControl]="myCtrl"
  [allowMultiple]="true"
  [reopenAfterSelection]="true"
>
  ...
</ts-autocomplete>
```


## Debouncing

By default, the autocomplete input query will be debounced 200ms. This time may be adjusted as needed:

```html
<ts-autocomplete
  [formControl]="myCtrl"
  [debounceDelay]="400"
>
  ...
</ts-autocomplete>
```


## Minimum Characters

By default, at least two characters must be typed before the query is fired. This limit may be adjusted:

```html
<ts-autocomplete
  [formControl]="myCtrl"
  [minimumCharacters]="4"
>
  ...
</ts-autocomplete>
```

## Formatting options
```html
<ts-autocomplete
  [formControl]="myCtrl"
  [displayFormatter]="formatDisplay"
  [valueComparator]="compareValues"
>
  ...
</ts-autocomplete>
```

## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/autocomplete/testing`;

[[source]][test-helpers-src]

| Function                           |
|------------------------------------|
| `getAllAutocompleteDebugElements`  |
| `getAutocompleteInstance`          |
| `getAutocompleteElement`           |
| `getAutocompleteTriggerElement`    |
| `getAllOptionInstances`            |
| `getOptionInstance`                |
| `getOptionElement`                 |
| `getAllOptgroups`                  |
| `getOptgroup`                      |
| `getOptgroupElement`               |
| `getAutocompleteInput`             |
| `getAllChipInstances`              |
| `getChipInstance`                  |
| `getChipElement`                   |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/autocomplete/testing/src/test-helpers.ts
