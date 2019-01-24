import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import { roundNumber } from '@terminus/ngx-tools';


@Pipe({
  name: 'tsRoundNumber',
})
export class TsRoundNumberPipe implements PipeTransform {
  transform(value: number, precision = 0): number | undefined {
    // Check for null values to avoid issues during data-binding
    if (!value) {
      return;
    }

    return roundNumber(value, precision);
  }
}

