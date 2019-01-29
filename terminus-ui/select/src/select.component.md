<h1>Select</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Label](#label)
  - [Hint](#hint)
  - [FormControl](#formcontrol)
  - [ngModel](#ngmodel)
  - [Custom compare function](#custom-compare-function)
  - [Optgroups](#optgroups)
  - [Disabled](#disabled)
    - [By Input](#by-input)
    - [By FormControl](#by-formcontrol)
    - [Disabled Option](#disabled-option)
    - [Disabled Optgroup](#disabled-optgroup)
  - [Required](#required)
    - [By Input](#by-input-1)
    - [By FormControl](#by-formcontrol-1)
  - [Placeholder](#placeholder)
  - [Custom Trigger Value](#custom-trigger-value)
  - [Blank Option](#blank-option)
  - [Option Template](#option-template)
  - [Custom View Value](#custom-view-value)
  - [Multiple Selections](#multiple-selections)
  - [Custom Delimiter](#custom-delimiter)
  - [Custom Sort Comparator](#custom-sort-comparator)
  - [Filterable](#filterable)
- [Autocomplete](#autocomplete)
  - [Duplicate selections](#duplicate-selections)
  - [Keep Panel Open After Selection](#keep-panel-open-after-selection)
  - [Debouncing](#debouncing)
  - [Minimum Characters](#minimum-characters)
  - [Progress Indicator](#progress-indicator)
- [Events](#events)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

The most basic usage is by wrapping one or more `ts-select-option`s inside an `ts-select`:

```html
<!-- Define the option value by passing a property to the option's `value` input -->
<ts-select>
  <ts-select-option
    *ngFor="let item of items"
    [value]="item.value"
  >{{ item.name }}</ts-select-option>
</ts-select>
```


### Label

Define a label on the select:

```html
<ts-select label="My cool label!">
  ...
</ts-select>
```


### Hint

Define a hint on the select:

```html
<ts-select hint="Please select an option">
  ...
</ts-select>
```


### FormControl

To use a `FormControl` with the select, pass the control in:

```html
<ts-select [formControl]="myCtrl">
  ...
</ts-select>
```


### ngModel

To use `ngModel`, add the model to the select:

```html
<ts-select [(ngModel)]="myModel">
  ...
</ts-select>
```


### Custom compare function

If more refined control of how options are compared is needed, a custom comparator function can be used:

```html
<ts-select [compareWith]="compareByReference">
  ...
</ts-select>
```

```typescript
// Example comparing by reference:
compareByReference(f1: any, f2: any) { return f1 === f2; }

// Example comparing by value:
compareByValue(f1: any, f2: any) { return f1 && f2 && f1.text === f2.text; }
```

```typescript
TsSelectOptionCompareWith = (o1: any, o2: any) => boolean;
```


### Optgroups

Optgroups can be used by wrapping one or more options inside an optgroup component:

```html
<ts-select>
  <ts-select-optgroup
    *ngFor="let group of itemsWithGroups"
    [label]="group.myLabel"
  >
    <ts-select-option
      *ngFor="let child of group.children"
      [value]="child.slug"
    >{{ child.foo }}</ts-select-option>
  </ts-select-optgroup>
</ts-select>
```


### Disabled

The entire select can be disabled in one of two ways:

#### By Input

```html
<ts-select isDisabled="true">
  ...
</ts-select>
```

#### By FormControl

```typescript
myCtrl = new FormControl({value: null, disabled: true});
```

```html
<ts-select [formControl]="myCtrl">
  ...
</ts-select>
```


#### Disabled Option

Individual options may also be disabled:

```html
<ts-select>
  <ts-select-option
    *ngFor="let option of options"
    [value]="option.value"
    [isDisabled]="option.disabled" <!-- Disabled when true -->
  >{{ option.name }}</ts-select-option>
</ts-select>
```


#### Disabled Optgroup

Entire optgroups can be disabled just like options. When an optgroup is disabled, all options that are children of that optgroup
are also disabled.

```html
<ts-select>
  <ts-select-optgroup
    *ngFor="let group of itemsWithGroups"
    [label]="group.myLabel"
    [isDisabled]="option.disabled" <!-- Disabled when true -->
  >
    <ts-select-option
      *ngFor="let child of group.children"
      [value]="child.slug"
    >{{ child.foo }}</ts-select-option>
  </ts-select-optgroup>
</ts-select>
```


### Required

The entire select can be marked required in one of two ways:

#### By Input


```html
<ts-select [isRequired]="true">
  ...
</ts-select>
```

#### By FormControl

```typescript
myCtrl = new FormControl(null, Validators.required);
```

```html
<ts-select [formControl]="myCtrl">
  ...
</ts-select>
```


### Placeholder

The placeholder is used for the trigger value when the control or model value is empty.

```html
<ts-select placeholder="Please make a selection.">
  ...
</ts-select>
```


### Custom Trigger Value

Custom HTML can be used for the trigger value by using the `ts-select-trigger` component. This trigger will be shown when the control or
model does have value.

```html
<ts-select>
  <!-- Here is my custom trigger! -->
  <ts-select-trigger>
    My custom trigger!
    With <strong>custom</strong> HTML!
  </ts-select-trigger>

  <ts-select-option
    [value]="option.value"
    *ngFor="let option of options"
  >{{ option.name }}</ts-select-option>
</ts-select>
```


### Blank Option

A blank option can be implemented by adding a `ts-select-option` with no value:

```html
<ts-select [formControl]="myForm.get('myChoices1')">
  <ts-select-option>
    None
  </ts-select-option>

  <ts-select-option
    [value]="option.value"
    *ngFor="let option of options"
  >{{ option.name }}</ts-select-option>
</ts-select>
```


### Option Template

A custom template can be used for the option content.

> NOTE: The option object *must* be passed into the option when using a custom template

```html
<ts-select>
  <ts-select-option
    *ngFor="let option of options"
    [value]="option.value"
    [option]="option"
  >
    <!-- The object you pass to the `option` input will be exposed as `option` in the template -->
    <ng-template let-option>
      <div class="myClass">
        <h4>{{ option.name }}</h4>
        <small>{{ option.value / 100 }}%</small>
      </div>
    </ng-template>
  </ts-select-option>
</ts-select>
```


### Custom View Value

Part of the option view can be defined as the 'view value' which is used to define the `title` attribute for the option:

```html
<ts-select>
  <ts-select-option
    *ngFor="let option of options"
    [value]="option.value"
    [option]="option"
  >
    <ng-template let-option>
      <div class="myClass">
        <!-- The content of this h4 will be used for the option title -->
        <h4 tsSelectOptionDisplay>{{ option.name }}</h4>
        <small>{{ option.value / 100 }}%</small>
      </div>
    </ng-template>
  </ts-select-option>
</ts-select>
```


### Multiple Selections

Allow multiple selections via an `@Input`:

```html
<ts-select [allowMultiple]="true">
  ...
</ts-select>
```

This will show checkboxes next to each option and include a top-level 'Select All' toggle.


### Custom Delimiter

The delimiter is used to separate multiple options when shown in the trigger. By default this is a comma (`,`). A custom delimiter may also
be set:

```html
<ts-select
  [allowMultiple]="true"
  delimiter="/"
>
  ...
</ts-select>
<!-- Standard output: `foo, bar, baz` -->
<!-- Output with custom delimiter: `foo/ bar/ baz` -->
```


### Custom Sort Comparator

By default, the selections will be stored in the order matching the order of items passed in. A custom sort comparator may be passed in
to alter the sort order.

```html
<ts-select [sortComparator]="myComparatorFn">
  ...
</ts-select>
```

The comparator function type is `TsSelectSortComparatorFunction` and has the following format:

```typescript
type TsSelectSortComparatorFunction = (
  a: TsSelectOptionComponent,
  b: TsSelectOptionComponent,
  options: TsSelectOptionComponent[],
) => number;
```


### Filterable

A select can include an input at the top of the list to filter options:

```html
<ts-select
  [formControl]="myCtrl"
  [isFilterable]="true"
  (queryChange)="mySearchFunction($event)"
>
  ...
</ts-select>
```

Any unique, debounced query will be emitted through the `queryChange` emitter. The consumer is in control of what options are displayed. A
blank option can be used to show the user a message when no items are found by the query.


## Autocomplete

Enable autocomplete functionality by setting the `autocomplete` flag to `true`:

```html
<ts-select [autocomplete]="true">
  ...
</ts-select>
```


### Duplicate selections

By default, duplicate selections are ignored. They can be allowed via a flag:

```html
<ts-select
  [formControl]="myCtrl"
  [autocomplete]="true"
  [allowMultiple]="true"
  [autocompleteAllowDuplicateSelections]="true"
>
  ...
</ts-select>
```


### Keep Panel Open After Selection

By default, the panel will close after each selection. It can be forced to stay open via a flag.

> NOTE: While the panel seems to stay open, it is actually closing and reopening immediately. That is why the `@Input` is named
`autocompleteReopenAfterSelection`

```html
<ts-select
  [formControl]="myCtrl"
  [autocomplete]="true"
  [allowMultiple]="true"
  [autocompleteReopenAfterSelection]="true"
>
  ...
</ts-select>
```


### Debouncing

By default, the autocomplete input query will be debounced 200ms. This time may be adjusted as needed:

```html
<ts-select
  [formControl]="myCtrl"
  [autocomplete]="true"
  [debounceDelay]="400"
>
  ...
</ts-select>
```


### Minimum Characters

By default, at least two characters must be typed before the query is fired. This limit may be adjusted:

```html
<ts-select
  [formControl]="myCtrl"
  [autocomplete]="true"
  [minimumCharacters]="4"
>
  ...
</ts-select>
```


### Progress Indicator

A progress spinner can be shown while queries are happening in the background:

```html
<ts-select
  [formControl]="myCtrl"
  [autocomplete]="true"
  [showProgress]="true"
>
  ...
</ts-select>
```


## Events

Multiple events are fired during interaction with the select:

| Event                | Description                              | Payload          |
|:---------------------|:-----------------------------------------|:-----------------|
| `closed`             | Fired when the panel is closed           | `undefined`      |
| `duplicateSelection` | Fired when a duplicate selection is made | `string`         |
| `opened`             | Fired when the panel is open             | `undefined`      |
| `optionDeselected`   | Fired when an option is deselected       | `TsSelectChange` |
| `optionSelected`     | Fired when an option is selected         | `TsSelectChange` |
| `queryChange`        | Fired when autocomplete query changes    | `string`         |
| `selectionChange`    | Fired when the selection changes         | `TsSelectChange` |

```html
<ts-select (selectionChange)="myFunction($event)">
  ...
</ts-select>
```

The `TsSelectChange` structure:

```typescript
class TsSelectChange {
  constructor(
    // Reference to the select that emitted the change event
    public source: TsSelectComponent,
    // The current value
    public value: any,
  ) {}
}

```


## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/select/testing`;

| Function                  |
|---------------------------|
| `getSelectInstance`       |
| `getSelectElement`        |
| `getSelectTriggerElement` |
| `getToggleAllElement`     |
| `getPanelElement`         |
| `getAllOptionInstances`   |
| `getOptionInstance`       |
| `getOptionElement`        |
| `getAllOptgroups`         |
| `getOptgroup`             |
| `getOptgroupElement`      |
| `getAutocompleteInput`    |
| `getAllChipInstances`     |
| `getChipInstance`         |
| `getChipElement`          |
| `getFilterInputElement`   |
