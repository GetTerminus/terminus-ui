import {
  isDevMode,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  format as formatDate,
  isValid,
} from 'date-fns';


/**
 * Define the allowed date formats for the {@link TsDatePipe}.
 */
export type TsDateTypes =
  // Short: 02-08-2018
  'short'
  // Medium: Feb 8th, 2018
  | 'medium'
  // Extended: Thursday, February 8th, 2018, 12:00:00am
  | 'extended'
  // Timestamp: 2018-02-08T05:00:00.000Z
  | 'timestamp'
;


/**
 * The date pipe
 *
 * @example
 * {{ date | tsDate }}
 * {{ date | tsDate:'timestamp' }}
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/pipes</example-url>
 */
@Pipe({
  name: 'tsDate',
})
export class TsDatePipe implements PipeTransform {
  transform(value: string|Date, format: TsDateTypes = 'short'): string | undefined {
    const validFormats: TsDateTypes[] = [
      'short',
      'medium',
      'extended',
      'timestamp',
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
      ? formatDate(date, 'MM-dd-yyyy')
      : (format === 'medium')
      ? formatDate(date, 'MMM do, yyyy')
      : (format === 'extended')
      ? formatDate(date, 'EEEE, MMMM do, yyyy, h:mm:ssa')
      : (format === 'timestamp')
      ? new Date(date).toISOString()
      // NOTE: Final case is untestable since it would be caught by the `if` above
      // istanbul ignore next
      : '';

    return dateString;
  }
}
