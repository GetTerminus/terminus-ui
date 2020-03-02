import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';

import { TsChart } from './chart.component';


/**
 * Coerce the type to XYChart
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartXYTypeCheck(chart: TsChart): chart is am4charts.XYChart {
  return chart.className === 'XYChart';
}

/**
 * Coerce the type to PieChart
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartPieTypeCheck(chart: TsChart): chart is am4charts.PieChart {
  return chart.className === 'PieChart';
}

/**
 * Coerce the type to MapChart
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartMapTypeCheck(chart: TsChart): chart is am4maps.MapChart {
  return chart.className === 'MapChart';
}

/**
 * Coerce the type to RadarChart
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartRadarTypeCheck(chart: TsChart): chart is am4charts.RadarChart {
  return chart.className === 'RadarChart';
}

/**
 * Coerce the type to TreeMap
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartTreeTypeCheck(chart: TsChart): chart is am4charts.TreeMap {
  return chart.className === 'TreeMap';
}

/**
 * Coerce the type to SankeyDiagram
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartSankeyTypeCheck(chart: TsChart): chart is am4charts.SankeyDiagram {
  return chart.className === 'SankeyDiagram';
}

/**
 * Coerce the type to ChordDiagram
 *
 * @param chart - The chart to check
 * @return Boolean
 */
export function tsChartChordTypeCheck(chart: TsChart): chart is am4charts.ChordDiagram {
  return chart.className === 'ChordDiagram';
}
