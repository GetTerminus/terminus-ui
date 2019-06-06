import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { roundNumber } from '@terminus/ngx-tools';


/**
 * The round number pipe
 *
 * @example
 * {{ 3456.3456 | tsRoundNumber }}
 * {{ 3456.3456 | tsRoundNumber:2 }}
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/pipes</example-url>
 */
@Pipe({name: 'tsRoundNumber'})
export class TsRoundNumberPipe implements PipeTransform {
  public transform(value: number, precision = 0): number | undefined {
    // Check for null values to avoid issues during data-binding
    if (!value) {
      return undefined;
    }

    return roundNumber(value, precision);
  }
}

