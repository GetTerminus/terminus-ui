import { TsChartEvent } from './../chart.event';
import { TsChartComponent } from './../chart.component';
import { TsChartSeriesDirective } from './../series.directive';
import { TsChartPointDirective } from './../point.directive';


const chartEvents: string[] = [
  // NOTE: 'click', works by default via Angular (click)
  'addSeries',
  'afterPrint',
  'beforePrint',
  'drilldown',
  'drillup',
  'load',
  'redraw',
  'render',
  'selection',
];

const seriesEvents: string[] = [
  'afterAnimate',
  'checkboxClick',
  'click',
  'hide',
  'legendItemClick',
  'mouseOut',
  'mouseOver',
  'show',
];

const pointEvents: string[] = [
  'click',
  'mouseOut',
  'mouseOver',
  'remove',
  'select',
  'unselect',
  'update',
];


/**
 * The structure for the event-only options object created by {@link attachEvents}
 */
export interface TsChartEventOptions {
  chart: {
    events: {
      [key: string]: Function;
    };
  };
  plotOptions: {
    series: {
      events: {
        [key: string]: Function;
      };
      point: {
        events: {
          [key: string]: Function;
        };
      };
    };
  };
  xAxis?: {
    events: {
      [key: string]: Function;
    };
  };
  yAxis?: {
    events: {
      [key: string]: Function;
    };
  };
}


/**
 * Return an options object with all chart/series/point events attached.
 *
 * @param chartComponent - The {@link TsChartComponent}
 * @param seriesDirective - The {@link TsChartSeriesDirective}
 * @param pointDirective - The {@link TsChartPointDirective}
 * @return The options object
 */
export function composeEvents(
  chartComponent: TsChartComponent,
  seriesDirective?: TsChartSeriesDirective,
  pointDirective?: TsChartPointDirective,
): TsChartEventOptions {
  const options: TsChartEventOptions = {
    chart: {
      events: {},
    },
    plotOptions: {
      series: {
        events: {},
        point: {
          events: {},
        },
      },
    },
  };

  // Connect Chart events to Emitters
  chartEvents.forEach((eventName: string) => {
    options.chart.events[eventName] = options.chart.events[eventName] || function(this: any, event: any) {
      chartComponent[eventName].emit(new TsChartEvent(event, this));
    };
  });

  // Connect Series events to Emitters
  if (seriesDirective) {
    seriesEvents.forEach((eventName: string) => {
      const fn: Function = options.plotOptions.series.events[eventName] || function(this: any, event: any) {
        seriesDirective[eventName].emit(new TsChartEvent(event, this));
      };
      options.plotOptions.series.events[eventName] = fn;
    });
  }

  // Connect Point events to Emitters
  if (pointDirective) {
    pointEvents.forEach((eventName: string) => {
      const fn: Function = options.plotOptions.series.point.events[eventName] || function(this: any, event: any) {
        pointDirective[eventName].emit(new TsChartEvent(event, this));
      };

      options.plotOptions.series.point.events[eventName] = fn;
    });
  }

  return options;
}
