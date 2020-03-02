import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { abbreviateNumber } from '@terminus/ngx-tools/utilities';


/**
 * The abbreviate number pipe
 *
 * @example
 * {{ 1234 | tsAbbreviateNumber }}
 * {{ 1200 | tsAbbreviateNumber:2 }}
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/pipes</example-url>
 */
@Pipe({ name: 'tsAbbreviateNumber' })
export class TsAbbreviateNumberPipe implements PipeTransform {
  public transform(value: number, decimalPlace = 1): string {
    // Check for null values to avoid issues during data-binding
    if (!value) {
      return '';
    }

    return abbreviateNumber(value, decimalPlace);
  }
}

