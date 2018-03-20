/**
 * Define the allowed keys and types for an item passed to the {@link TsMenuComponent} within a
 * {@link TsPaginatorComponent}
 */
export interface TsPaginatorMenuItem {
  /**
   * The menu item name
   */
  name: string;

  /**
   * A value for the item
   */
  value?: string;
}
