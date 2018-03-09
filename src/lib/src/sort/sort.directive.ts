// NOTE(B$): Disabling input/output renaming to provide a more natural API
// tslint:disable: use-input-property-decorator no-input-rename no-output-rename
import {
  Directive,
  EventEmitter,
  Input,
  isDevMode,
  Output,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { CanDisable, mixinDisabled } from '@angular/material/core';
import { Subject } from 'rxjs/Subject';

import { TsSortDirection } from './../utilities/types/sort.types';
import {
  TsSortableItem,
  TsSortState,
} from './../utilities/interfaces/sort.interface';
import {
  getSortInvalidDirectionError,
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
} from './sort-errors';


// Boilerplate for applying mixins to TsSort.
export class TsSortBase {}
export const _TsSortMixinBase = mixinDisabled(TsSortBase);


/**
 * Container for TsSortables to manage the sort state and provide default sort parameters
 */
@Directive({
  selector: '[tsSort]',
  exportAs: 'tsSort',
  inputs: ['disabled: tsSortDisabled'],
})
export class TsSortDirective extends _TsSortMixinBase implements CanDisable, OnChanges, OnDestroy {
  /**
   * Collection of all registered sortables that this directive manages
   */
  private sortables = new Map<string, TsSortableItem>();

  /**
   * Used to notify any child components listening to state changes
   */
  public _stateChanges = new Subject<void>();

  /**
   * The id of the most recently sorted TsSortable
   */
  @Input('tsSortActive')
  public active: string;

  /**
   * The direction to set when an TsSortable is initially sorted.
   *
   * May be overriden by the TsSortable's sort start.
   */
  @Input('tsSortStart')
  public start: 'asc' | 'desc' = 'asc';

  /**
   * The sort direction of the currently active TsSortable
   */
  @Input('tsSortDirection')
  public set direction(direction: TsSortDirection) {
    if (isDevMode() && direction && direction !== 'asc' && direction !== 'desc') {
      throw getSortInvalidDirectionError(direction);
    }
    this._direction = direction;
  }
  public get direction(): TsSortDirection { return this._direction; }
  private _direction: TsSortDirection = '';

  /**
   * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
   *
   * May be overriden by the TsSortable's disable clear input.
   */
  @Input('tsSortDisableClear')
  public get disableClear() {
    return this._disableClear;
  }
  public set disableClear(v: boolean) {
    this._disableClear = coerceBooleanProperty(v);
  }
  private _disableClear: boolean;

  /**
   * Event emitted when the user changes either the active sort or sort direction
   */
  @Output('tsSortChange')
  readonly sortChange = new EventEmitter<TsSortState>();


  /**
   * Trigger next on all changes
   */
  public ngOnChanges(): void {
    this._stateChanges.next();
  }


  /**
   * Complete the observable on destroy
   */
  public ngOnDestroy(): void {
    this._stateChanges.complete();
  }


  /**
   * Register function to be used by the contained TsSortables. Adds the TsSortable to the
   * collection of TsSortables.
   */
  register(sortable: TsSortableItem): void {
    if (!sortable.id && isDevMode()) {
      throw getSortHeaderMissingIdError();
    }

    if (this.sortables.has(sortable.id) && isDevMode()) {
      throw getSortDuplicateSortableIdError(sortable.id);
    }

    this.sortables.set(sortable.id, sortable);
  }


  /**
   * Unregister function to be used by the contained TsSortables. Removes the TsSortable from the
   * collection of contained TsSortables.
   */
  deregister(sortable: TsSortableItem): void {
    this.sortables.delete(sortable.id);
  }


  /**
   * Sets the active sort id and determines the new sort direction
   */
  sort(sortable: TsSortableItem): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.next({active: this.active, direction: this.direction});
  }


  /**
   * Returns the next sort direction of the active sortable, checking for potential overrides
   */
  getNextSortDirection(sortable: TsSortableItem): TsSortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
    const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }

    return sortDirectionCycle[nextDirectionIndex];
  }

}


/**
 * Returns the sort direction cycle to use given the provided parameters of order and clear
 */
function getSortDirectionCycle(start: 'asc' | 'desc', disableClear: boolean): TsSortDirection[] {
  const sortOrder: TsSortDirection[] = ['asc', 'desc'];

  if (start === 'desc') {
    sortOrder.reverse();
  }

  if (!disableClear) {
    sortOrder.push('');
  }

  return sortOrder;
}
