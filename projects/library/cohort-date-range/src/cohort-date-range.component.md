<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Cohort Date Range](#cohort-date-range)
  - [Basic usage](#basic-usage)
    - [Defaulting to a specific cohort](#defaulting-to-a-specific-cohort)
  - [Event driven](#event-driven)
  - [Inputs to the component](#inputs-to-the-component)
    - [allowCustomDates](#allowcustomdates)
  - [Date range boundaries](#date-range-boundaries)
    - [Disable](#disable)
  - [Test Helpers](#test-helpers)

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
```typescript
cohorts: TsDateCohort[] = [
  {
    display: 'Last full year',
    range: {
      start: new Date(2018, 1, 1),
      end: new Date(2018, 12, 31),
    },
  },
  {
    display: 'Last full month',
    range: {
      startDate: new Date(2019, 8, 1),
      endDate: new Date(2019, 8, 31),
    },
  },
];
```

The keys inside the passed in `cohorts` object must match the `TsDateCohort` interface:

```typescript
{
  active?: boolean;
  display: string,
  range: {
    start: Date | string,
    end: Date | string,
  }
}
```

### Defaulting to a specific cohort

The first `TsDateCohort` that has the `active` key set to `true` will be selected by default.

```typescript
```typescript
cohorts: TsDateCohort[] = [
  {
    display: 'Last full year',
    range: {
      start: new Date(2018, 1, 1),
      end: new Date(2018, 12, 31),
    },
  },
  {
    active: true, // Now this cohort will be selected on load!
    display: 'Last full month',
    range: {
      start: new Date(2019, 8, 1),
      end: new Date(2019, 8, 31),
    },
  },
];
```

## Event driven

Anytime the date range is changed, `cohortDateRangeChanged` is emitted.

```html
<ts-cohort-date-range
  [cohorts]="myCohorts"
  (cohortDateRangeChanged)="printRange($event)"
></ts-cohort-date-range>
```


## Inputs to the component

### allowCustomDates

When `allowCustomDates` is set to `false`, the date range is readonly (this defaults to `true`).

```html
<ts-cohort-date-range
  [allowCustomDates]="false"
  [cohorts]="cohorts"
></ts-cohort-date-range>
```

NOTE: When set to `true`, a `Custom Dates` option will be added to the dropdown.


## Date range boundaries

To define bounds for custom date selection, pass in a valid `Date` to each of these `@Inputs`:

1. `endMaxDate`
1. `endMinDate`
1. `startMaxDate`
1. `startMinDate`

```html
<ts-cohort-date-range
  [startMinDate]="startDate1"
  [startMaxDate]="startDate2"
  [endMinDate]="endDate1"
  [endMaxDate]="endDate2"
></ts-cohort-date-range>
```

```typescript
startDate1 = new Date(2017, 1, 1);
startDate2 = new Date(2017, 8, 1);
endDate1 = new Date(2017, 1, 2);
endDate2 = new Date(2017, 8, 2;
```


### Disable

The entire component can be disabled:

```html
<ts-cohort-date-range
 [isDisabled]="true"
></ts-cohort-date-range>
```

## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/cohort-date-range/testing`;

[[source]][test-helpers-src]

| Function                |
|------------------------|
| `getCohortDebugElement` |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/cohort-date-range/testing/src/test-helpers.ts
