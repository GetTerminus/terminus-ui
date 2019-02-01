import {
  Pipe,
  PipeTransform,
} from '@angular/core';


/**
 * A pipe that converts a string to title case
 *
 * @example
 * {{ 'MY TEXT' | tsTitleCase }}
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/pipes</example-url>
 */
@Pipe({
  name: 'tsTitleCase',
})
export class TsTitleCasePipe implements PipeTransform {
  transform(value: string): string | undefined {
    // Check for null values to avoid issues during data-binding
    if (value == null || value === '') {
      return;
    }

    return value.toLowerCase().split(' ').map((word) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
}
