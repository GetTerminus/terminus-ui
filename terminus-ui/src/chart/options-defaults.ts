// All supported maps:
import { EUROPE_MAP } from './maps/europe.geo';
import { NA_MAP } from './maps/north-america.geo';
import { USA_MAP } from './maps/usa.geo';
import { WORLD_CONTINENTS_MAP } from './maps/world-continents.geo';
import { WORLD_MAP } from './maps/world.geo';

// NOTE: These colors should be kept in sync with `_colors.scss`
export const TS_BLACK = '#302d35';
export const TS_WHITE = '#f9f9f9';
export const TS_PRIMARY = 'rgb(0, 83, 138)#00538a';
export const TS_PRIMARY_TRANSPARENT = 'rgba(0, 83, 138, 0.3)';
export const TS_UTILITY_XD = '#3e3c43';
export const TS_UTILITY = '#999';
export const TS_UTILITY_L = '#cecdd1'; // Reflect this back into primary colors?
export const TS_UTILITY_XL = '#f2f0f7';

export const CHART_COLORS: string[] = [
  'rgb(52, 152, 219)',
  'rgb(255, 221, 89)',
  'rgb(46, 204, 113)',
  'rgb(231, 76, 60)',
  'rgb(255, 175, 64)',
];


/**
 * A hash of supported maps.
 *
 * See all available maps: http://code.highcharts.com/mapdata/
 */
export const MAP_DATA: {[key: string]: {[key: string]: any}} = {
  europe: EUROPE_MAP,
  northAmerica: NA_MAP,
  usa: USA_MAP,
  worldContinents: WORLD_CONTINENTS_MAP,
  world: WORLD_MAP,
};


/**
 * Custom positioner function for tooltips
 *
 * @param w - The tooltip width
 * @param h - The tooltip height
 * @param point - The tooltip point object
 * @return The positioning object
 */
export function tooltipPositionerFunction(
  w: number,
  h: number,
  point: {[key: string]: any},
): {x: number; y: number} {
  return { x: point.plotX - w / 2, y: (point.plotY - h) - 10 };
}


/**
 * Default chart options
 */
export const BASE_DEFAULTS: {[key: string]: any} = {
  accessibility: {
    enabled: true,
  },
  chart: {
    backgroundColor: TS_WHITE,
    className: 'qa-chart',
    nullColor: TS_UTILITY,
    selectionMarkerFill: TS_PRIMARY,
    style: {
      fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
  },
  credits: {
    enabled: false,
  },
  exporting: {
    buttons: {
      contextButton: {
        theme: {
          fill: TS_WHITE,
        },
      },
    },
  },
  legend: {
    enabled: true,
    itemHiddenStyle: {
      color: TS_UTILITY,
    },
    itemStyle: {
      color: TS_BLACK,
    },
  },
  loading: {
    style: {
      backgroundColor: TS_WHITE,
      opacity: .7,
    },
  },
  plotOptions: {
    area: {
      className: 'qa-chart-area',
      fillOpacity: .5,
    },
    bar: {
      className: 'qa-chart-bar',
    },
    bullet: {
      className: 'qa-chart-bullet',
    },
    column: {
      className: 'qa-chart-column',
    },
    histogram: {
      className: 'qa-chart-histogram',
    },
    line: {
      className: 'qa-chart-line',
    },
    map: {
      className: 'qa-chart-map',
    },
    mapbubble: {
      className: 'qa-chart-map-bubble',
    },
    pie: {
      className: 'qa-chart-pie',
      dataLabels: {
        enabled: true,
      },
      showInLegend: true,
      tooltip: {
        split: false,
      },
    },
    pyramid: {
      className: 'qa-chart-pyramid',
    },
    scatter: {
      className: 'qa-chart-scatter',
      marker: {
        enabled: true,
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)',
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        headerFormat: '',
        split: false,
      },
    },
    series: {
      allowPointSelect: true,
      className: 'qa-chart-series',
      dataLabels: {
        style: {
          color: TS_BLACK,
        },
      },
      marker: {
        // NOTE: This is a hack. We cannot disable markers while still allowing point selection.
        // This small radius will effectively 'hide' the point within the line's color until hover
        // or selection increases the size.
        radius: .01,
        states: {
          hover: {
            radius: 6,
          },
          select: {
            fillColor: TS_UTILITY_XD,
            lineColor: TS_WHITE,
            lineWidth: 1,
            radius: 6,
          },
        },
      },
      tooltip: {
        split: true,
      },
    },
  },
  subtitle: {
    style: {
      color: TS_UTILITY,
    },
  },
  title: {
    style: {
      color: TS_BLACK,
    },
  },
  tooltip: {
    backgroundColor: TS_WHITE,
    borderRadius: 2,
    followPointer: true,
    headerFormat: '<b>{point.key}</b><br/>',
    shadow: false,
    style: {
      color: TS_BLACK,
    },
    xDateFormat: '%B %e, %Y',
  },
  xAxis: {
    crosshair: true,
    endOnTick: true,
    // Axis lines
    gridLineColor: TS_UTILITY_XL,
    // Line at edge of graph
    lineColor: TS_UTILITY_L,
    minorGridLineColor: TS_UTILITY_L,
    minorTickColor: TS_UTILITY_L,
    tickColor: TS_UTILITY_L,
  },
  yAxis: {
    crosshair: false,
    endOnTick: true,
    // Axis lines
    gridLineColor: TS_UTILITY_XL,
    // Line at edge of graph
    lineColor: TS_UTILITY_L,
    minorGridLineColor: TS_UTILITY_L,
    minorTickColor: TS_UTILITY_L,
    tickColor: TS_UTILITY_L,
  },
};


/**
 * Default options specific to a scatter visualization
 */
export const SCATTER_DEFAULTS: {[key: string]: any} = {
  chart: {
    selectionMarkerFill: TS_PRIMARY_TRANSPARENT,
    zoomType: 'xy',
  },
  plotOptions: {
    series: {
      marker: {
        radius: 5,
      },
    },
  },
  xAxis: {
    crosshair: false,
  },
};


/**
 * Default options specific to a map visualization
 */
export const MAP_DEFAULTS: {[key: string]: any} = {
  colorAxis: {
    min: 1,
    minColor: TS_UTILITY_L,
    maxColor: TS_PRIMARY,
    type: 'logarithmic',
  },
  plotOptions: {
    series: {
      borderColor: TS_UTILITY_L,
      dataLabels: {
        enabled: true,
      },
    },
  },
  tooltip: {
    split: false,
  },
  xAxis: {
    crosshair: false,
    endOnTick: false,
  },
  yAxis: {
    crosshair: false,
    endOnTick: false,
  },
  zoomType: undefined,
};


/**
 * Default setting for sparkline charts
 */
export const SPARKLINE_DEFAULTS: {[key: string]: any} = {
  chart: {
    backgroundColor: null,
    borderWidth: 0,
    margin: [2, 0, 2, 0],
    width: 120,
    height: 20,
    style: {
      overflow: 'visible',
    },
    skipClone: true,
  },
  title: {
    text: '',
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    crosshair: false,
    labels: {
      enabled: false,
    },
    title: {
      text: null,
    },
    startOnTick: false,
    endOnTick: false,
    tickPositions: [],
  },
  yAxis: {
    crosshair: false,
    endOnTick: false,
    startOnTick: false,
    labels: {
      enabled: false,
    },
    title: {
      text: null,
    },
    tickPositions: [0],
  },
  legend: {
    enabled: false,
  },
  subtitle: {
    text: '',
  },
  tooltip: {
    headerFormat: '',
    hideDelay: 0,
    split: false,
    shared: true,
    positioner: tooltipPositionerFunction,
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      marker: {
        radius: 1,
        states: {
          hover: {
            radius: 2,
          },
          select: {
            radius: 4,
          },
        },
      },
      fillOpacity: 0.25,
    },
  },
};
