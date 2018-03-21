<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Event driven](#event-driven)
- [Filter out invalid dates](#filter-out-invalid-dates)
- [Set max/min range](#set-maxmin-range)
- [Set the initial date without using Reactive Forms](#set-the-initial-date-without-using-reactive-forms)
- [Define a date that the calendar should open to](#define-a-date-that-the-calendar-should-open-to)
- [Use with Reactive Forms](#use-with-reactive-forms)
- [Example with dynamic validation](#example-with-dynamic-validation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Event driven

Each time a selection is made, the `selected` event is fired.

```html
<ts-datepicker
  (selected)="myMethod($event)"
></ts-datepicker>
```


## Filter out invalid dates

If, for instance, you need to prohibit weekend days (sat/sun) from being selected you can pass in a
custom method to filter dates:

```html
<ts-datepicker
  [dateFilter]="myFilter"
></ts-datepicker>
```

```typescript
myFilter = (d: Date): boolean => {
  const day = d.getDay();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
}
```


## Set max/min range

To define bounds for date selection, pass in a valid `Date` to `minDate` and/or `maxDate`:

```html
<ts-datepicker
  [minDate]="date1"
  [minDate]="date2"
></ts-datepicker>
```

```typescript
date1 = new Date(2017, 2, 1);
date2 = new Date(2017, 8, 1);
```


## Set the initial date without using Reactive Forms

Pass in a `Date` to `initialDate`:

```html
<ts-datepicker
  [initialDate]="myDate"
></ts-datepicker>
```

```typescript
myDate = new Date(2017, 1, 1);
```

> When using a Reactive Form, we can seed the initial value in the form itself


## Define a date that the calendar should open to

Pass in a `Date` to `openTo`:

```html
<ts-datepicker
  [openTo]="myDate"
></ts-datepicker>
```

```typescript
myDate = new Date(2017, 5, 12);
```


## Use with Reactive Forms

Pass in the form control:

```html
<form [formGroup]="myForm" novalidate>
  <ts-datepicker
    [formControl]="myForm.get('date')"
  ></ts-datepicker>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
myForm = this.formBuilder.group({
  date: [
    null, // If you need a default value, change this `null` to your value
    [
      Validators.required,
    ],
  ],
});
```

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


## Example with dynamic validation

We can recreate a version of the {@link TsDateRangeComponent} using dynamic validation:

```html
<form [formGroup]="myForm" novalidate>
  <ts-datepicker
    [formControl]="myForm.get('startDate')"
    (selected)="rangeStartChange($event)"
  ></ts-datepicker>

  <ts-datepicker
    [formControl]="myForm.get('endDate')"
    (selected)="rangeEndChange($event)"
  ></ts-datepicker>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
myForm = this.formBuilder.group({
  startDate: [
    null,
    [
      Validators.required,
    ],
  ],
  endDate: [
    null,
    [
      Validators.required,
    ],
  ],
});

// When the startDate changes, we want to set that date as the minDate for the endDate
rangeStartChange(event: MatDatepickerInputEvent) {
  if (event) {
    // Get the from control
    const control = this.formTwo.get('endDate');

    // Set all validators.
    // NOTE: setting validators will clear ALL existing validators, so we must add the required
    // validator here again
    control.setValidators([
      Validators.required,
      this.validatorsService.minDate(event.value),
    ]);
    // Tell the control to update according to the new validators
    control.updateValueAndValidity();
  }
}

// When the endDate changes, we want to set that date as the maxDate for the startDate
rangeEndChange(event: MatDatepickerInputEvent) {
  if (event) {
    // Get the from control
    const control = this.formTwo.get('startDate');

    // Set all validators.
    // NOTE: setting validators will clear ALL existing validators, so we must add the required
    // validator here again
    control.setValidators([
      Validators.required,
      this.validatorsService.maxDate(event.value),
    ]);
    // Tell the control to update according to the new validators
    control.updateValueAndValidity();
  }
}
```
