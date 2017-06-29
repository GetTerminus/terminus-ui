/**
 * Define the allowed keys and types for an item passed to the {@link TsMenuComponent}
 *
 * @interface
 */
export interface MenuItem {
  /**
   * The menu item name
   */
  name: string;

  /**
   * The icon name
   */
  icon: string;

  /**
   * The action attached to the menu item
   */
  action: string;
}
