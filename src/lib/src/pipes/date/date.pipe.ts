import {
  Pipe,
  PipeTransform,
  isDevMode,
} from '@angular/core';
import {
  isValid,
  format as formatDate,
} from 'date-fns';

import { TsDateTypes } from './../../utilities/types/date.types';


@Pipe({
  name: 'tsDate',
})
export class TsDatePipe implements PipeTransform {
  transform(value: string|Date, format: TsDateTypes = 'short'): string {
    const validFormats = [
      'short', // 02/08/2018
      'medium', // February 8th, 2018
      'extended', // Thursday, February 8th, 2018, 12:00:00am
      'timestamp', // 2018-02-08T05:00:00.000Z
    ];


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
      : '';

    return dateString;
  }
}
