/**
 * Base allowed keys for an item passed to the {@link TsNavigationComponent}
 */
export interface NavigationItemBase {
  /**
   * The value to use as the item text
   */
  name: string;

  /**
   * Define if the item should only be allowed in the secondary navigation
   */
  // TODO: API change
  alwaysHidden: boolean;

  /**
   * Define if the item is disabled
   */
  isDisabled?: boolean;

  /**
   * Define if the item is for admin functionality only
   */
  // TODO: API change
  isForAdmin?: boolean;
}


/**
 * Link specific keys for an item passed to the {@link TsNavigationComponent}
 */
export interface TsNavigationLinkItem extends NavigationItemBase {
  /**
   * The destination for items with a 'navigate' action. Single strings are used for external
   * locations while an array of strings are used for routerLinks
   */
  destination: string | string[];
}


/**
 * Action specific keys for an item passed to the {@link TsNavigationComponent}
 */
export interface TsNavigationActionItem extends NavigationItemBase {
  /**
   * The action to emit upon interaction
   */
  action: {
    type: string;
  };
}


/**
 * Define the allowed keys and types for an item passed to the {@link TsNavigationComponent}
 */
export type TsNavigationItem = TsNavigationLinkItem | TsNavigationActionItem;
