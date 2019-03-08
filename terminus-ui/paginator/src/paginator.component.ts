import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { isBoolean } from '@terminus/ngx-tools';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { TsSelectChange } from '@terminus/ui/select';
import { inputHasChanged, TsStyleThemeTypes } from '@terminus/ui/utilities';


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
  value?: number;
}


/**
 * A paginator component
 *
 * #### QA CSS CLASSES
 * - `qa-paginator`: Placed on the primary container
 * - `qa-paginator-per-page-select`: Placed on the results per page select menu
 * - `qa-paginator-first-page-button`: Placed on the 'first page' button
 * - `qa-paginator-previous-page-button`: Placed on the 'previous page' button
 * - `qa-paginator-current-page-menu`: Placed on the 'current page' menu dropdown
 * - `qa-paginator-next-page-button`: Placed on the 'next page' button
 * - `qa-paginator-last-page-button`: Placed on the the 'last page' button
 * - `qa-paginator-message`: Placed on the messaging regarding the record count being too high
 *
 * @example
 * <ts-paginator
 *              currentPageIndex="1"
 *              maxPreferredRecords="100"
 *              menuLocation="below"
 *              [isZeroBased]="true"
 *              totalRecords="1450"
 *              recordCountTooHighMessage="Please refine your filters."
 *              recordsPerPageChoices="[10, 20, 50]"
 *              [showRecordsPerPageSelector]="true"
 *              firstPageTooltip="View first results"
 *              previousPageTooltip="View previous results"
 *              nextPageTooltip="View next results"
 *              lastPageTooltip="View last results"
 *              [paginatorMessageTemplate]="myTemplate"
 *              (pageSelect)="myMethod($event)"
 *              (recordsPerPageChange)="myMethod($event)"
 * ></ts-paginator>
 *
 * <ng-template #myTemplate let-message>
 *   <strong>{{ message }}</strong>
 *   <a href="/faq">Learn more</a>
 * </ng-template>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/paginator</example-url>
 */
@Component({
  selector: 'ts-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  host: {
    class: 'ts-paginator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsPaginator',
})
export class TsPaginatorComponent implements OnChanges, AfterViewInit {
  /**
   * Define the default count of records per page
   */
  private DEFAULT_PER_PAGE = 10;

  /**
   * Default max records before message is shown
   */
  private DEFAULT_MAX_PREFERED_RECORDS = 100;

  /**
   * Define the default options for the records per page select menu
   */
  private DEFAULT_RECORDS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

  /**
   * Define the default message to show when too many records are returned
   */
  private DEFAULT_HIGH_RECORD_MESSAGE = 'That\'s a lot of results! ' +
    'Try refining your filters for better results.';

  /**
   * Define the icon for the 'first page' button
   */
  public firstPageIcon = 'first_page';

  /**
   * Define the icon for the 'previous page' button
   */
  public previousPageIcon = 'keyboard_arrow_left';

  /**
   * Define the icon for the 'next page' button
   */
  public nextPageIcon = 'keyboard_arrow_right';

  /**
   * Define the icon for the 'last page' button
   */
  public lastPageIcon = 'last_page';

  /**
   * Store the array of objects that represent pages of collections
   */
  public pagesArray!: TsPaginatorMenuItem[];

  /**
   * Store the label for the current page
   */
  public currentPageLabel!: string;

  /**
   * Define the amount of records show per page
   */
  public recordsPerPage: number = this.DEFAULT_PER_PAGE;

  /**
   * Define the template context for the record count message
   */
  public templateContext = {
    $implicit: this.DEFAULT_HIGH_RECORD_MESSAGE,
  };

  /**
   * GETTERS
   */

  /**
   * Getter to return the index of the first page
   */
  public get firstPageIndex(): number {
    return this.isZeroBased ? 0 : 1;
  }

  /**
   * Getter to return the index of the next page
   */
  public get nextPageIndex(): number {
    return this.currentPageIndex - this.firstPageIndex;
  }

  /**
   * Getter to return the index of the last page
   */
  public get lastPageIndex(): number {
    return this.isZeroBased ? (this.pagesArray.length - 1) : this.pagesArray.length ;
  }

  /**
   * INPUTS
   */

  /**
   * Define if the paging is 0-based or 1-based
   */
  @Input()
  public set isZeroBased(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsPaginatorComponent: "isZeroBased" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isZeroBased = coerceBooleanProperty(value);
  }
  public get isZeroBased(): boolean {
    return this._isZeroBased;
  }
  private _isZeroBased = true;

  /**
   * Define the tooltip message for the first page tooltip
   */
  @Input()
  public firstPageTooltip = 'View the first results';

  /**
   * Define the tooltip message for the previous page tooltip
   */
  @Input()
  public previousPageTooltip = 'View the previous results';

  /**
   * Define the tooltip message for the next page tooltip
   */
  @Input()
  public nextPageTooltip = 'View the next results';

  /**
   * Define the tooltip message for the last page tooltip
   */
  @Input()
  public lastPageTooltip = 'View the last results';

  /**
   * Define the current page
   */
  @Input()
  public set currentPageIndex(page: number) {
    this._currentPageIndex = coerceNumberProperty(page);
  }
  public get currentPageIndex(): number {
    return this._currentPageIndex;
  }
  private _currentPageIndex = 0;

  /**
   * Define how many pages exist to show a prompt about better filtering
   */
  @Input()
  public maxPreferredRecords: number = this.DEFAULT_MAX_PREFERED_RECORDS;

  /**
   * Define the menu location (open up or open down)
   */
  @Input()
  public menuLocation: 'above' | 'below' = 'above';

  /**
   * Allow a custom template to be used for the paginator message
   */
  @Input()
  public paginatorMessageTemplate!: TemplateRef<ElementRef>;

  /**
   * Define the color theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'accent';

  /**
   * Define the total number of records
   */
  @Input()
  public set totalRecords(records: number) {
    this._totalRecords = coerceNumberProperty(records);
  }
  public get totalRecords(): number {
    return this._totalRecords;
  }
  private _totalRecords = 0;

  /**
   * Define the message to show when too many pages exist
   */
  @Input()
  public recordCountTooHighMessage: string = this.DEFAULT_HIGH_RECORD_MESSAGE;

  /**
   * Define how many records are shown per page
   */
  @Input()
  public recordsPerPageChoices: number[] = this.DEFAULT_RECORDS_PER_PAGE_OPTIONS;

  /**
   * Define the label for the records per page select
   */
  @Input()
  public recordsSelectLabel = 'Per page';

  /**
   * Define if the records per page select menu should be visible
   */
  @Input()
  public set showRecordsPerPageSelector(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsPaginatorComponent: "showRecordsPerPageSelector" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._showRecordsPerPageSelector = coerceBooleanProperty(value);
  }
  public get showRecordsPerPageSelector(): boolean {
    return this._showRecordsPerPageSelector;
  }
  private _showRecordsPerPageSelector = true;

  /**
   * Emit a page selected event
   */
  @Output()
  readonly pageSelect: EventEmitter<TsPaginatorMenuItem> = new EventEmitter();

  /**
   * Emit a change event when the records per page changes
   */
  @Output()
  readonly recordsPerPageChange: EventEmitter<number> = new EventEmitter();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Initialize on init
   */
  public ngAfterViewInit(): void {
    this.initialize();
  }


  /**
   * Initialize on any changes
   *
   * @param changes - The object containing all changes since last cycle
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // If the record count changed, assign the new value to the template context
    // istanbul ignore else
    if (inputHasChanged(changes, 'recordCountTooHighMessage')) {
      this.templateContext.$implicit = this.recordCountTooHighMessage;
    }

    // If the zeroBased input changes, update the current page index
    if (inputHasChanged(changes, 'isZeroBased')) {
      this.currentPageIndex = changes.isZeroBased.currentValue ? 0 : 1;
    }

    this.initialize();
  }


  /**
   * Set up initial resources
   */
   private initialize(): void {
     this.pagesArray =
       this.createPagesArray(this.totalRecords, this.recordsPerPage, this.isZeroBased);
     this.currentPageLabel =
       this.createCurrentPageLabel(this.currentPageIndex, this.pagesArray, this.totalRecords);

     // Change to the current page
     // istanbul ignore else
     if (this.totalRecords > 0) {
       this.changePage(this.currentPageIndex, -1, this.pagesArray);
     }
   }


  /**
   * Perform tasks when the current page is changed
   *
   * @param page - The selected page
   */
  public currentPageChanged(page: TsPaginatorMenuItem): void {
    // Set the current page
    this.currentPageIndex = coerceNumberProperty(page.value);

    // Create a new label for the menu
    this.currentPageLabel =
      this.createCurrentPageLabel(this.currentPageIndex, this.pagesArray, this.totalRecords);

    // Emit an event
    this.pageSelect.emit(page);
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Manually trigger a page change event from a number
   *
   * @param destinationPage - The selected page number
   * @param currentPage - The current page number
   * @param pages - The collection of pages
   */
  public changePage(
    destinationPage: number,
    currentPage: number,
    pages: TsPaginatorMenuItem[],
  ): void {
    const destinationIsValid: boolean = destinationPage >= this.firstPageIndex && destinationPage <= pages.length;
    const notAlreadyOnPage: boolean = destinationPage !== currentPage;

    if (destinationIsValid && notAlreadyOnPage) {
      const foundPage: TsPaginatorMenuItem | undefined = pages.find((page: TsPaginatorMenuItem): boolean => {
        return page.value === destinationPage;
      });

      // istanbul ignore else
      if (foundPage) {
        this.currentPageChanged(foundPage);
      }
    }
  }


  /**
   * Check if a page is the first page
   *
   * @param page - The number of the current page
   * @return A boolean representing if this is the first page
   */
  public isFirstPage(page: number): boolean {
    return coerceNumberProperty(page) === this.firstPageIndex;
  }


  /**
   * Check if a page is the last page
   *
   * @param page - The number of the current page
   * @return A boolean representing if this is the last page
   */
  public isLastPage(page: number): boolean {
    if (this.pagesArray) {
      return page === (this.pagesArray.length - (this.isZeroBased ? 1 : 0));
    } else {
      return false;
    }
  }


  /**
   * Determine if the string exists
   *
   * @param message - The help message when too many results are returned
   * @param max - The max number of records before the message should be shown
   * @param totalRecords - The number of records
   * @return A boolean representing if the message should be shown
   */
  public shouldShowRecordsMessage(message: string, max: number, totalRecords: number): boolean {
    if (totalRecords > max) {
      return (message && message.length > 0) ? true : false;
    } else {
      return false;
    }
  }


  /**
   * Re-initialize the paginator when records per page changes
   *
   * @param selection - The selected records-per-page count
   */
  public recordsPerPageUpdated(selection: TsSelectChange): void {
    this.recordsPerPage = selection.value;
    this.currentPageIndex = this.firstPageIndex;
    this.recordsPerPageChange.emit(selection.value);

    this.initialize();
  }


  /**
   * Determine if the page select menu should be disabled
   *
   * @param pagesCount - The number of pages
   * @return A boolean representing if the menu should be disabled
   */
  public menuIsDisabled(pagesCount: number): boolean {
    return coerceNumberProperty(pagesCount) < 2;
  }


  /**
   * Determine if the records-per-page menu should be disabled
   *
   * @param total - The total number of records
   * @param recordsPerPageChoices - The array of counts representing how many records may be show
   * per page
   * @return A boolean representing if the records select should be disabled
   */
  public disableRecordsPerPage(totalRecords: number, recordsPerPageChoices: number[]): boolean {
    const lowestPerPage: number = Math.min.apply(Math, recordsPerPageChoices);

    return totalRecords < lowestPerPage;
  }


  /**
   * Create a new label based on the current page
   *
   * @param currentPage - The current page
   * @param pages - The array of all pages
   * @return The string to use as the current page label
   */
  private createCurrentPageLabel(
    currentPage: number,
    pages: TsPaginatorMenuItem[],
    totalRecords: number,
  ): string {
    const findPage = (allPages: TsPaginatorMenuItem[], index: number) => {
      return pages.find((page: TsPaginatorMenuItem): boolean => {
        return page.value === index;
      });
    };

    let foundPage: TsPaginatorMenuItem | undefined = findPage(pages, currentPage);

    // If no found page, try the previous page
    if (!foundPage) {
      foundPage = findPage(pages, currentPage - 1);

      // istanbul ignore else
      if (foundPage) {
        // If we found the previous page,
        // save the current page change back to the primary variable
        this.currentPageIndex -= 1;
      }
    }

    // This may be the case if there are no records
    if (!foundPage || !foundPage.name) {
      foundPage = {
        name: '0',
      };
    }

    // '1 - 10 of 243'
    return `${foundPage.name} of ${totalRecords}`;
  }


  /**
   * Create an array containing objects that represent each available page of records
   *
   * @param total - The total records remaining
   * @param perPage - How many records are shown per page
   * @param zeroBased - If the pages are based on a `0` index rather than `1`
   * @return The array representing all possible pages of records
   */
  private createPagesArray(total: number, perPage: number, zeroBased: boolean): TsPaginatorMenuItem[] {
    const paginatorArray: TsPaginatorMenuItem[] = [];
    let recordsRemaining = total;
    let page = zeroBased ? 0 : 1;

    // If there are no records just return an empty array
    if (!recordsRemaining || recordsRemaining < 1) {
      return paginatorArray;
    }

    while (recordsRemaining >= perPage) {
      // We are creating the text for the range here so we are dealing with records based on 1
      // (while the pages themselves may be based on 0 or 1)
      const pageNumber = (page < 1) ? 1 : page;
      const rangeStart = pageNumber * perPage - (perPage - 1);
      const rangeEnd = (pageNumber * perPage);
      const pageValue: number = paginatorArray.length + 1;

      // Create a page object
      paginatorArray.push({
        name: `${rangeStart} - ${rangeEnd}`,
        // The value is zero based
        value: (pageValue - (zeroBased ? 1 : 0)),
      });

      // Update the remaining count
      recordsRemaining -= perPage;

      // Set up for next loop if enough records exist
      if (recordsRemaining >= perPage) {
        page = pageValue + 1;
      }

    }

    // If any records remain, add the partial group as the last page in the array
    if (recordsRemaining > 0) {
      let name;
      let value;
      const pageNumber = (page < 1) ? 1 : page;
      const pageValue: number = paginatorArray.length + 1;

      if (paginatorArray.length > 0) {
        name = `${pageNumber * perPage + 1} - ${pageNumber * perPage + recordsRemaining}`;
        value = (pageValue - (zeroBased ? 1 : 0));
      } else {
        name = `${pageNumber} - ${recordsRemaining}`;
        value = (pageValue - (zeroBased ? 1 : 0));
      }

      paginatorArray.push({
        name: name,
        value: value,
      });
    }

    return paginatorArray.sort((a: TsPaginatorMenuItem, b: TsPaginatorMenuItem): number => {
      const first: number = coerceNumberProperty(a.value);
      const second: number = coerceNumberProperty(b.value);

      return (first < second) ? -1 : 1;
    });
  }


  /**
   * Tracking method for the pagesArray ngFor
   *
   * @param index - The current index
   * @param page - The page object
   * @return The value to be used
   */
  public trackPagesArray(index: number, page: TsPaginatorMenuItem): string | undefined {
    return page ? page.name : undefined;
  }

}
