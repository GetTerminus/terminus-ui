<h1>Radio Group</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Sub-labels](#sub-labels)
- [Event driven](#event-driven)
- [Required](#required)
- [Disabled](#disabled)
  - [Disabled option](#disabled-option)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Pass in:

1. an array of items
1. a form control
1. a formatter function to determine the UI display value
1. a formatter function to determine the model value

```html
<form [formGroup]="myForm" novalidate>
  <ts-radio-group
    [options]="items$ | async"
    [formControl]="myForm.get('myRadioGroup')"
    [formatUILabelFn]="uiFormatter"
    [formatModelValueFn]="modelFormatter"
  ></ts-radio-group>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
// Define items to be passed to the radio group
items$: Observable<TsRadioOption[]> = of([
  {
    foo: 'foo_value',
    bar: 'Foo Display',
    bing: 'Some helper text for my item',
  },
  {
    foo: 'bar_value',
    bar: 'Bar Display',
    bing: 'Some helper text for my item',
    disabled: true,
  },
  {
    foo: 'baz_value',
    bar: 'Baz Display',
    bing: 'Some helper text for my item',
  },
]);

// Create a form
myForm = this.formBuilder.group({
  myRadioGroup: [null],
});

// Use the 'bar' value as the UI display
uiFormatter = (v) => v.bar;
// use the 'foo' value to save to the model
modelFormatter = (v) => v.foo;
```

> NOTE: Since we can set the default value in the form control, we no longer need to add the
> `checked` property to any or our items.


## Sub-labels

Passing a formatter function to `formatUISubLabelFn` will enable sub-label support:

```html
<ts-radio-group
  [options]="items$ | async"
  [formControl]="myForm.get('myRadioGroup')"
  [formatUISubLabelFn]="uiSubFormatter"
  [formatUILabelFn]="uiFormatter"
  [formatModelValueFn]="modelFormatter"
></ts-radio-group>
```

```typescript
// Use the 'bing' value as a sub-label
uiSubFormatter = (v) => v.bing;
// Use the 'bar' value as the UI display
uiFormatter = (v) => v.bar;
// use the 'foo' value to save to the model
modelFormatter = (v) => v.foo;
```


## Event driven

Listen for change events:

```html
<ts-radio-group
  [options]="items$ | async"
  (change)="selected($event)"
></ts-radio-group>
```


## Required

To define the radio group as 'required', set the required validator on the form group:

```typescript
myForm = this.formBuilder.group({
  myRadioGroup: [
    null,
    [
      Validators.required,
    ],
  ],
});
```


## Disabled

To disable the entire radio group, set `isDisabled` to true:

```html
<ts-radio-group
  [options]="items$ | async"
  [formControl]="myForm.get('myRadioGroup')"
  [formatUISubLabelFn]="uiSubFormatter"
  [formatUILabelFn]="uiFormatter"
  [formatModelValueFn]="modelFormatter"
  isDisabled="true"
></ts-radio-group>
```

### Disabled option

To disabled only a single option, define the `disabled` key on the item object:

```typescript
// Define items to be passed to the radio group
items$: Observable<TsRadioOption[]> = of([
  {
    foo: 'foo_value',
    bar: 'Foo Display',
  },
  {
    foo: 'bar_value',
    bar: 'Bar Display',
    disabled: true, // This radio option will be disabled
  },
  {
    foo: 'baz_value',
    bar: 'Baz Display',
  },
]);
```

