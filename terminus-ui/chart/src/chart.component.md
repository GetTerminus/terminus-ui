<h1>TsChart</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Inject the needed libraries](#inject-the-needed-libraries)
  - [Set up the chart](#set-up-the-chart)
- [Supported chart types](#supported-chart-types)
  - [Chart Type Coercion](#chart-type-coercion)
- [amCharts documentation](#amcharts-documentation)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

### Inject the needed libraries

> Note:  Since the end-user of this library is the one with the actual license to use amCharts, we let the consumer pass in the library.

Create a factory function to inject the needed libraries:

```typescript
import { TS_AMCHARTS_TOKEN, TsAmChartsToken } from '@terminus/ui/chart';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/animated';

// `core` and `charts` are always required.
// `maps` is required if using any map visualizations.
export function amChartsFactory(): TsAmChartsToken {
  return {
    core: am4core,
    charts: am4charts,
    maps: am4maps,
    themes: [am4themes_animated, am4themes_material],
  };
}

@NgModule({
  ...
  providers: [
    // Use the factory function to overwrite the `TS_AMCHARTS_TOKEN` injectable:
    {
      provide: TS_AMCHARTS_TOKEN,
      useFactory: amChartsFactory,
    },
  ],
  ...
```


> NOTE: Themes will be applied in the order they are provided.


### Set up the chart

Add the component and set up access to the generated chart:

```html
<ts-chart (chartInitialized)="setUpChart($event)"></ts-chart>
```

```typescript
setUpChart(chart: am4charts.Chart) {
  // Add axis' and series' etc...
}
```

> See the demo app for concrete examples of the supported chart types.


## Supported chart types

- `xy`
- `pie`
- `map`
- `radar`
- `tree`
- `sankey`
- `chord`

> See `TsChartVisualizationOptions` for all supported types.


### Chart Type Coercion

The library exposes functions for coercing to specific chart types:

- `tsChartXYTypeCheck`
- `tsChartPieTypeCheck`
- `tsChartMapTypeCheck`
- `tsChartRadarTypeCheck`
- `tsChartTreeTypeCheck`
- `tsChartSankeyTypeCheck`
- `tsChartChordTypeCheck`

Example:

```typescript
if (tsChartXYTypeCheck(chart)) {
  // Now we know we are dealing with an XY chart type
}
```


## amCharts documentation

See https://www.amcharts.com/docs/v4/ for full documentation.


## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/chart/testing`;

[[source]][test-helpers-src]

|        Function        |
|------------------------|
| `getChartDebugElement` |
| `getChartInstance`     |

|   Chart service mock    |
|-------------------------|
| `AmChartsServiceMock`   |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/chart/testing/src/test-helpers.ts
