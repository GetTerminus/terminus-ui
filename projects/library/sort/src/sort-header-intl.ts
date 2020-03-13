import {
  Injectable,
  Optional,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';

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
  public changes: Subject<void> = new Subject<void>();

  /**
   * ARIA label for the sorting button
   *
   * @param id
   */
  public sortButtonLabel = (id: string) => `Change sorting for ${id}`;

  /**
   * A label to describe the current sort (visible only to screenreaders)
   *
   * @param id
   * @param direction
   */
  public sortDescriptionLabel =
    (id: string, direction: TsSortDirection) => `Sorted by ${id} ${direction === 'asc' ? 'ascending' : 'descending'}`;
}


/**
 * Factory to return an instance of TsSortHeaderIntl
 *
 * @param parentIntl
 */
export const TS_SORT_HEADER_INTL_PROVIDER_FACTORY = (parentIntl: TsSortHeaderIntl) => parentIntl || new TsSortHeaderIntl();


/**
 * TsSortHeaderIntl provider declaration
 */
export const TS_SORT_HEADER_INTL_PROVIDER = {
  // If there is already an TsSortHeaderIntl available, use that. Otherwise, provide a new one.
  provide: TsSortHeaderIntl,
  deps: [[new Optional(), new SkipSelf(), TsSortHeaderIntl]],
  useFactory: TS_SORT_HEADER_INTL_PROVIDER_FACTORY,
};
