/**
 * Define the action types for a navigation item
 */
export type TsNavigationItemAction =
  'navigate'
  | 'log-out'
  | 'log-in-as';


/**
 * Define the allowed keys and types for an item passed to the {@link TsNavigationComponent}
 */
export interface TsNavigationItem {
  /**
   * The string show to the user
   */
  name: string,

  /**
   * The action to take on click
   */
  action: TsNavigationItemAction,

  /**
   * The destination for items with a 'navigate' action
   */
  destination?: string | string[],

  /**
   * Define if the item should only be allowed in the secondary navigation
   */
  onlyHidden: boolean,

  /**
   * Define if the item is disabled
   */
  isDisabled?: boolean,
}
