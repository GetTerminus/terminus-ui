import {
  Pipe,
  PipeTransform,
  isDevMode,
} from '@angular/core';
import {
  isValid,
  format as formatDate,
} from 'date-fns';


/**
 * Define the allowed date formats for the {@link TsDatePipe}.
 */
export type TsDateTypes =
  // 02/08/2018
  'short'
  // February 8th, 2018
  | 'medium'
  // Thursday, February 8th, 2018, 12:00:00am
  | 'extended'
  // 2018-02-08T05:00:00.000Z
  | 'timestamp'
;


@Pipe({
  name: 'tsDate',
})
export class TsDatePipe implements PipeTransform {
  transform(value: string|Date, format: TsDateTypes = 'short'): string | undefined {
    const validFormats: TsDateTypes[] = [
      'short', // 02/08/2018
      'medium', // February 8th, 2018
      'extended', // Thursday, February 8th, 2018, 12:00:00am
      'timestamp', // 2018-02-08T05:00:00.000Z
    ];

    // Check for null values to avoid issues during data-binding
    if (!value) {
      return;
    }

    // Check for date validity
    if (!isValid(value) && isDevMode()) {
      throw Error(`'${value}' is not a valid date.`);
    }

    // Check for format validity
    if ((validFormats.indexOf(format) < 0) && isDevMode()) {
      throw Error(`'${format}' is not a valid format. Please see TsDateTypes for valid formats.`);
    }

    // If dealing with a date object, convert to string
    const date: string = (typeof value === 'string') ? value : new Date(value).toISOString();

    // Set the formatted date or an empty string if no format is matched
    const dateString =
      (format === 'short')
      ? formatDate(date, 'MM/DD/YYYY')
      : (format === 'medium')
      ? formatDate(date, 'MMM D YYYY')
      : (format === 'extended')
      ? formatDate(date, 'MMM D YYYY h:mm:ssa')
      : (format === 'timestamp')
      ? new Date(date).toISOString()
      // NOTE: Final case is untestable since it would be caught by the `if` above
      // istanbul ignore next
      : '';

    return dateString;
  }
}
