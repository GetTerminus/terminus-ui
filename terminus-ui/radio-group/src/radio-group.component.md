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
- [Visual mode](#visual-mode)
  - [Small](#small)
  - [Centered Content](#centered-content)
  - [Custom content](#custom-content)
- [Test Helpers](#test-helpers)

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
  (selectionChange)="selected($event)"
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
  [isDisabled]="true"
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


## Visual mode

Visual mode displays radio options as large clickable areas containing content.

Enable by setting the `isVisual` flag:

```html
<ts-radio-group
  [isVisual]="true"
  ...
></ts-radio-group>
```

### Small

For a smaller clickable area, use the `small` flag. This sets the visual radio buttons to 13.75rem x 7rem.

_Note_ The maximum content should be a title with two lines and body with 3 lines

```html
<ts-radio-group
  [isVisual]="true"
  [small]="true"
  ...
></ts-radio-group>
```

### Centered Content

By default the content is centered when in visual mode. Setting `centeredContent` to `false` will use standard top/left alignment.

```html
<ts-radio-group
  [isVisual]="true"
  [centeredContent]="true"
  ...
></ts-radio-group>
```

### Custom content

`TsRadioOption` now accepts an optional `template` key with a string template:

```typescript
items$: Observable<TsRadioOption[]> = of([
  {
    foo: 'foo_value',
    bar: 'Foo Display',
    template: `<a href="${this.myLink}">My link!</a>`
  },
  {
    foo: 'bar_value',
    bar: 'Bar Display',
    // if no template is defined, it will fall back to `formatUILabelFn` for the display value
  },
  {
    foo: 'baz_value',
    bar: 'Baz Display',
    template: `<h3>Hi!</h3> <p>Here is a thing!</p>`
  },
]);
```

```html
<ts-radio-group
  [isVisual]="true"
  [options]="items$ | async"
  [formControl]="myForm.get('myRadioGroup')"
  [formatUILabelFn]="uiFormatter"
  [formatModelValueFn]="modelFormatter"
></ts-radio-group>
```


## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/radio-group/testing`;

[[source]][test-helpers-src]

| Function                     |
|------------------------------|
| `getAllRadioGroupInstances`  |
| `getRadioGroupInstance`      |
| `getRadioGroupParentElement` |
| `selectStandardRadio`        |
| `selectVisualRadio`          |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/radio-group/testing/src/test-helpers.ts
