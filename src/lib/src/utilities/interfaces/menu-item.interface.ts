/**
 * Define the allowed keys and types for an item passed to the {@link TsMenuComponent}
 */
export interface TsMenuItem {
  /**
   * The menu item name
   */
  name: string;

  /**
   * The icon name
   */
  icon?: string;

  /**
   * The action attached to the menu item
   */
  action?: string;

  /**
   * A value for to the item
   */
  value?: string;
}
