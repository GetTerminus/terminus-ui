import { noop } from '@terminus/ngx-tools/utilities';

/**
 * Expose an Amcharts service mock for consumers to use.
 */
export class AmChartsServiceMock {
  public get amCharts() {
    return {
      core: {
        color: noop,
        options: {},
        create: () => ({
          series: {
            clear: noop,
            push: () => ({
              dataFields: {},
              tooltip: { background: {} },
            }),
          },
          responsive: { enabled: false },
          colors: { list: [] },
          xAxes: {
            push: () => ({
              dataFields: {},
              renderer: {
                grid: { template: {} },
                labels: { template: {} },
              },
            }),
          },
          yAxes: {
            push: () => ({
              title: {},
              numberFormatter: {},
              tooltip: {},
            }),
          },
          dispose: noop,
        }),
      },
      charts: {
        CategoryAxis: noop,
        ValueAxis: noop,
        XYCursor: () => ({}),
        Legend: () => ({}),
        LineSeries: () => ({}),
        ColumnSeries: () => ({}),
        XYChart: {},
        PieChart: {},
        RadarChart: {},
        TreeMap: {},
        SankeyDiagram: {},
        ChordDiagram: {},
      },
      maps: { MapChart: {} },
    };
  }
}
