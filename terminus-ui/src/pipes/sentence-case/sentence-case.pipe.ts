import {
  Pipe,
  PipeTransform,
} from '@angular/core';


@Pipe({
  name: 'tsSentenceCase',
})
export class TsSentenceCasePipe implements PipeTransform {
  transform(value: string): string | undefined {
    // Check for null values to avoid issues during data-binding
    if (!value) {
      return;
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
