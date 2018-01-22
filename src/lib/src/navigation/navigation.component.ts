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
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  TsNavigationItem,
  TsNavigationPayload,
  TsUser,
} from './../utilities/interfaces/';
import { groupBy } from './../utilities/groupBy';


/**
 * This is the navigation UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-navigation`: Placed on the nav element which contains this component
 * - `qa-navigation-items`: Placed on the div element which contains the navigation items
 * - `qa-navigation-item`: Placed on the button elements which represent each visible navigation
 * item
 * - `qa-navigation-secondary-trigger`: Placed on the button element which displays the drop down
 * containing secondary links when clicked
 * - `qa-navigation-secondary-items`: Placed on the menu element which contains the secondary
 * navigation items
 * - `qa-navigation-secondary-item`: Placed on the button elements which represent each secondary
 * navigation item
 *
 * @example
 * <ts-navigation
 *              [items]="navigationItems$ | async"
 *              [user]="currentUser$ | async"
 *              welcomeMessage="Hi!"
 *              (itemSelected)="myMethod($event)"
 * ></ts-navigation>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  host: {
    class: 'ts-navigation',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsNavigationComponent implements OnInit, AfterViewInit {
  /**
   * Store a pristine copy of the navigation items
   */
  private pristineItems: TsNavigationItem[];

  /**
   * Getter to return the available navigation width
   *
   * @return The available navigation space
   */
  private get availableSpace(): number {
    const NAV_WIDTH_BUFFER = 10;

    return this.visibleItemsList.nativeElement.offsetWidth - NAV_WIDTH_BUFFER;
  }

  /**
   * Define an array of widths at which to break the navigation
   */
  private breakWidths: number[] = [];

  /**
   * Define the list of hidden items
   */
  public hiddenItems: BehaviorSubject<TsNavigationItem[]> = new BehaviorSubject([]);

  /**
   * Getter to return the count of hidden items
   *
   * @return The number of hidden navigation items
   */
  private get hiddenItemsLength(): number {
    return this.hiddenItems.getValue().length;
  }

  /**
   * Getter to return the user's full name if it exists
   *
   * @return The user's full name
   */
  public get usersFullName(): string | null {
    const userExists = this.user ? true : false;
    const nameExists = userExists && (this.user.fullName.length > 0);

    return (userExists && nameExists) ? this.user.fullName : null;
  }

  /**
   * The collection of visible navigation items
   */
  public visibleItems: BehaviorSubject<TsNavigationItem[]> = new BehaviorSubject([]);

  /**
   * Getter to return the count of visible items
   *
   * @return The number of visible items
   */
  public get visibleItemsLength(): number {
    return this.visibleItems.getValue().length;
  }

  /**
   * Accept the array of navigation items and trigger setup
   */
  @Input()
  public set items(value: TsNavigationItem[]) {
    // Filter out disabled items
    const enabledItems = value.filter((item: TsNavigationItem) => {
      return !item.isDisabled;
    });

    this.pristineItems = enabledItems;
    this.setUpInitialArrays(this.pristineItems);
    this.generateBreakWidths();
    this.updateLists();
  }

  /**
   * Accept the user data
   */
  @Input()
  public user: TsUser;

  /**
   * Define the welcome message
   */
  @Input()
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
  public action: EventEmitter<TsNavigationPayload> = new EventEmitter;

  /**
   * Trigger a layout update when the window resizes
   */
  @HostListener('window:resize')
  onResize(): void {
    this.updateLists();
  }


  /**
   * Inject services
   */
  constructor(
   private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Set up initial link groups
   */
  public ngOnInit(): void {
    this.setUpInitialArrays(this.pristineItems);
  }


  /**
   * Trigger initial layout update after the view initializes
   */
  public ngAfterViewInit(): void {
    this.generateBreakWidths();
    this.updateLists();
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Generate the array of breakWidths
   */
  private generateBreakWidths(): void {
    let totalSpace = 0;
    this.breakWidths.length = 0;

    // Loop through the visible links
    this.visibleLinkElement.forEach((item: ElementRef) => {
      // Tally up the total space
      totalSpace += item.nativeElement.offsetWidth;

      // Add the total space as a breakpoint
      this.breakWidths.push(totalSpace);
    })
  }


  /**
   * Clone the nav items and split into the initially visible/hidden lists
   *
   * @param items - The complete list of navigation items
   */
  private setUpInitialArrays(items: TsNavigationItem[]): void {
    // Clone the items so we can work freely with the array.
    const allItems = Array.from(items);
    // Create an object with the arrays separated
    const splitArrays = groupBy(allItems, 'alwaysHidden');

    // Push the separated arrays
    this.visibleItems.next(splitArrays.false);
    this.hiddenItems.next(splitArrays.true);

    this.changeDetectorRef.detectChanges();
  }


  /**
   * Move items between the two lists as required by the available space
   */
  private updateLists(): void {
    const requiredSpace = this.breakWidths[this.visibleItemsLength - 1];

    // If there is not enough space
    if (requiredSpace > this.availableSpace) {
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

    this.changeDetectorRef.detectChanges();
  }


  /**
   * If the destination is a string and begins with `http`
   *
   * @param destination - The destination to check
   * @return Boolean determining if the link is external
   */
  public isExternalLink(destination: string | string[]): boolean {
    return destination.indexOf('http') >= 0;
  }

}
