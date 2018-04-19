/**
 * Reference: https://www.highcharts.com/docs
 */
import { ChartObject } from 'highcharts';


// tslint:disable: no-empty-interface
export interface TsChartObject extends ChartObject {}
// tslint:enable: no-empty-interface


/**
 * The type of axis.
 *
 * In a datetime axis, the numbers are given in milliseconds, and tick marks are placed on
 * appropriate values like full hours or days. In a category axis, the point names of the chart's
 * series are used for categories, if not a categories array is defined.
 */
export type TsChartAxisType
  = 'category'
  | 'datetime'
  | 'linear'
  | 'logarithmic'
;


/**
 * The allowed map types
 */
export type TsChartMapTypes
  = 'europe'
  | 'northAmerica'
  | 'usa'
  | 'worldContinents'
  | 'world'
;


/**
 * Callback function to format the text of the tooltip from scratch. Return false to disable tooltip
 * for a specific point on series.
 *
 * Available data: `this.percentage|point|series|total|x|y`
 */
export type TsChartLabelFormatterFn = () => false | string;


/**
 * Define the supported chart visualizations
 */
export type TsChartVisualizationOptions
  = 'area'
  | 'bar'
  | 'bullet'
  | 'column'
  | 'line'
  | 'map'
  | 'mapbubble'
  | 'pie'
  | 'scatter'
;


/**
 * Define how chart data should stack
 */
export type TsChartStacking
  = null
  | 'normal'
  | 'percent'
;


/**
 * A band stretching across the plot area marking an interval on the axis.
 */
export interface TsChartAxisPlotBand {
  /**
   * The color of the plot band.
   */
  color: null | string;
  /**
   * The start position of the plot band in axis units.
   */
  from: null | number;
  /**
   * Text label for the plot band
   */
  label?: {
    text: string;
  };
  /**
   * The end position of the plot band in axis units.
   */
  to: null | number;
}


/*
 * The allowed options for a chart axis
 */
export interface TsChartAxis {
  /**
   * If categories are present for the xAxis, names are used instead of numbers for that axis.
   */
  categories?: string[];
  /**
   * The axis labels show the number or category for each tick.
   */
  labels?: {
    /**
     * Callback JavaScript function to format the label.
     */
    formatter: TsChartLabelFormatterFn;
  };
  /**
   * An array of colored bands stretching across the plot area marking an interval on the axis.
   */
  plotBands?: TsChartAxisPlotBand[];
  /**
   * The axis title, showing next to the axis line.
   */
  title?: {
    /**
     * The actual text of the axis title.
     */
    text: string;
  };
  /**
   * The type of axis. {@link TsChartAxisType}
   */
  type?: TsChartAxisType;
}


/**
 * The axis title, showing next to the axis line.
 */
export interface TsChartTitle {
  /**
   * The actual text of the axis title.
   */
  text: string;
}


/**
 * The tooltip that appears when the user hovers over a series or point.
 */
export interface TsChartTooltip {
  /**
   * A callback function for formatting the HTML output for a single point in the tooltip.
   *
   * Available data:
   * - this.percentage
   * - this.point
   * - this.points
   * - this.series
   * - this.total
   * - this.x
   * - this.y
   *
   * {@link TsChartLabelFormatterFn}
   */
  pointFormatter?: TsChartLabelFormatterFn;
  /**
   * Split the tooltip into one label per series, with the header close to the axis.
   */
  split?: boolean;
  /**
   * A string to prepend to each series' y value.
   */
  valuePrefix?: string;
  /**
   * A string to append to each series' y value.
   */
  valueSuffix?: string;
  /**
   * The format for the date in the tooltip header if the X axis is a datetime axis. The default is
   * a best guess based on the smallest distance between points in the chart.
   */
  xDateFormat?: string;
}


/**
 * The tooltip that appears when the user hovers over a series or point.
 *
 * The only difference between this and {@link TsChartMapTooltip} is the name of the formatter
 * function.
 */
export interface TsChartMapTooltip {
  /**
   * A callback function for formatting the HTML output for a single point in the tooltip.
   *
   * Available data:
   * - this.percentage
   * - this.point
   * - this.points
   * - this.series
   * - this.total
   * - this.x
   * - this.y
   *
   * {@link TsChartLabelFormatterFn}
   */
  formatter?: TsChartLabelFormatterFn;
  /**
   * Split the tooltip into one label per series, with the header close to the axis.
   */
  split?: boolean;
  /**
   * A string to prepend to each series' y value.
   */
  valuePrefix?: string;
  /**
   * A string to append to each series' y value.
   */
  valueSuffix?: string;
  /**
   * The format for the date in the tooltip header if the X axis is a datetime axis. The default is
   * a best guess based on the smallest distance between points in the chart.
   */
  xDateFormat?: string;
}


/**
 * A zone within a series.
 */
export interface TsChartZone {
  /**
   * Defines the color of the series.
   */
  color?: string;
  /**
   * Defines the fill color for the series (in area type series).
   */
  fillColor?: string;
  /**
   * The value up to where the zone extends, if undefined the zones stretches to the last value in
   * the series.
   */
  value?: number;
}


/**
 * Individual data item for a chart.
 */
export interface TsChartDataItem {
  /**
   * An array of data points for the series.
   */
  data?: any[];
  /**
   * Individual data label for each point.
   */
  dataLabels?: {
    /**
     * Enable or disable the data labels.
     */
    enabled?: boolean;
    /**
     * Formatter function for the data label. {@link TsChartLabelFormatterFn}
     *
     * Available data:
     * - this.percentage
     * - this.point
     * - this.series
     * - this.total
     * - this.x
     * - this.y
     */
    formatter?: TsChartLabelFormatterFn;
  };
  /**
   * Enable or disable the mouse tracking for a specific series.
   */
  enableMouseTracking?: boolean;
  /**
   * What property to join the mapData to the value data.
   *
   * The joinBy option can also be an array of two values, where the first points to a key in the
   * mapData, and the second points to another key in the data.
   *
   * When joinBy is null, the map items are joined by their position in the array, which performs
   * much better in maps with many data points.
   */
  joinBy?: null | string | string[];
  /**
   * The name of the point as shown in the legend, tooltip, dataLabel etc.
   */
  name?: string;
  /**
   * The visualization to use
   */
  type?: TsChartVisualizationOptions;
  /**
   * An array defining zones within a series.
   */
  zones?: TsChartZone[];
}


/**
 * An array of data series'.
 */
export type TsChartData = TsChartDataItem[];


/**
 * Interface for options that the consumer can set
 */
export interface TsChartOptions {
  drilldown?: {
    series: TsChartData;
  };
  legend?: {
    /**
     * Enable or disable the legend.
     */
    enabled: boolean;
  };
  map?: {
    /**
     * What property to join the mapData to the value data with.
     */
    joinBy: null | string | string[];
  };
  mapNavigation?: {
    /**
     * Whether to enable map navigation.
     */
    enabled: boolean;
  };
  /**
   * Wrapper object for config objects for each series type.
   */
  plotOptions?: {
    area?: {
      /**
       * If no x values are given for the points in a series, pointStart defines on what value to
       * start.
       */
      pointStart?: number;
    };
    bar?: {
      /**
       * If no x values are given for the points in a series, pointStart defines on what value to
       * start.
       */
      pointStart?: number;
      /**
       * Whether to stack the values of each series on top of each other.
       *
       * When stacking is enabled, data must be sorted in ascending X order.
       */
      stacking?: TsChartStacking;
    };
    column?: {
      /**
       * If no x values are given for the points in a series, pointStart defines on what value to
       * start.
       */
      pointStart?: number;
      /**
       * Whether to stack the values of each series on top of each other.
       *
       * When stacking is enabled, data must be sorted in ascending X order.
       */
      stacking?: TsChartStacking;
    };
    line?: {
      /**
       * If no x values are given for the points in a series, pointStart defines on what value to
       * start.
       */
      pointStart?: number;
    };
    pie?: {
      /*
       * Options for the series data labels, appearing next to each data point.
       */
      dataLabels?: {
        /**
         * Formatter function for the data label. {@link TsChartLabelFormatterFn}
         */
        formatter: TsChartLabelFormatterFn;
      };
      /**
       * If no x values are given for the points in a series, pointStart defines on what value to
       * start.
       */
      pointStart?: number;
    };
    /**
     * General options for all series types.
     */
    series?: {
      /**
       * An array defining zones within a series.
       */
      zones?: TsChartZone[];
    };
  };
  /**
   * The chart's subtitle. {@link TsChartTitle}
   */
  subtitle?: TsChartTitle;
  /**
   * The chart's main title. {@link TsChartTitle}
   */
  title?: TsChartTitle;
  /**
   * Options for the tooltip that appears when the user hovers over a series or point.
   *
   * {@link TsChartTooltip} {@link TsChartMapTooltip}
   */
  tooltip?: TsChartTooltip | TsChartMapTooltip;
  /**
   * The X axis or category axis. Normally this is the horizontal axis, though if the chart is
   * inverted this is the vertical axis.
   *
   * {@link TsChartAxis}
   */
  xAxis?: TsChartAxis;
  /**
   * The Y axis or value axis. Normally this is the vertical axis, though if the chart is inverted
   * this is the horizontal axis.
   *
   * {@link TsChartAxis}
   */
  yAxis?: TsChartAxis;
}
