<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Cohort Date Range](#cohort-date-range)
  - [Basic usage](#basic-usage)
  - [Event driven](#event-driven)
  - [Inputs to the component](#inputs-to-the-component)
    - [allowCustomDates](#allowcustomdates)
    - [Disable the component](#disable-the-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<h1>Cohort Date Range</h1>

## Basic usage

Pass in the cohorts:

```html
<ts-cohort-date-range
  [cohorts]="cohorts"
></ts-cohort-date-range>
```

```typescript
  public cohorts: TsDateCohort = [{
    display: 'Last full year',
    range: {
      start: new Date(2018, 01, 01),
      end: new Date(2018, 12, 31),
    },
  }, {
    display: 'Last full month',
    range: {
      start: new Date(2019, 08, 01),
      end: new Date(2019, 08, 31),
    },
  }, {
    display: 'Custom dates',
    range: {
      start: '',
      end: '',
    },
  }];
```

NOTE: The keys inside the passed in `cohorts` object defined as `TsDateCohort` interface has to be in the form of 
```typescript
  display: string,
  range: {
   start: Date | string,
   end: Date | string,
   }
```

NOTE: For any custom dates which allows user to select a date from date 
range selection would need to pass in start and end date with empty string:
```typescript
{
  display: 'Custom Dates',
  range: {
    start: '',
    end: '',
  }
}
```

## Event driven

The event that's tied into this component is `cohortDateRangeChanged`.

```html
<ts-cohort-date-range
  [cohorts]="cohorts"
  (cohortDateRangeChanged)="printRange($event)"
></ts-cohort-date-range>
```

`cohortDateRangeChanged` is fired off when the date range changes.

## Inputs to the component

### allowCustomDates

`allowCustomDates` defaults to `true`. When set to `false`, date range is readonly.
```html
<ts-cohort-date-range
  [allowCustomDates]="allowCustomDates"
  [cohorts]="cohorts"
></ts-cohort-date-range>
```

### Disable the component

The entire component can be disabled:

```html
<ts-cohort-date-range
 [isDisabled]="true"
></ts-cohort-date-range>
```
