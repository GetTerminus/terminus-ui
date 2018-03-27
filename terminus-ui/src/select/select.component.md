<h1>Select</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Event driven](#event-driven)
- [Multiple selections](#multiple-selections)
- [Label](#label)
- [Hint](#hint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

```
<ts-select
  <!-- Pass in the select options -->
  [items]="items$ | async"
  <!-- Attach your form control -->
  [formControl]="myForm.get('myControl')"
  <!-- Pass in your UI formatter function -->
  [formatUIFn]="myUIFn"
  <!-- Pass in your model formatter function -->
  [formatModelValueFn]="myModelFn"
></ts-select>
```

```typescript
// Your select options
items: TsSelectItem[] = of([
  {
    name: 'Foo',
    slug: 'foo',
  },
  {
    name: 'Bar',
    slug: 'bar',
  },
  {
    name: 'Baz',
    slug: 'baz',
  },
]);
// The function to retrieve a value for the UI
myUIFn = (v: TsSelectItem): string => v.name;
// The function to retrieve a value for the model/form control
myModelFn = (v: TsSelectItem): string => v.slug;
```

## Event driven

You can tie into the `selectionChanged` event or the `openedChange` event:

```html
<ts-select
  ...
  (selectionChange)="mySelectionChange($event)"
  (openedChange)="myOpenedChange($event)"
></ts-select>
```

```typescript
mySelectionChange(e: TsSelectItem[]) {
  // This method will be called each time the `TsSelect`'s selection is changed.
  // The payload is the option selected.
}

myOpenedChange(e: boolean) {
  // This method will be called each time the `TsSelect` is opened or closed.
  // The payload is `true` when opened and `false` when closed
}
```


## Multiple selections

Allow multiple selections by setting `multipleAllowed` to `true`:

```html
<ts-select
  ...
  multipleAllowed="true"
></ts-select>
```


## Label

A label can be set by passing a string to `label`:

```html
<ts-select
  ...
  label="Country"
></ts-select>
```


## Hint

A hint can be set by passing a string to `hint`:

```html
<ts-select
  ...
  hint="Select a really cool option!"
></ts-select>
```

