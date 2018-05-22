import { CHART_COLORS } from './../options-defaults';
import { TsChartVisualizationOptions } from './../options.interface';
import { interpolateManyColors } from './interpolate-colors';


/**
 * Return an array of colors for charting
 *
 * @param count - The number of data-points that need color
 * @param visualization - The chosen visualization for the chart (line, bar, etc)
 * @param interpolator - The function used to interpolate the colors. Passed parameters are
 * `colorArray`, `steps`, `opacity`
 * @return The array of colors
 */
export function composeColors(
  dataPoints: number,
  visualization: TsChartVisualizationOptions,
  interpolator: Function = interpolateManyColors,
): string[] | undefined {
  let colors: string[] | undefined;
  let steps = 5;
  let opacity: number | undefined;
  const colorArray: string[] = [...CHART_COLORS];

  // Fewer steps between colors will create more distinct colors
  if (visualization === 'area') {
    steps = 3;
  }

  // Scatter charts have specific color needs for contrast reasons. We are brute forcing this method
  // for this specific chart type.
  if (visualization === 'scatter') {
    // Force higher contrast between colors
    steps = 2;
    // Include more colors than data points (we select 2 colors from this spread later)
    dataPoints = 5;
    // Increase opacity since scatter charts have increased overlap between points
    opacity = 0.5;
  }

  colors = interpolator(colorArray, steps, opacity).slice(0, dataPoints);

  // For scatter charts we need a secondary color that is not close to the first color and is not
  // too visually light (eg yellow)
  if (colors && visualization === 'scatter') {
    colors = [colors[0], colors[colors.length - 2]];
  }

  // For maps, we need two distinct colors to create a gradient
  if (colors && visualization === 'map') {
    colors = [colors[0], colors[colors.length - 1]];
  }

  // Color are reversed so that darker colors are used at the bottom of columns
  if (colors && visualization === 'column') {
    colors.reverse();
  }

  return colors;
}
