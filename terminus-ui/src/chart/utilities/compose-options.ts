import { merge } from './../../utilities/merge';
import {
  BASE_DEFAULTS,
  MAP_DATA,
  MAP_DEFAULTS,
  SCATTER_DEFAULTS,
  SPARKLINE_DEFAULTS,
} from './../options-defaults';
import { TsChartOptions } from './../options.interface';
import {
  composeEvents,
  TsChartEventOptions,
} from './compose-events';
import { composeColors } from './compose-colors';
import { TsChartComponent } from './../chart.component';


/**
 * Compose the full options object for the chart instance
 *
 * @param context - The chart component
 * @param userOptions - The user-defined options
 * @return The full options object
 */
export function composeOptions(
  context: TsChartComponent,
  userOptions?: TsChartOptions,
): {[key: string]: any} {
  // Set base options
  let options: {[key: string]: any} = merge({}, BASE_DEFAULTS);
  // Generate the color palette for the chart
  const colors: string[] | undefined = composeColors(context.dataSeriesLength, context.visualization);

  // Map specific options
  if (context.visualization === 'map') {
    options = merge(options, MAP_DEFAULTS);
    options.chart.map = MAP_DATA[context.map];
    options.colorAxis.minColor = colors[0];
    options.colorAxis.maxColor = colors[1];
  }

  // Scatter specific options
  if (context.visualization === 'scatter') {
    options = merge(options, SCATTER_DEFAULTS);
  }

  // Add function to emit event when the chart fails to export
  options.exporting.error = (error: Error) => {
    context.exportError.emit(error);
  };

  // Set filename for export
  options.exporting.filename = context.exportFilename || `${context.visualization}-chart`;

  // Add user options
  if (userOptions) {
    options = merge(options, userOptions);
  }

  // Add events
  const eventOptions: TsChartEventOptions = composeEvents(
    context,
    context.series,
    context.series ? context.series.point : undefined,
  );
  options = merge(options, eventOptions);

  // Add chart color palette
  // istanbul ignore else
  if (colors) {
    options.colors = colors;
  }

  // Don't set the type for maps or stock charts. This is handled during initialization.
  if (context.visualization !== 'map' && !context.addStockControls) {
    if (context.visualization) {
      options.chart.type = context.visualization;
    }

    // Maps and stock charts cannot be sparkline charts
    if (context.sparkline) {
      options = merge(options, SPARKLINE_DEFAULTS);
    }
  }

  // Add user data
  options.series = context.data;

  return options;
}
