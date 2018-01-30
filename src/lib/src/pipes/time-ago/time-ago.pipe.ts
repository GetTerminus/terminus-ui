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

