import {
  Component,
  Input,
  Output,
  ViewChildren,
  ViewChild,
  QueryList,
  AfterViewInit,
  ElementRef,
  HostListener,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
  TsNavigationItem,
  TsNavigationPayload,
  TsUser,
} from './../utilities/interfaces/';
import { groupBy } from './../utilities/groupBy';


/**
 * This is the navigation UI Component
 *
 * -- QA CSS CLASSES
 *
 * qa-navigation : Placed on the nav element which contains this component
 *
 * qa-navigation-items : Placed on the div element which contains the navigation items
 *
 * qa-navigation-item : Placed on the button elements which represent each visible navigation item
 *
 * qa-navigation-secondary-trigger : Placed on the button element which displays the drop down containing secondary links when clicked
 *
 * qa-navigation-secondary-items : Placed on the md-menu element which contains the secondary navigation items
 *
 * qa-navigation-secondary-item : Placed on the button elements which represent each secondary navigation item
 *
 * @example
 * <ts-navigation
 *              [items]="navigationItems$ | async"
 *              [user]="currentUser$ | async"
 *              [welcomeMessage]=" 'Hi!' "
 *              (itemSelected)="myMethod($event)"
 * ></ts-navigation>
 */
@Component({
  selector: 'ts-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class TsNavigationComponent implements OnInit, AfterViewInit {
  /**
   * @private Store a pristine copy of the navigation items
   */
  _pristineItems: TsNavigationItem[];

  /**
   * @private Getter to return the available navigation width
   */
  get availableSpace(): number {
    const NAV_WIDTH_BUFFER = 10;

    return this.visibleItemsList.nativeElement.offsetWidth - NAV_WIDTH_BUFFER;
  }

  /**
   * Define an array of widths at which to break the navigation
   */
  public breakWidths: number[] = [];

  /**
   * Define the list of hidden items
   */
  public hiddenItems: BehaviorSubject<TsNavigationItem[]> = new BehaviorSubject([]);

  /**
   * Getter to return the count of hidden items
   */
  get hiddenItemsLength(): number {
    return this.hiddenItems.getValue().length;
  }

  /**
   * @private Getter to return the space currently required for the navigation layout
   */
  get requiredSpace(): number {
    return this.breakWidths[this.visibleItemsLength - 1];
  }

  /**
   * Getter to return the user's full name if it exists
   */
  get usersFullName(): string | null {
    const userExists = this.user ? true : false;
    const nameExists = userExists && (this.user.fullName.length > 0);

    return (userExists && nameExists) ? this.user.fullName : null;
  }

  /**
   * My definition
   */
  public visibleItems: BehaviorSubject<TsNavigationItem[]> = new BehaviorSubject([]);

  /**
   * Getter to return the count of visible items
   */
  get visibleItemsLength(): number {
    return this.visibleItems.getValue().length;
  }

  /**
   * Define the navigation items
   */
  @Input('items')
  set items(value: TsNavigationItem[]) {
    // Filter out disabled items
    const enabledItems = value.filter((item) => {
      return !item.isDisabled;
    });

    this._pristineItems = enabledItems;
  }

  /**
   * Accept the user data
   */
  @Input('user')
  public user: TsUser;

  /**
   * Define the welcome message
   */
  @Input('welcomeMessage')
  public welcomeMessage: string = 'Welcome';

  /**
   * Element reference for visible list items
   */
  @ViewChild('visibleItemsList')
  public visibleItemsList: ElementRef;

  /**
   * Query list of all elements from the visible items list
   */
  @ViewChildren('visibleLinkElement')
  public visibleLinkElement: QueryList<ElementRef>;

  /**
   * Emit the click event with the {@link TsNavigationPayload}
   */
  @Output()
  public itemSelected: EventEmitter<TsNavigationPayload> = new EventEmitter;

  /**
   * Trigger a layout update when the window resizes
   */
  @HostListener('window:resize')
  onResize() {
    this.updateLists();
  }


  /**
   * Set up initial link groups
   */
  ngOnInit() {
    this.setUpInitialArrays(this._pristineItems);
  }


  /**
   * Trigger initial layout update after the view initializes
   */
  ngAfterViewInit() {
    let totalSpace = 0;

    // Loop through the visible links
    this.visibleLinkElement.forEach((item: ElementRef) => {
      // Tally up the total space
      totalSpace += item.nativeElement.offsetWidth;

      // Add the total space as a breakpoint
      this.breakWidths.push(totalSpace);
    })

    // Trigger the initial layout
    // HACK: This timeout is needed to stop the Error:
    // `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.`
    setTimeout(() => {
      this.updateLists();
    });
  }


  /**
   * Clone the nav items and split into the initially visible/hidden lists
   *
   * @param {Array} items The complete list of navigation items
   */
  setUpInitialArrays(items: TsNavigationItem[]): void {
    // Clone the items so we can work freely with the array.
    const allItems = Array.from(items);
    // Create an object with the arrays separated
    const splitArrays = groupBy(allItems, 'onlyHidden');

    // Push the separated arrays
    this.visibleItems.next(splitArrays.false);
    this.hiddenItems.next(splitArrays.true);
  }


  /**
   * @private Move items between the two lists as required by the available space
   */
  updateLists(): void {
    // If there is not enough space
    if (this.requiredSpace > this.availableSpace) {
      // Pull the last link out of the visible array
      const currentVisible = this.visibleItems.getValue();
      const itemToMove = currentVisible.pop();

      // Add it to the beginning of the hidden items array
      const updateHiddenArray = [itemToMove].concat(this.hiddenItems.getValue())

      // Push out the updated value
      this.hiddenItems.next(updateHiddenArray);

      // Trigger another layout check
      this.updateLists();
    } else if (this.availableSpace > this.breakWidths[this.visibleItemsLength]) {
      // Else, if there is more than enough space

      // Pull the first item from the hidden array
      const currentHidden = this.hiddenItems.getValue();
      const itemToMove = currentHidden.shift();
      const visibleArray: TsNavigationItem[] = this.visibleItems.getValue();

      // QUESTION[B$]: Why does `visibleArray.push(itemToMove)` return a number?
      const updatedVisibleArray: TsNavigationItem[] = visibleArray.concat([itemToMove]);

      // Add it to the end of the visible array
      this.visibleItems.next(updatedVisibleArray);
    }
  }

}
