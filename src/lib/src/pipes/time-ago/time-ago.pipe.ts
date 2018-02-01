import {
  Pipe,
  PipeTransform,
  isDevMode,
} from '@angular/core';
import {
  isValid,
  formatDistance,
} from 'date-fns';


@Pipe({
  name: 'tsTimeAgo',
})
export class TsTimeAgoPipe implements PipeTransform {
  transform(value: string|Date, comparedDate: string|Date): string {
    // Check for null values to avoid issues during data-binding
    if (value == null || value === '') {
      return null;
    }

    console.log('VALUE: ', value, value == null)
    // Check for date validity
    if (!isValid(value) && isDevMode()) {
      throw Error(`'${value}' is not a valid date.`);
    }
    if (!isValid(comparedDate) && isDevMode()) {
      throw Error(`'${comparedDate}' is not a valid date.`);
    }

    // If dealing with a date objects, convert to strings
    const date1: string = (typeof value === 'string') ? value : new Date(value).toISOString();
    const date2: string =
      (typeof comparedDate === 'string') ? comparedDate : new Date(comparedDate).toISOString();

    return formatDistance(date1, date2);
  }
}

