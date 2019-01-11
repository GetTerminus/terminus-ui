import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { isValid as isValidDate } from 'date-fns';


/**
 * Define date formats to be used with the custom date adapter
 */
export const TS_DATE_FORMATS = {
  parse: {
    dateInput: {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {
      year: 'numeric',
      month: 'short',
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long',
    },
  },
};


/**
 * Custom date adapter for the underlying Material Datepicker
 */
@Injectable()
export class TsDateAdapter extends NativeDateAdapter {
  /**
   * Format the date when setting the UI
   *
   * @param date - The date chosen
   * @param date - The desired format (not currently using, but must match API)
   * @return The date string
   */
  public format(date: Date, displayFormat?: any): string {
    const day = this.forceTwoDigits(date.getDate());
    const month = this.forceTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }


  /**
   * Check if a date is valid
   *
   * @param date - The date in question
   * @return Whether it is valid
   */
  public isValid(date: Date): boolean {
    // HACK: I cannot reproduce a case where the date is valid but date.getTime is not a function.
    // However, when dynamically updating a date in real use throws an error.
    return isValidDate(date) && date.getTime && !isNaN(date.getTime());
  }


  /**
   * Force a two digit string with a preceeding `0` if needed
   *
   * @param n - The number
   * @return The two digit number
   */
  private forceTwoDigits(n: number): string {
    return ('00' + n).slice(-2);
  }
}
