<h1>Chart</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Initialize the Highcharts library](#initialize-the-highcharts-library)
- [Visualization](#visualization)
  - [Available visualizations](#available-visualizations)
- [Chart data](#chart-data)
  - [Zones](#zones)
- [Chart options](#chart-options)
  - [Tooltips](#tooltips)
  - [Axis'](#axis)
  - [Chart specific options](#chart-specific-options)
- [Specific chart types](#specific-chart-types)
  - [Map](#map)
    - [Available maps](#available-maps)
  - [Sparkline](#sparkline)
  - [Stock](#stock)
- [Events](#events)
  - [Chart events](#chart-events)
    - [Available chart events](#available-chart-events)
    - [`TsChartEvent`](#tschartevent)
  - [Series events](#series-events)
    - [Available series events](#available-series-events)
  - [Point events](#point-events)
    - [Available point events](#available-point-events)
- [Exporting](#exporting)
  - [Filename](#filename)
  - [Export failure](#export-failure)
- [Current options](#current-options)
- [Highcharts](#highcharts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Initialize the Highcharts library

Install the Highcharts library:

```bash
# Install library
yarn add highcharts

# Install typings
yarn add @types/highcharts -D
```

Create a factory function in the primary module:

```typescript
// NOTE: If you don't have the license for Highstock you can import only highcharts:
// import * as Highcharts from 'highcharts';

// Import highstock as highcharts (highstock includes everything highcharts does and then some)
import * as Highcharts from 'highcharts/highstock';

// This TypeScript declaration is most likely needed for Angular CLI projects:
declare var require: any;

// Define a function that extends the Highcharts library with all needed functionality:
export function highchartsFactory() {
  const hc = require('highcharts');
  // These are the extra modules this library expects:
  const loadMore = require('highcharts/highcharts-more');
  const loadStock = require('highcharts/modules/stock');
  const loadMap = require('highcharts/modules/map');
  const loadDrilldown = require('highcharts/modules/drilldown');
  const loadExporting = require('highcharts/modules/exporting');

  loadMore(hc);
  loadStock(hc);
  loadMap(hc);
  loadDrilldown(hc);
  loadExporting(hc);

  return hc;
}

@NgModule({
  imports: [
    ...
    // Import the charts module to your app
    TsChartModule,
  ],
  providers: [
    // Use the factory function to overwrite the `HIGHCHARTS` injectable.
    // This will tell the application to use the value from 'highchartsFactory'
    // for the value of the `HIGHCHARTS` injectable token.
    {
      provide: HIGHCHARTS,
      useFactory: highchartsFactory,
    },
  ],
  bootstrap: [MyComponent],
})
export class AppModule {}
```

Set your data inside your component:

```typescript
// my.component.ts
myData: TsChartData = [...];
```

In your HTML, pass in the data to display:

```html
<!-- my.component.html -->
<ts-chart [data]="myData"></ts-chart>
```

With no `visualization` set, the chart will default to `line`.


## Visualization

Set the `visualization` to generate specific chart types:

```html
<ts-chart
  visualization="area"
  [data]="myData"
></ts-chart>
```

```typescript
myData: TsChartData = [...];
```

### Available visualizations

Currently not all visualizations are supported via keywords.

Type: `TsChartVisualizationOptions`

1. `area`
1. `bar`
1. `bullet`
1. `column`
1. `line`
1. `map`
1. `mapbubble`
1. `pie`
1. `scatter`


## Chart data

Interfaces:

1. `TsChartData`
1. `TsChartDataItem`

Depending on the type of chart the data itself may be structured differently:

```typescript
// Data for a line chart with two lines
lineData: TsChartData = [
  // a single series
  {
    name: 'Installation'
    data: [43934, 52503, 57177, 69658],
  },
  // another series
  {
    name: 'Sales'
    data: [11744, 17722, 16005, 19771],
  },
];

// Data for a pie chart with three slices
pieData: TsChartData = [
  {
    name: 'Chrome',
    y: 66,
  },
  {
    name: 'Firefox',
    y: 20,
  },
  {
    name: 'Safari',
    y: 14,
  },
];

// Data for a scatter chart with two types
scatterData: TsChartData = [
  {
    name: 'Female',
    data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2]],
  },
  {
    name: 'Male',
    data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7]],
  }
];

// Data for a map with a single series
mapData: TsChartData = [
  {
    name: 'Country',
    data: [
      ['is', 1],
      ['no', 1],
      ['se', 1],
      ['dk', 1],
      ['fi', 1],
    ],
  },
];
```

See the interface `TsChartData` for all option documentation.


### Zones

Within the `TsChartDataItem` an array of zones can be defined. Each zone is defined by:

1. `color` - The series color.
1. `fillColor` - The series fill color.
1. `value` - The value to where the zone extends (undefined will stretch to the end).


## Chart options

Only a small subset of the available Highcharts API is made available to the core app via the
`TsChartOptions` interface. This was done to help enforce stylistic and experience decisions across
the consuming app.

Examples for a few common needs will be included below. For a full understanding of what is allowed
and what each option does, see the interface [`TsChartOptions`][chart-interfaces].

> Note: The options are not being pruned or sanitized in any way so in reality _any options may be
used_ by ignoring the interface requirements. **NO TERMINUS ENGINEERS SHOULD DO THIS.**


### Tooltips

`TsChartTooltip` defines the way in which you can customize the tooltip appearance.

1. `pointFormatter`: A function to format the HTML output for a single point in the tooltip. (see
   `TsChartLabelFormatterFn`)
1. `valuePrefix`: A string to prepend to each series `y` value.
1. `valueSuffix`: A string to append to each series `y` value.
1. `xDateFormat`: The format for the date in the header (if the `x` axis is a datetime string).


### Axis'

`TsChartAxis` defines the way in which you can customize the `x` or `y` axis.

1. `categories`: If categories are present for the axis, names are used instead of numbers.
1. `labels.formatter`: Customize the output for axis labels. (see `TsChartLabelFormatterFn`)
1. `plotBands`: Define colored bands stretching across the plot area. (see `TsChartAxisPlotBand`)
1. `title.text`: Define the axis title.
1. `type`: The axis type. (see `TsChartAxisType`).


### Chart specific options

Some charts allow specific options to be set for that specific series type.

**area, bar, column, line, pie**

`options.plotOptions[type].pointStart`: If no `x` values are given, this defines what value should
be the start.

**pie**

`options.plotOptions.pie.dataLables.formatter`: Format pie chart labels. (see
`TsChartLabelFormatterFn`)

**column**

`options.plotOptions.column.stacking`: Define the stacking context. (see `TsChartStacking`)

**map**

`options.map.joinBy`: What property to join the map data to the value data with.

**all**

`options.legend`: Disable or enable the legend.



## Specific chart types


### Map

To display a map-based chart, set the visualization to `map`:

```html
<ts-chart
  [data]="myData"
  visualization="map"
></ts-chart>
```

When the visualization is set to `map`, a specific map can be used by setting the map input:

```html
<ts-chart
  [data]="myData"
  visualization="map"
  map="europe"
></ts-chart>
```

If no map is set, a map of the United States will be used by default.


#### Available maps

Type: `TsChartMapTypes`

| Map                     | Map @Input Name  |
|-------------------------|------------------|
| Europe                  | `europe`         |
| North America           | `northAmerica`   |
| United States           | `usa`            |
| World (continents only) | `woldContinents` |
| World                   | `world`          |


### Sparkline

> A sparkline is a very small line chart, typically drawn without axes or coordinates. It presents
> the general shape of the variation (typically over time) in some measurement, such as temperature
> or stock market price, in a simple and highly condensed way.

Turn any chart into a sparkline with the `sparkline` flag:

```html
<ts-chart
  [data]="myData"
  sparkline="true"
></ts-chart>
```


### Stock

Stock charts typically have advanced filtering and timeline controls. To enable these controls set
the `addStockControls` input to true:

```html
<ts-chart
  [data]="myData"
  addStockControls="true"
></ts-chart>
```

**NOTE:** Not all charts will behave well with stock controls enabled (such as maps).


## Events

Chart events are available by default. Series and point events can be opted into via their
associated directives.

### Chart events

```html
<ts-chart
  [data]="myData"
  (create)="myCreateHandler($event)"
></ts-chart>
```

```typescript
myData: TsChartData = [...];

myCreateHandler(instance: TsChartObject) {
  console.log('My chart instance: ', instance);
}
```

#### Available chart events

| Event         | `$event` Type   |
|---------------|-----------------|
| `afterPrint`  | `TsChartEvent`  |
| `beforePrint` | `TsChartEvent`  |
| `click`       | `TsChartEvent`  |
| `create`      | `TsChartObject` |
| `drilldown`   | `TsChartEvent`  |
| `drillup`     | `TsChartEvent`  |
| `exportError` | `Error`         |
| `load`        | `TsChartEvent`  |
| `redraw`      | `TsChartEvent`  |
| `render`      | `TsChartEvent`  |
| `load`        | `TsChartEvent`  |
| `selection`   | `TsChartEvent`  |


#### `TsChartEvent`

Most chart events are created via this class and contain two items:

```html
<ts-chart
  [data]="myData"
  (mouseOver)="myMouseOverHandler($event)"
></ts-chart>
```

```typescript
myMouseOverHandler(e: TsChartEvent) {
  console.log('The original event: ', e.event);
  console.log('The chart context: ', e.context);
}
```

Currently there are only two emitted events that do not follow this structure:

1. `create` - Emitted event contains the current chart instance.
1. `exportError` - Emitted event contains the export error.


### Series events

To wire up events for the individual series, include the `ts-series` component as a child of the
`ts-chart` component:

```html
<ts-chart [data]="myData">
  <ts-series (hide)="myHideHandler($event)"></ts-series>
</ts-chart>
```

```typescript
myData: TsChartData = [...];

myHideHandler(e: TsChartEvent) {
  console.log('An individual series was hidden!');
}
```

#### Available series events

| Event             | `$event` Type  |
|-------------------|----------------|
| `afterAnimate`    | `TsChartEvent` |
| `checkboxClick`   | `TsChartEvent` |
| `click`           | `TsChartEvent` |
| `hide`            | `TsChartEvent` |
| `legendItemClick` | `TsChartEvent` |
| `mouseOut`        | `TsChartEvent` |
| `mouseOver`       | `TsChartEvent` |
| `show`            | `TsChartEvent` |


### Point events

To wire up events for the individual points, include the `ts-point` component as a child of the
`ts-series` component (which in turn should be a child of `ts-chart`):

```html
<ts-chart [data]="myData">
  <ts-series (hide)="myHideHandler($event)">
    <ts-point (select)="mySelectHandler($event)"></ts-point>
  </ts-series>
</ts-chart>
```

```typescript
myData: TsChartData = [...];

myHideHandler(e: TsChartEvent) {
  console.log('An individual series was hidden!');
}

mySelectHandler(e: TsChartEvent) {
  console.log('An individual point was selected!');
}
```


#### Available point events

| Event       | `$event` Type  |
|-------------|----------------|
| `click`     | `TsChartEvent` |
| `mouseOut`  | `TsChartEvent` |
| `mouseOver` | `TsChartEvent` |
| `remove`    | `TsChartEvent` |
| `select`    | `TsChartEvent` |
| `unselect`  | `TsChartEvent` |
| `update`    | `TsChartEvent` |


## Exporting

Exporting is enabled for all charts except when in [`sparkline`](#sparkline) display mode.

### Filename

The filename should be set to help the user remember what the exported chart contains.

```html
<ts-chart
  [data]="myData"
  exportFilename="q3-sales"
></ts-chart>
```

If no filename is set it will default to the visualization type (e.g. `column-chart`).


### Export failure

An event will be emitted if the export fails:

```html
<ts-chart
  [data]="myData"
  (exportError)="whoops($event)"
></ts-chart>
```

```typescript
myData: TsChartData = [...];

whoops(e: Event) {
  console.log('Export failed! ', e);
}
```


## Current options

When debugging it can be helpful to see what options were used to create the chart. The current
chart options are available as `chartOptions`:

```html
<ts-chart
  [data]="myData"
  #myChart="tsChart"
></ts-chart>
```

```typescript
myData: TsChartData = [...];

@ViewChild(TsChartComponent)
public myChart: TsChartComponent;

ngAfterViewInit() {
  console.log('Options: ', this.myChart.chartOptions);
}
```


## Highcharts

While the Termius UI library is [MIT licensed][license], the Highcharts library itself is not.
This is why the `TsChartModule` is designed in a way that allows the consumer to pass in the
Highcharts library rather than having the library included within the UI library.

Please visit the [Highcharts website] for license information.


<!-- LINKS -->

[chart-interfaces]: options.interface.ts
[highcharts]: https://www.highcharts.com/blog/products/highcharts/
[highcharts-maps]: http://code.highcharts.com/mapdata/
[license]: https://github.com/GetTerminus/terminus-ui/blob/master/LICENSE
