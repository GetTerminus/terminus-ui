<h1>Date Range</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Event driven](#event-driven)
- [Set max/min range](#set-maxmin-range)
- [Set the initial date without using Reactive Forms](#set-the-initial-date-without-using-reactive-forms)
- [Use with Reactive Forms](#use-with-reactive-forms)
- [Enable or Disable controls](#enable-or-disable-controls)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Event driven

There are three selection events that you can tie into:

```html
<ts-date-range
  (startSelected)="myMethod($event)"
  (endSelected)="myMethod($event)"
  (dateSelected)="myMethod($event)"
></ts-date-range>
```

1. `startSelected` is fired when a start date is selected
1. `endSelected` is fired when an end date is selected
1. `dateSelected` is fired when either date is selected


## Set max/min range

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


## Set the initial date without using Reactive Forms

Pass in a `Date` to `startInitialDate` and `endInitialDate`:

```html
<ts-date-range
  [startInitialDate]="date1"
  [endInitialDate]="date2"
></ts-date-range>
```

```typescript
date1 = new Date(2017, 1, 1);
date2 = new Date(2017, 3, 1);
```

> When using a Reactive Form, we can seed the initial values in the form itself


## Use with Reactive Forms

Pass in the form control:

```html
<form [formGroup]="myForm" novalidate>
  <ts-date-range
    [dateFormGroup]="myForm.get('dateRange')"
  ></ts-date-range>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
myForm: FormGroup = this.formBuilder.group({
  // Showing a nested example since usually a date range would be nested in a group
  dateRange: this.formBuilder.group({
    startDate: [ // This MUST be the name of the range start control
      new Date(2017, 4, 6),
    ],
    endDate: [ // This MUST be the name of the range end control
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


## Enable or Disable controls

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
