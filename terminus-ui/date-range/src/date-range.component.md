<h1>Date Range</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Event driven](#event-driven)
- [Date range boundaries](#date-range-boundaries)
- [Disabling](#disabling)
  - [Disable a control](#disable-a-control)
  - [Disable the component](#disable-the-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Pass in the form control:

```html
<form [formGroup]="myForm" novalidate>
  <ts-date-range [dateFormGroup]="myForm.get('dateRange')"></ts-date-range>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
myForm: FormGroup = this.formBuilder.group({
  // Showing a nested example since usually a date range would be nested in a group
  dateRange: this.formBuilder.group({
    startDate: [ // This control MUST be named `startDate`
      new Date(2017, 4, 6),
    ],
    endDate: [ // This MUST be named `endDate`
      new Date(2017, 4, 8),
    ],
  }),
});
```

**NOTE:** The keys inside the `formGroup` passed to the `dateFormGroup` input must be named
`startDate` and `endDate`. (see example directly above)

**NOTE:** If using a form with nested form groups, _each group_ must be created with
`formBuilder.group` for the form `get` control to work:

```typescript
// Notice the nested `dateRange` object without using `.group`
myForm: FormGroup = this.formBuilder.group({
  dateRange: {
    startDate: [
      new Date(2017, 4, 6),
    ],
    endDate: [
      new Date(2017, 4, 8),
    ],
  },
});

// THIS WILL FAIL!
const range = myForm.get('dateRange');

//////////////////////////////////////////////////

// Notice the nested `dateRange` object IS using `.group`
myForm: FormGroup = this.formBuilder.group({
  dateRange: this.formBuilder.group({
    startDate: [
      new Date(2017, 4, 6),
      [
        Validators.required,
      ],
    ],
    endDate: [
      new Date(2017, 4, 8),
      [
        Validators.required,
      ],
    ],
  }),
});

// Now there is a group for us to 'get'
const range = myForm.get('dateRange');
```


## Event driven

There are three selection events that you can tie into:

```html
<ts-date-range
  (startSelected)="myMethod($event)"
  (endSelected)="myMethod($event)"
  (change)="myMethod($event)"
></ts-date-range>
```

1. `startSelected` is fired when a start date is selected.
1. `endSelected` is fired when an end date is selected.
1. `change` is fired when the date range changes.


## Date range boundaries

To define bounds for date selection, pass in a valid `Date` to each of these `@Inputs`:

1. `endMaxDate`
1. `endMinDate`
1. `startMaxDate`
1. `startMinDate`

```html
<ts-date-range
  [startMinDate]="startDate1"
  [startMaxDate]="startDate2"
  [endMinDate]="endDate1"
  [endMaxDate]="endDate2"
></ts-date-range>
```

```typescript
startDate1 = new Date(2017, 1, 1);
startDate2 = new Date(2017, 8, 1);
endDate1 = new Date(2017, 1, 2);
endDate2 = new Date(2017, 8, 2;
```


## Disabling

### Disable a control

Controls can be enabled or disabled via the associated form control:

```typescript
myForm: FormGroup = this.formBuilder.group({
  dateRange: this.formBuilder.group({
    startDate: [
      {
        value: new Date(2017, 4, 6),
        disabled: true,
      },
    ],
    endDate: [
      new Date(2017, 4, 8),
    ],
  }),
});

// Enable it at any time:
const ctrl = this.myForm.get('dateRange.startDate')
if (ctr) {
  ctrl.enable();
}
```


### Disable the component

The entire component can be disabled:

```html
<ts-date-range [isDisabled]="true"></ts-date-range>
```
