import { FocusKeyManager } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/overlay';
import {
  normalizePassiveListenerOptions,
  Platform,
} from '@angular/cdk/platform';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  isNumber,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import {
  END,
  ENTER,
  HOME,
  SPACE,
} from '@terminus/ngx-tools/keycodes';
import {
  fromEvent,
  merge,
  Subject,
  timer,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TsTabInkBarComponent } from './../ink-bar/ink-bar.component';
import { TsTabLabelWrapperDirective } from './../label/tab-label-wrapper.directive';


/**
 * Config used to bind passive event listeners
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({passive: true}) as EventListenerOptions;

/**
 * The directions that scrolling can go in when the header's tabs exceed the header width. 'After' will scroll the header towards the end of
 * the tabs list and 'before' will scroll towards the beginning of the list.
 */
export type TsScrollDirection = 'after' | 'before';

/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps provide a small affordance to the label
 * next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;

/**
 * Amount of milliseconds to wait before starting to scroll the header automatically.
 *
 * NOTE: This is set a little conservatively in order to handle fake events dispatched on touch devices.
 */
const HEADER_SCROLL_DELAY = 650;

/**
 * Interval in milliseconds at which to scroll the header while the user is holding their pointer.
 */
const HEADER_SCROLL_INTERVAL = 100;


/**
 * The header of the tab collection which displays a list of all the tabs in the tab collection. Includes an ink bar that follows the
 * currently selected tab. When the tabs list's width exceeds the width of the header container, then arrows will be displayed to allow the
 * user to scroll left and right across the header.
 *
 * NOTE: Only used internally.
 */
@Component({
  selector: 'ts-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  host: {
    class: 'ts-tab-header',
    '[class.ts-tab-header__pagination--enabled]': 'showPaginationControls',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsTabHeader',
})
export class TsTabHeaderComponent implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {
  /**
   * Cached text content of the header
   */
  private currentTextContent!: string;

  /**
   * Whether the tab list can be scrolled more towards the end of the tab label list
   */
  public disableScrollAfter = true;

  /**
   * Whether the tab list can be scrolled more towards the beginning of the tab label list
   */
  public disableScrollBefore = true;

  /**
   * Manually set the focus to the correct label
   */
  public set focusIndex(value: number) {
    if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
      return;
    }

    this.keyManager.setActiveItem(value);
  }

  /**
   * Tracks which element has focus (used for keyboard navigation)
   */
  public get focusIndex(): number {
    if (this.keyManager && isNumber(this.keyManager.activeItemIndex)) {
      return this.keyManager.activeItemIndex;
    }

    return 0;
  }

  /**
   * Used to manage focus between the tabs
   */
  private keyManager!: FocusKeyManager<TsTabLabelWrapperDirective>;

  /**
   * Sets the distance in pixels that the tab header should be transformed in the X-axis
   */
  public set scrollDistance(value: number) {
    this.scrollTo(value);
  }
  public get scrollDistance(): number {
    return this._scrollDistance;
  }
  /**
   * The distance in pixels that the tab labels should be translated to the left
   */
  private _scrollDistance = 0;

  /**
   * Whether the scroll distance has changed and should be applied after the view is checked
   */
  private scrollDistanceChanged = false;

  /**
   * Whether the header should scroll to the selected index after the view has been checked
   */
  private selectedIndexChanged = false;

  /**
   * Whether the controls for pagination should be displayed
   */
  public showPaginationControls = false;

  /**
   * Stream that will stop the automated scrolling
   */
  private stopScrolling = new Subject<void>();

  /**
   * The number of tab labels that are displayed on the header
   *
   * When this changes, the header should re-evaluate the scroll position.
   */
  private tabLabelCount!: number;

  /**
   * Reference to the ink bar (underline element for the selected tab)
   */
  // FIXME: Add `{static: true}` once Angular v8 hits
  @ViewChild(TsTabInkBarComponent)
  public inkBar: TsTabInkBarComponent;

  /**
   * Reference for the list of individual label wrappers
   */
  @ContentChildren(TsTabLabelWrapperDirective)
  public labelWrappers: QueryList<TsTabLabelWrapperDirective>;

  /**
   * Reference to the paginator that reveals tabs at the beginning of the list
   */
  @ViewChild('previousPaginator')
  public previousPaginator: ElementRef<HTMLElement>;

  /**
   * Reference to the paginator that reveals tabs at the end of the list
   */
  @ViewChild('nextPaginator')
  public nextPaginator: ElementRef<HTMLElement>;

  /**
   * Reference to the inner container for the list of tabs
   */
  // FIXME: Add `{static: true}` once Angular v8 hits
  @ViewChild('tabList')
  public tabList: ElementRef;

  /**
   * Reference to the outer container for the list of tabs
   */
  // FIXME: Add `{static: true}` once Angular v8 hits
  @ViewChild('tabListContainer')
  public tabListContainer: ElementRef;

  /**
   * The index of the active tab
   */
  @Input()
  public set selectedIndex(value: number) {
    value = coerceNumberProperty(value);
    this.selectedIndexChanged = this._selectedIndex !== value;
    this._selectedIndex = value;

    if (this.keyManager) {
      this.keyManager.updateActiveItemIndex(value);
    }
  }
  public get selectedIndex(): number {
    return this._selectedIndex;
  }
  private _selectedIndex = 0;

  /**
   * Event emitted when a label is focused
   */
  @Output()
  readonly indexFocused: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event emitted when the option is selected
   */
  @Output()
  readonly selectFocusedIndex: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private viewportRuler: ViewportRuler,
    private ngZone: NgZone,
    private platform: Platform,
  ) {
    const bindEvent = () => {
      fromEvent(elementRef.nativeElement , 'mouseleave')
        .pipe(untilComponentDestroyed(this))
        .subscribe(() => {
          this.stopInterval();
        });
    };

    // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
    ngZone.runOutsideAngular(bindEvent);
  }


  /**
   * After content is checked, update internals as needed
   */
  public ngAfterContentChecked(): void {
    // If the number of tab labels have changed, check if scrolling should be enabled
    if (this.tabLabelCount !== this.labelWrappers.length) {
      this.updatePagination();
      this.tabLabelCount = this.labelWrappers.length;
      this.changeDetectorRef.markForCheck();
    }

    // If the selected index has changed, scroll to the label and check if the scrolling controls
    // should be disabled.
    if (this.selectedIndexChanged) {
      this.scrollToLabel(this.selectedIndex);
      this.checkScrollingControls();
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
      this.changeDetectorRef.markForCheck();
    }

    // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
    // then translate the header to reflect this.
    if (this.scrollDistanceChanged) {
      this.updateTabScrollPosition();
      this.scrollDistanceChanged = false;
      this.changeDetectorRef.markForCheck();
    }
  }


  /**
   * Align the {@link TsTabInkBarComponent} to the selected tab on load
   */
  public ngAfterContentInit(): void {
    const realign = () => {
      this.updatePagination();
      this.alignInkBarToSelectedTab();
    };

    this.keyManager = new FocusKeyManager(this.labelWrappers)
      .withHorizontalOrientation('ltr')
      .withWrap();

    this.keyManager.updateActiveItem(0);

    // Defer the first call in order to allow for slower browsers to lay out the elements.
    // This helps in cases where the user lands directly on a page with paginated tabs.
    typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(realign) : realign();

    // On window resize, realign the ink bar.
    this.viewportRuler.change(150).pipe(untilComponentDestroyed(this)).subscribe(() => {
      realign();
    });

    // If there is a change in the focus key manager we need to emit the `indexFocused`
    // event in order to provide a public event that notifies about focus changes. Also we realign
    // the tabs container by scrolling the new focused tab into the visible section.
    this.keyManager.change.pipe(untilComponentDestroyed(this)).subscribe(newFocusIndex => {
      this.indexFocused.emit(newFocusIndex);
      this.setTabFocus(newFocusIndex);
    });
  }


  /**
   * Wire up listeners for pagination clicks
   * NOTE: We need to handle these events manually because we want to bind passive event listeners.
   */
  public ngAfterViewInit(): void {
    fromEvent(this.previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.handlePaginatorPress('before');
      });

    fromEvent(this.nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.handlePaginatorPress('after');
      });
  }


  public ngOnDestroy(): void {
    // Needed for untilComponentDestroyed
  }


  /**
   * Handle keyboard events on the header
   *
   * @param event - The keyboard event
   */
  public handleKeydown(event: KeyboardEvent): void {
    // We don't handle any key bindings with a modifier key.
    if (hasModifierKey(event)) {
      return;
    }

    switch (event.keyCode) {
      case HOME:
        this.keyManager.setFirstItemActive();
        event.preventDefault();
        break;
      case END:
        this.keyManager.setLastItemActive();
        event.preventDefault();
        break;
      case ENTER:
      case SPACE:
        this.selectFocusedIndex.emit(this.focusIndex);
        event.preventDefault();
        break;
      default:
        this.keyManager.onKeydown(event);
    }
  }


  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  public onContentChanges(): void {
    const textContent = this.elementRef.nativeElement.textContent;

    // We need to diff the text content of the header, because the MutationObserver callback will fire even if the text content didn't
    // change which is inefficient and is prone to infinite loops if a poorly constructed expression is passed in.
    // See https://github.com/angular/material2/issues/14249
    if (textContent !== this.currentTextContent) {
      this.currentTextContent = textContent;

      const zoneCallback = () => {
        this.updatePagination();
        this.alignInkBarToSelectedTab();
        this.changeDetectorRef.markForCheck();
      };

      // The content observer runs outside the `NgZone` by default, which means that we need to bring the callback back in ourselves
      this.ngZone.run(zoneCallback);
    }
  }


  /**
   * Handle click events on the pagination arrows
   *
   * @param direction - The scroll direction
   */
  public handlePaginatorClick(direction: TsScrollDirection): void {
    this.stopInterval();
    this.scrollHeader(direction);
  }


  /**
   * Tell the {@link TsInkBarComponent} to align itself to the current label wrapper
   */
  public alignInkBarToSelectedTab(): void {
    const labelWrappersExist = this.labelWrappers && this.labelWrappers.length;
    const selectedLabelWrapper = labelWrappersExist ? this.labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement : null;

    this.inkBar.alignToElement(selectedLabelWrapper);
  }


  /**
   * Stop the currently-running paginator interval
   */
  public stopInterval(): void {
    this.stopScrolling.next();
  }


  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   *
   * @param direction - The direction to scroll
   */
  public handlePaginatorPress(direction: TsScrollDirection): void {
    // Avoid overlapping timers.
    this.stopInterval();

    // Start a timer after the delay and keep firing based on the interval
    timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
      // Keep the timer going until something tells it to stop or the component is destroyed
      .pipe(
        untilComponentDestroyed(this),
        takeUntil(this.stopScrolling),
      )
      .subscribe(() => {
        const {maxScrollDistance, distance} = this.scrollHeader(direction);

        // Stop the timer if we've reached the start or the end
        if (distance === 0 || distance >= maxScrollDistance) {
          this.stopInterval();
        }
      });
  }


  /**
   * Updates the view whether pagination should be enabled or not
   *
   * NOTE: Calling this method can be very costly in terms of performance.  It should be called as infrequently as possible from outside
   * of the {@link TsTabComponent} as it causes a reflow of the page.
   */
  private updatePagination(): void {
    this.checkPaginationEnabled();
    this.checkScrollingControls();
    this.updateTabScrollPosition();
  }


  /**
   * Determines if an index is valid
   *
   * If the tabs are not ready yet, we assume that the user is providing a valid index and return true.
   *
   * @param index - The index to check
   */
  private isValidIndex(index: number): boolean {
    if (!this.labelWrappers) {
      return true;
    }

    const tab = this.labelWrappers.toArray()[index] || null;
    return !!tab && !tab.isDisabled;
  }


  /**
   * Sets focus on the HTML element for the label wrapper and scrolls it into the view if scrolling is enabled
   *
   * @param tabIndex - The index of the tab to focus
   */
  private setTabFocus(tabIndex: number): void {
    if (this.showPaginationControls) {
      this.scrollToLabel(tabIndex);
    }

    if (this.labelWrappers && this.labelWrappers.length) {
      this.labelWrappers.toArray()[tabIndex].focus();

      // Do not let the browser manage scrolling to focus the element, this will be handled by using translation.
      this.tabListContainer.nativeElement.scrollLeft = 0;
    }
  }


  /**
   * Perform the CSS transformation on the tab list that will cause the list to scroll
   */
  private updateTabScrollPosition(): void {
    const scrollDistance = this.scrollDistance;
    const platform = this.platform;
    const translateX = -scrollDistance;

    // Don't use `translate3d` here because we don't want to create a new layer. A new layer seems to cause flickering and overflow in
    // Internet Explorer. For example, the ink bar and ripples will exceed the boundaries of the visible tab bar.
    // See https://github.com/angular/material2/issues/10276
    //
    // We round the `transform` here, because transforms with sub-pixel precision cause some browsers to blur the content of the element.
    const value = Math.round(translateX);
    this.tabList.nativeElement.style.transform = `translateX(${value}px)`;

    // Setting the `transform` on IE will change the scroll offset of the parent, causing the position to be thrown off in some cases. We
    // have to reset it ourselves to ensure that it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing with
    // the scroll position throws off Chrome 71+ in RTL mode.
    // See https://github.com/angular/material2/issues/14689
    if (platform.TRIDENT || platform.EDGE) {
      this.tabListContainer.nativeElement.scrollLeft = 0;
    }
  }


  /**
   * Move the tab list in the 'before' or 'after' direction (towards the beginning of the list or the end of the list, respectively).
   * The distance to scroll is computed to be a third of the length of the tab list view window.
   *
   * NOTE: This is an expensive call that forces a layout reflow to compute box and scroll metrics and should be called sparingly.
   *
   * @param direction - The scroll direction
   * @return An object defining scroll limitations
   */
  private scrollHeader(direction: TsScrollDirection): {'maxScrollDistance': number; distance: number} {
    const viewLength = this.tabListContainer.nativeElement.offsetWidth;

    // Move the scroll distance one-third the length of the tab list's viewport.
    const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 3;

    return this.scrollTo(this._scrollDistance + scrollAmount);
  }


  /**
   * Move the tab list such that the desired tab label (marked by index) is moved into view
   *
   * NOTE: This is an expensive call that forces a layout reflow to compute box and scroll metrics and should be called sparingly.
   *
   * @param labelIndex - The index of the label to scroll into view
   */
  private scrollToLabel(labelIndex: number): void {
    const selectedLabel = this.labelWrappers ? this.labelWrappers.toArray()[labelIndex] : null;

    if (!selectedLabel) {
      return;
    }

    const viewLength = this.tabListContainer.nativeElement.offsetWidth;
    const labelBeforePosition = selectedLabel.offsetLeft;
    const labelAfterPosition = labelBeforePosition + selectedLabel.offsetWidth;
    const beforeVisiblePosition = this.scrollDistance;
    const afterVisiblePosition = this.scrollDistance + viewLength;

    if (labelBeforePosition < beforeVisiblePosition) {
      // Scroll header to move label to the 'before' direction
      this.scrollDistance -= beforeVisiblePosition - labelBeforePosition + EXAGGERATED_OVERSCROLL;
    } else if (labelAfterPosition > afterVisiblePosition) {
      // Scroll header to move label to the 'after' direction
      this.scrollDistance += labelAfterPosition - afterVisiblePosition + EXAGGERATED_OVERSCROLL;
    }
  }


  /**
   * Evaluate whether the pagination controls should be displayed
   *
   * If the scroll width of the tab list is wider than the size of the header container, then the pagination controls should be shown.
   *
   * NOTE: This is an expensive call that forces a layout reflow to compute box and scroll metrics and should be called sparingly.
   */
  public checkPaginationEnabled(): void {
    const isEnabled = this.tabList.nativeElement.scrollWidth > this.elementRef.nativeElement.offsetWidth;

    if (!isEnabled) {
      this.scrollDistance = 0;
    }

    if (isEnabled !== this.showPaginationControls) {
      this.changeDetectorRef.markForCheck();
    }

    this.showPaginationControls = isEnabled;
  }


  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   *
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the before button. If the header is at the
   * end of the list (scroll distance is equal to the maximum distance we can scroll), then disable the after button.
   *
   * NOTE: This is an expensive call that forces a layout reflow to compute box and scroll metrics and should be called sparingly.
   */
  private checkScrollingControls(): void {
    this.disableScrollBefore = this.scrollDistance === 0;
    this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Determine what is the maximum length in pixels that can be set for the scroll distance
   *
   * This is equal to the difference in width between the tab list container and tab header container.
   *
   * NOTE: This is an expensive call that forces a layout reflow to compute box and scroll metrics and should be called sparingly.
   *
   * @return The maximum scroll distance
   */
  private getMaxScrollDistance(): number {
    const lengthOfTabList = this.tabList.nativeElement.scrollWidth;
    const viewLength = this.tabListContainer.nativeElement.offsetWidth;
    return (lengthOfTabList - viewLength) || 0;
  }


  /**
   * Scroll the header to a given position
   *
   * @param position - The position to scroll to
   * @returns An object defining the desired scroll position
   */
  private scrollTo(position: number): {'maxScrollDistance': number; distance: number} {
    const maxScrollDistance = this.getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));

    // Mark that the scroll distance has changed so that after the view is checked, the CSS transformation can move the header
    this.scrollDistanceChanged = true;
    this.checkScrollingControls();

    return {maxScrollDistance, distance: this._scrollDistance};
  }

}
