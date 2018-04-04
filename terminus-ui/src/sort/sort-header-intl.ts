import {
  Injectable,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TsSortDirection } from './sort.directive';


/**
 * To modify the labels and text displayed, create a new instance of TsSortHeaderIntl and
 * include it in a custom provider.
 */
@Injectable()
export class TsSortHeaderIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  changes: Subject<void> = new Subject<void>();

  /**
   * ARIA label for the sorting button
   */
  sortButtonLabel = (id: string) => {
    return `Change sorting for ${id}`;
  }

  /**
   * A label to describe the current sort (visible only to screenreaders)
   */
  sortDescriptionLabel = (id: string, direction: TsSortDirection) => {
    return `Sorted by ${id} ${direction === 'asc' ? 'ascending' : 'descending'}`;
  }
}


/**
 * Factory to return an instance of TsSortHeaderIntl
 */
export function TS_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl: TsSortHeaderIntl) {
  return parentIntl || new TsSortHeaderIntl();
}


/**
 * TsSortHeaderIntl provider declaration
 */
export const TS_SORT_HEADER_INTL_PROVIDER = {
  // If there is already an TsSortHeaderIntl available, use that. Otherwise, provide a new one.
  provide: TsSortHeaderIntl,
  deps: [[new Optional(), new SkipSelf(), TsSortHeaderIntl]],
  useFactory: TS_SORT_HEADER_INTL_PROVIDER_FACTORY,
};
