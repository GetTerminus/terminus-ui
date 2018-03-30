import {
  Pipe,
  PipeTransform,
} from '@angular/core';


@Pipe({
  name: 'tsSentenceCase',
})
export class TsSentenceCasePipe implements PipeTransform {
  transform(value: string): string {
    // Check for null values to avoid issues during data-binding
    if (value == null || value === '') {
      return null;
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
