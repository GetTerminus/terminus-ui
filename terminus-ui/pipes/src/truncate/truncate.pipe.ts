import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { isNumber } from '@terminus/ngx-tools';



/**
 * Define the accepted string values for the {@link TsTruncateAtPipe} position
 */
export type TsTruncatePositionType
  = 'start'
  | 'middle'
  | 'end'
;

/**
 * Define the allowed truncation position types Used by {@link TsTruncateAtPipe} position
 */
export const allowedTruncationTypes: TsTruncatePositionType[] = [
  'start',
  'middle',
  'end',
];


/**
 * The truncate at pipe
 *
 * @example
 * {{ 'Here is my string' | tsTruncateAt:7 }} // Outputs: `Here i…`
 * {{ 'Here is my string' | tsTruncateAt:8:'middle' }} // Outputs: `Here…ing`
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/pipes</example-url>
 */
@Pipe({
  name: 'tsTruncateAt',
})
export class TsTruncateAtPipe implements PipeTransform {
  transform(value: string, charCount: number = 0, position: TsTruncatePositionType = 'end'): string | undefined {
    // Check for null values to avoid issues during data-binding
    if (!value) {
      return;
    }

    // Insure the correct type
    if (!isNumber(charCount)) {
      console.warn(`${charCount} is not a number.`);
    }

    if ((value.length < charCount) || (charCount < 1)) {
      return value;
    }

    let newString = value;
    const ellipses = '\u2026';

    switch (position) {
      case('start'):
        newString = ellipses + value.slice(-(charCount - 1));
        break;
      case('middle'):
        let charCountStart: number;
        let charCountEnd: number;
        // determine how many characters are on each side of the split
        // if there are an odd number of characters, the beginning of the string is longer
        if ((charCount - 1) % 2 === 1) {
          charCountEnd = (charCount - 1) / 2;
          charCountStart = charCountEnd + 1;
        } else {
          charCountEnd = (charCount - 1) / 2;
          charCountStart = charCountEnd;
        }
        newString = value.slice(0, charCountStart) + ellipses + value.slice(-(charCountEnd));
        break;
      case('end'):
        newString = value.slice(0, charCount - 1) + ellipses;
        break;
      default:
        newString = value.slice(0, charCount - 1) + ellipses;
        break;
    }

    return newString;
  }
}
