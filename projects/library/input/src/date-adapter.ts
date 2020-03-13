import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { isDateValue } from '@terminus/ngx-tools/coercion';


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
   * @param displayFormat - The desired format (not currently using, but must match API)
   * @returns The date string
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   * @returns Whether it is valid
   */
  public isValid(date: Date): boolean {
    return isDateValue(date);
  }

  /**
   * Force a two digit string with a preceding `0` if needed
   *
   * @param n - The number
   * @returns The two digit number
   */
  private forceTwoDigits(n: number): string {
    const digitsToRemove = -2;
    return (`00${  n.toString()}`).slice(digitsToRemove);
  }
}
