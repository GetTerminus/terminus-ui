import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation,
} from '@angular/core';
import { TsTabHeaderDirective } from './tab-header.directive';
import { TsTabContentDirective } from './tab-content.directive';
import { Tab } from './tab';

@Component({
  selector: 'ts-tabset',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TsTabsetComponent implements AfterContentInit {

  /**
   * List of all Headers
   */
  @ContentChildren(TsTabHeaderDirective)
  private _tabHeaders!: QueryList<TsTabHeaderDirective>;

  /**
   * List of all Contents
   */
  @ContentChildren(TsTabContentDirective)
  private _tabContents!: QueryList<TsTabContentDirective>;

  /**
   * List of all tabs in the tabset.
   */
  public tabs: Tab[];

  /**
   * Active Tab data.
   */
  private _activeTab!: Tab;

  /**
   * Returns the active Tab.
   */
  public get activeTab(): Tab {
    return this._activeTab;
  }

  /**
   * Setting the active Tab and changing isActive property to true.
   */
  public set activeTab(tab: Tab) {
    this._activeTab = tab;
    tab.isActive = true;
  }

  /**
   * Tracks the internalComponentsUpdate count.
   */
  private _barrierCount: number;

  constructor() {
    this.tabs = [];
    this._barrierCount = 0;
  }

  public ngAfterContentInit(): void {
    /**
     * internalComponentsUpdated is triggered when queryList changes.
     */
    this._tabHeaders.changes.subscribe(() => this.internalComponentsUpdated());
    this._tabContents.changes.subscribe(() => this.internalComponentsUpdated());

    /**
     * Initial Loading of tabs.
     */
    this.loadTabs();
  }

  /**
   * Triggered when headers or contents get updated.
   */
  private internalComponentsUpdated(): void {
    this._barrierCount++;
    /**
     * We are using a counting barrier of n = 2 to ensure that loadTabs()
     * only runs after both headers and contents query lists are updated.
     */
    if (this._barrierCount === 2) {
      /**
       * Resetting the barrier count.
       */
      this._barrierCount = 0;

      /**
       * Updating the tabs.
       */
      this.loadTabs();
    }
  }

  /**
   * Creates a Tab by connecting tab headers to tab contents,
   * by filtering out the tabs which no longer have an associated header.
   */
  private loadTabs(): void {
    this.tabs = this.tabs.filter(
      (t) => !!this._tabHeaders.find((tH) => tH === t.header),
    );

    this._tabHeaders
      /**
       * Filter out the already loaded headers with attached tab instances.
       */
      .filter((tH) => !this.tabs.find((t) => t.header === tH))
      .forEach((tH) => {
        const content = this._tabContents.find(
          (tC) => tC.tsTabContent === tH.tsTabHeader,
        );

        if (!content) {
          /**
           * Throw error if no associated tab content found for the given header.
           */
          throw new Error(
            'A [tsTabHeader] must have a related [tsTabContent].',
          );
        }

        /**
         * Create a new Tab instance for the provided header and content
         */
        const tab = new Tab(tH, content);

        /**
         * Subscribe to any external changes in the tab header's active state.
         *
         * External changes are triggerd by user input.
         */
        tab.header.isActiveExternalChange.subscribe(() =>
          this.onHeaderActiveChanged(tab),
        );

        /**
         * Add the new instatce to the tabs list.
         */
        this.tabs.push(tab);
      });

    /**
     * Assigning index to each tab ( which denotes the order of display ).
     */
    this._tabHeaders.forEach((tH, i) => {
      const tab = this.tabs.find((t) => t.header === tH);
      if (tab) {
        tab.index = i;
      }
    });

    /**
     * Sort tabs by their index.
     */
    this.tabs.sort((a, b) => a.index - b.index);

    /**
     * Active first tab if there is no current existing active tabs.
     */
    if (!this.activeTab) {
      this.activateFirstTab();
    } else if (!this.tabs.find((t) => t === this.activeTab)) {
      /**
       * Check if current active tab has been delete, if so find the closest one.
       *
       * Use 'setTimeout' as this causes a 'changed after checked' error o'wise.
       */
      setTimeout(() => this.activateClosestTab(this.activeTab));
    }

    /**
     * Throw error if there aren't any tabs in tabset.
     */
    if (this.tabs.length === 0) {
      throw new Error('You cannot have no tabs!');
    }
  }

  /**
   * Triggered whenever a tab header's active state is externally changed.
   *
   * @param tab - Tab
   */
  private onHeaderActiveChanged(tab: Tab): void {
    /**
     * If tab become active and was not active previously
     *
     * Deactivate all of the other tabs and set the tab as active.
     */
    if (tab.isActive && this.activeTab !== tab) {
      this.tabs.filter((t) => t !== tab).forEach((t) => (t.isActive = false));

      this.activeTab = tab;
    }

    /**
     * If tab become deactive, but was active before
     *
     * Activate the closest tab to it.
     */
    if (!tab.isActive && this.activeTab === tab) {
      this.activateClosestTab(tab);
    }
  }

  /**
   * Active the first tab in the list.
   */
  public activateFirstTab(): void {
    this.activeTab = this.tabs[0];
  }

  // Activates the closest available tab to a given one.
  /**
   * Activates the closest available tab to a given one.
   *
   * @param tab - Tab
   */
  public activateClosestTab(tab: Tab): void {
    /**
     * closest Tab
     */
    let nextAvailable!: Tab;

    // When the exited tab's index is higher than all available tabs,
    /**
     * Activate the last tab.
     */
    if (tab.index >= this.tabs.length) {
      nextAvailable = this.tabs[this.tabs.length - 1];
    }

    /**
     * If nextAvailable is empty after the above condition.
     */
    if (!nextAvailable) {
      /**
       * When the exited tab no longer exists, replace it with a tab at the same index.
       */
      if (!this.tabs.find((t) => t === tab)) {
        nextAvailable = this.tabs[tab.index];
      } else {
        /**
         * If exited tab still exists, go to the left tab.
         */
        nextAvailable = this.tabs[Math.max(tab.index - 1, 0)];
      }
    }

    // However, if the chosen tab is disabled,
    /**
     * If chosen tab is disabled again check for the closest tab and activate it.
     */
    if (nextAvailable.isDisabled) {
      return this.activateClosestTab(nextAvailable);
    }
    this.activeTab = nextAvailable;
  }
}
