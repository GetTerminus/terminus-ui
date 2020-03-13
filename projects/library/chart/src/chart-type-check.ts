import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';

import { TsChart } from './chart.component';


/**
 * Coerce the type to XYChart
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartXYTypeCheck = (chart: TsChart): chart is am4charts.XYChart => chart.className === 'XYChart';

/**
 * Coerce the type to PieChart
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartPieTypeCheck = (chart: TsChart): chart is am4charts.PieChart => chart.className === 'PieChart';

/**
 * Coerce the type to MapChart
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartMapTypeCheck = (chart: TsChart): chart is am4maps.MapChart => chart.className === 'MapChart';

/**
 * Coerce the type to RadarChart
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartRadarTypeCheck = (chart: TsChart): chart is am4charts.RadarChart => chart.className === 'RadarChart';

/**
 * Coerce the type to TreeMap
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartTreeTypeCheck = (chart: TsChart): chart is am4charts.TreeMap => chart.className === 'TreeMap';

/**
 * Coerce the type to SankeyDiagram
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartSankeyTypeCheck = (chart: TsChart): chart is am4charts.SankeyDiagram => chart.className === 'SankeyDiagram';

/**
 * Coerce the type to ChordDiagram
 *
 * @param chart - The chart to check
 * @returns Boolean
 */
export const tsChartChordTypeCheck = (chart: TsChart): chart is am4charts.ChordDiagram => chart.className === 'ChordDiagram';
