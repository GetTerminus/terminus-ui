import { TsSortDirection } from './../types/sort.types';


/**
 * Interface for a directive that holds sorting state consumed by `TsSortHeaderComponent`
 */
export interface TsSortableItem {
  /**
   * The id of the column being sorted
   */
  id: string;

  /**
   * Starting sort direction
   */
  start: 'asc' | 'desc';

  /**
   * Whether to disable clearing the sorting state
   */
  disableClear: boolean;
}


/**
 * The current sort state
 */
export interface TsSortState {
  /**
   * The id of the column being sorted
   */
  active: string;

  /**
   * The sort direction
   */
  direction: TsSortDirection;
}

