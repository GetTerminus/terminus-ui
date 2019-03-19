import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { merge, Subscription } from 'rxjs';

import { TsTabHeaderComponent } from './../header/tab-header.component';
import { TsTabComponent } from './../tab/tab.component';


/**
 * A change event emitted on focus or selection changes
 */
export class TsTabChangeEvent {
  constructor(
    public index: number,
    public tab: TsTabComponent | null,
  ) {}
}

/**
 * Possible horizontal layout alignment choices for header tabs
 */
export type TsTabAlignmentOptions
  = 'start'
  | 'center'
  | 'end'
  | 'stretch'
;

/**
 * Possible positions for the tab header
 */
export type TsTabHeaderPosition
  = 'above'
  | 'below'
;

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A collection of {@link TsTabComponent}s
 *
 * @example
 * <ts-tab-collection
 *               headerPosition="above"
 *               [selectedIndex]="2"
 *               tabAlignment="start"
 *               theme="primary"
 *               (animationFinished)="myFunc()"
 *               (focusChange)="myFunc($event)"
 *               (selectedIndexChange)="myFunc($event)"
 *               (selectedTabChange)="myFunc($event)"
 * >
 *              <ts-tab label="First">
 *                Content 1
 *              </ts-tab>
 *
 *              <ts-tab label="Second">
 *                Content 2
 *              </ts-tab>
 * </ts-tab-collection>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/tabs</example-url>
 */
@Component({
  selector: 'ts-tab-collection',
  templateUrl: './tab-collection.component.html',
  styleUrls: ['./tab-collection.component.scss'],
  host: {
    class: 'ts-tab-collection',
    '[class.ts-tab-collection--inverted-header]': 'headerPosition === "below"',
    // Themes:
    '[class.ts-tab-collection--primary]': 'theme === "primary"',
    '[class.ts-tab-collection--accent]': 'theme === "accent"',
    '[class.ts-tab-collection--warn]': 'theme === "warn"',
    // Tab alignment:
    '[class.ts-tab-collection--start]': 'tabAlignment === "start"',
    '[class.ts-tab-collection--center]': 'tabAlignment === "center"',
    '[class.ts-tab-collection--end]': 'tabAlignment === "end"',
    '[class.ts-tab-collection--stretch]': 'tabAlignment === "stretch"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsTabCollection',
})
export class TsTabCollectionComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
  /**
   * A unique ID per instance
   */
  protected collectionId: number = nextUniqueId++;

  /**
   * Internal reference used to enable two-way binding for `selectedIndex`
   */
  private _indexToSelect: number | null = 0;

  /**
   * Snapshot of the height of the tab body wrapper before another tab is activated
   */
  private tabBodyWrapperHeight = 0;

  /**
   * Subscription to tabs being added or removed
   */
  private tabsSubscription = Subscription.EMPTY;

  /**
   * Subscription to changes in the tab labels
   */
  private tabLabelSubscription = Subscription.EMPTY;

  /**
   * Reference for the wrapper around the tabs
   */
  @ViewChild('tabBodyWrapper')
  public tabBodyWrapper: ElementRef;

  /**
   * Reference for the tab header
   *
   * NOTE: We are using a template reference rather than class reference because the template needs to reference this also.
   */
  @ViewChild('tabHeader')
  public tabHeader: TsTabHeaderComponent;

  /**
   * Reference for the collection of tabs
   */
  @ContentChildren(TsTabComponent)
  public tabs: QueryList<TsTabComponent>;

  /**
   * Define the position of the tab header
   */
  @Input()
  public headerPosition: TsTabHeaderPosition = 'above';

  /**
   * Define the index of the active tab
   */
  @Input()
  public set selectedIndex(value: number | null) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  public get selectedIndex(): number | null {
    return this._selectedIndex;
  }
  private _selectedIndex: number | null = null;

  /**
   * Define the horizontal layout for the tabs
   */
  @Input()
  public tabAlignment: TsTabAlignmentOptions = 'start';

  /**
   * Define the theme for the tabs
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Event emitted when the body animation has completed
   */
  @Output()
  readonly animationFinished: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when focus has changed within a tab collection
   */
  @Output()
  readonly focusChange: EventEmitter<TsTabChangeEvent> = new EventEmitter<TsTabChangeEvent>();

  /**
   * Event emitted when the selected index changes.
   *
   * NOTE: This is to enable support for two-way binding on `[(selectedIndex)]`
   */
  @Output()
  readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event emitted when the tab selection has changed
   */
  @Output()
  readonly selectedTabChange: EventEmitter<TsTabChangeEvent> = new EventEmitter<TsTabChangeEvent>(true);


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Set up tab and label subscriptions
   */
  public ngAfterContentInit(): void {
    this.subscribeToTabLabels();

    // Subscribe to changes in the amount of tabs, in order to be able to re-render the content as new tabs are added or removed
    this.tabsSubscription = this.tabs.changes.pipe(untilComponentDestroyed(this)).subscribe(() => {
      const indexToSelect = this.clampTabIndex(this._indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no explicit change that selects a different tab
      if (indexToSelect === this._selectedIndex) {
        const tabs = this.tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            this._indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }

      this.subscribeToTabLabels();
      this.changeDetectorRef.markForCheck();
    });
  }


  /**
   * After the content is checked, this component knows what tabs have been defined and what the selected index should be. This is where we
   * can know exactly what position each tab should be in according to the new selected index, and additionally we know how a new selected
   * tab should transition in (from the left or right).
   */
  public ngAfterContentChecked(): void {
    // Don't clamp the `selectedIndex` immediately in the setter because it can happen that the amount of tabs changes before the actual
    // change detection runs
    const indexToSelect = this._indexToSelect = this.clampTabIndex(this._indexToSelect);

    // If there is a change in selected index, emit a change event.
    // This should not trigger if the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect) {
      const isFirstRun = this.selectedIndex === null;

      if (!isFirstRun) {
        this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
      }

      // Defer changing these values until after change detection has run since the checked content may contain references to them
      Promise.resolve().then(() => {
        this.tabs.forEach((tab, index) => tab.isActive = index === indexToSelect);

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
        }
      });

    }

    // Set up the position for each tab and optionally setup an origin on the next selected tab
    this.tabs.forEach((tab: TsTabComponent, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab if it doesn't have one already
      if (this._selectedIndex !== null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this.changeDetectorRef.markForCheck();
    }
  }


  public ngOnDestroy(): void {
    // Needed for untilComponentDestroyed
  }


  /**
   * Re-align the ink bar to the selected tab element
   */
  public realignInkBar(): void {
    // istanbul ignore else
    if (this.tabHeader) {
      this.tabHeader.alignInkBarToSelectedTab();
    }
  }


  /**
   * Emit an event for focus change
   *
   * @param index - The focused index
   */
  public focusChanged(index: number): void {
    this.focusChange.emit(this.createChangeEvent(index));
  }


  /**
   * Return a unique id for each tab label element
   *
   * @param index - The current index
   * @return The ID
   */
  public getTabLabelId(index: number): string {
    return `ts-tab-label-${this.collectionId}-${index}`;
  }

  /**
   * Return a unique id for each tab content element
   *
   * @param index - The current index
   * @return The ID
   */
  public getTabContentId(index: number): string {
    return `ts-tab-content-${this.collectionId}-${index}`;
  }

  /**
   * Set the height of the body wrapper to the height of the activating tab
   *
   * @param tabHeight - The desired tab height
   */
  public setTabBodyWrapperHeight(tabHeight: number): void {
    if (!this.tabBodyWrapperHeight) {
      return;
    }

    const wrapper: HTMLElement = this.tabBodyWrapper.nativeElement;
    wrapper.style.height = `${this.tabBodyWrapperHeight}px`;

    // NOTE: This conditional forces the browser to paint the height so that the animation to the new height can have an origin
    if (this.tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = `${tabHeight}px`;
    }
  }


  /**
   * Remove the height of the tab body wrapper
   */
  public removeTabBodyWrapperHeight(): void {
    const wrapper = this.tabBodyWrapper.nativeElement;
    this.tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this.animationFinished.emit();
  }


  /**
   * Handle click events & set a new selected index if appropriate
   *
   * @param tab - The tab that was clicked
   * @param tabHeader - The header of the tab that was clicked
   * @param index - The index of the tab that was clicked
   */
  public handleClick(tab: TsTabComponent, tabHeader: TsTabHeaderComponent, index: number): void {
    if (!tab.isDisabled) {
      this.selectedIndex = tabHeader.focusIndex = index;
    }
  }


  /**
   * Retrieve the tabindex for the tab
   *
   * @param tab - The tab
   * @param index - The index of the tab
   * @return The tabindex number
   */
  public getTabIndex(tab: TsTabComponent, index: number): number | null {
    if (tab.isDisabled) {
      return null;
    }
    return this.selectedIndex === index ? 0 : -1;
  }


  /**
   * Subscribes to changes in the tab labels.
   *
   * This is needed, because the @Input for the label is on the {@link TsTabComponent}, whereas the data binding is inside the
   * {@link TsTabCollectionComponent}. In order for the binding to be updated, we need to subscribe to changes in it and trigger change
   * detection manually.
   */
  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }

    this.tabLabelSubscription = merge(...this.tabs.map((tab) => tab.stateChanges))
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }


  /**
   * Clamps the given index to the bounds of 0 and the tabs length
   *
   * @param index - The index
   * @return The clamped index
   */
  private clampTabIndex(index: number | null): number {
    // NOTE: Using `|| 0` ensures that values like NaN can't get through and which would otherwise throw the component into an infinite
    // loop (since `Math.max(NaN, 0) === NaN`).
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }


  /**
   * Create a new change event
   *
   * @param index - The tab index
   * @return The change event
   */
  private createChangeEvent(index: number): TsTabChangeEvent {
    let tab: TsTabComponent | null = null;
    if (this.tabs && this.tabs.length) {
      tab = this.tabs.toArray()[index];
    }
    return new TsTabChangeEvent(index, tab);
  }
}
