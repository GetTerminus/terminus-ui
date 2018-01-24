import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  TemplateRef,
  ElementRef,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { TsStyleThemeTypes } from './../utilities/types';
import { TsPaginationMenuItem } from './../utilities/interfaces';


/**
 * A pagination component
 *
 * #### QA CSS CLASSES
 * - `qa-pagination`: Placed on the primary container
 * - `qa-pagination-per-page-select`: Placed on the results per page select menu
 * - `qa-pagination-first-page-button`: Placed on the 'first page' button
 * - `qa-pagination-previous-page-button`: Placed on the 'previous page' button
 * - `qa-pagination-current-page-menu`: Placed on the 'current page' menu dropdown
 * - `qa-pagination-next-page-button`: Placed on the 'next page' button
 * - `qa-pagination-last-page-button`: Placed on the the 'last page' button
 * - `qa-pagination-message`: Placed on the messaging regarding the record count being too high
 *
 * @example
 * <ts-pagination
 *              currentPage="1"
 *              maxPreferredRecords="100"
 *              menuLocation="below"
 *              totalRecords="1450"
 *              recordCountTooHighMessage="Please refine your filters."
 *              recordsPerPageChoices="[10, 20, 50]"
 *              showRecordsPerPageSelector="true"
 *              firstPageTooltip="View first results"
 *              previousPageTooltip="View previous results"
 *              nextPageTooltip="View next results"
 *              lastPageTooltip="View last results"
 *              [paginationMessageTemplate]="myTemplate"
 *              (pageSelect)="myMethod($event)"
 *              (recordsPerPageChange)="myMethod($event)"
 * ></ts-pagination>
 *
 * <ng-template #myTemplate let-message>
 *   <strong>{{ message }}</strong>
 *   <a href="/faq">Learn more</a>
 * </ng-template>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  host: {
    class: 'ts-pagination',
  },
  encapsulation: ViewEncapsulation.None,
})
export class TsPaginationComponent implements OnChanges, OnInit {
  /**
   * Define the default count of records per page
   */
  private DEFAULT_PER_PAGE: number = 10;

  /**
   * Default max records before message is shown
   */
  private DEFAULT_MAX_PREFERED_RECORDS: number = 100;

  /**
   * Define the default options for the records per page select menu
   */
  private DEFAULT_RECORDS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

  /**
   * Define the default message to show when too many records are returned
   */
  private DEFAULT_HIGH_RECORD_MESSAGE: string = 'That\'s a lot of results! ' +
    'Try refining your filters for better results.';

  /**
   * Define the icon for the 'first page' button
   */
  public firstPageIcon: string = 'first_page';

  /**
   * Define the icon for the 'previous page' button
   */
  public previousPageIcon: string = 'keyboard_arrow_left';

  /**
   * Define the icon for the 'next page' button
   */
  public nextPageIcon: string = 'keyboard_arrow_right';

  /**
   * Define the icon for the 'last page' button
   */
  public lastPageIcon: string = 'last_page';

  /**
   * Store the array of objects that represent pages of collections
   */
  public pagesArray: TsPaginationMenuItem[];

  /**
   * Store the label for the current page
   */
  public currentPageLabel: string;

  /**
   * Define the amount of records show per page
   */
  public recordsPerPage: number = this.DEFAULT_PER_PAGE;

  /**
   * Define the template context for the record count message
   */
  public templateContext = {
    $implicit: this.DEFAULT_HIGH_RECORD_MESSAGE,
  }

  /**
   * Define the tooltip message for the first page tooltip
   */
  @Input()
  public firstPageTooltip: string = 'View the first results';

  /**
   * Define the tooltip message for the previous page tooltip
   */
  @Input()
  public previousPageTooltip: string = 'View the previous results';

  /**
   * Define the tooltip message for the next page tooltip
   */
  @Input()
  public nextPageTooltip: string = 'View the next results';

  /**
   * Define the tooltip message for the last page tooltip
   */
  @Input()
  public lastPageTooltip: string= 'View the last results';

  /**
   * Define the current page
   */
  @Input()
  public currentPage: number = 1;

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
   * Allow a custom template to be used for the pagination message
   */
  @Input()
  public paginationMessageTemplate: TemplateRef<ElementRef>;

  /**
   * Define the color theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the total number of records
   */
  @Input()
  public totalRecords: number = 0;

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
  public recordsSelectLabel: string = 'Per page';

  /**
   * Define if the records per page select menu should be visible
   */
  @Input()
  public showRecordsPerPageSelector: boolean = true;

  /**
   * Emit a page selected event
   */
  @Output()
  public pageSelect: EventEmitter<TsPaginationMenuItem> = new EventEmitter();

  /**
   * Emit a change event when the records per page changes
   */
  @Output()
  public recordsPerPageChange: EventEmitter<number> = new EventEmitter();


  /**
   * Initialize on init
   */
  public ngOnInit(): void {
    this.initialize();
  }


  /**
   * Initialize on any changes
   *
   * @param changes - The object containing all changes since last cycle
   */
  public ngOnChanges(changes: SimpleChanges): void {
    this.initialize();

    // If the record count changed, assign the new value to the template context
    // istanbul ignore else
    if (changes.recordCountTooHighMessage) {
      this.templateContext.$implicit = this.recordCountTooHighMessage;
    }
  }


  /**
   * Set up initial resources
   */
   private initialize(): void {
     this.pagesArray = this.createPagesArray(this.totalRecords, this.recordsPerPage);
     this.currentPageLabel =
       this.createCurrentPageLabel(this.currentPage, this.pagesArray, this.totalRecords);

     // Go to the initially set page
     this.changePage(this.currentPage, 1, this.pagesArray);
   }


  /**
   * Perform tasks when the current page is changed
   *
   * @param page - The selected page
   */
  public currentPageChanged(page: TsPaginationMenuItem): void {
    // Set the current page
    this.currentPage = parseInt(page.value, 10);

    // Create a new label for the menu
    this.currentPageLabel =
      this.createCurrentPageLabel(this.currentPage, this.pagesArray, this.totalRecords);

    // Emit an event
    this.pageSelect.emit(page);
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
    pages: TsPaginationMenuItem[],
  ): void {
    const destinationIsValid = destinationPage > 0 && destinationPage <= pages.length;
    const notAlreadyOnPage = destinationPage !== currentPage;

    if (destinationIsValid && notAlreadyOnPage) {
      const foundPage: TsPaginationMenuItem = pages.find((page) => {
        return page.value === destinationPage.toString();
      });

      this.currentPageChanged(foundPage);
    }
  }


  /**
   * Check if a page is the first page
   *
   * @param page - The number of the current page
   * @return A boolean representing if this is the first page
   */
  public isFirstPage(page: number): boolean {
    return page === 1;
  }


  /**
   * Check if a page is the last page
   *
   * @param page - The number of the current page
   * @return A boolean representing if this is the last page
   */
  public isLastPage(page: number): boolean {
    if (this.pagesArray) {
      return page === this.pagesArray.length;
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
   * Re-initialize the pagination when records per page changes
   *
   * @param selection - The selected records-per-page count
   */
  public recordsPerPageUpdated(selection: number): void {
    this.recordsPerPage = selection;
    this.currentPage = 1;

    // Re-init pagination
    this.initialize();
  }


  /**
   * Determine if the page select menu should be disabled
   *
   * @param pagesCount - The number of pages
   * @return A boolean representing if the menu should be disabled
   */
  public menuIsDisabled(pagesCount: number): boolean {
    return pagesCount < 2;
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
    const lowestPerPage = Math.min.apply(Math, recordsPerPageChoices);

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
    pages: TsPaginationMenuItem[],
    totalRecords: number,
  ): string {
    const findPage = (allPages: TsPaginationMenuItem[], index: number) => {
      return pages.find((page: TsPaginationMenuItem) => {
        return page.value === index.toString();
      });
    };

    let foundPage: TsPaginationMenuItem = findPage(pages, currentPage);

    if (!foundPage) {
      foundPage = findPage(pages, currentPage - 1);
      // Save the current page change back to the primary variable
      this.currentPage -= 1;
    }

    // This may be the case if there are no records
    if (!foundPage || !foundPage.name) {
      foundPage = {
        name: '0',
      }
    }

    // '1 - 10 of 243'
    return `${foundPage.name} of ${totalRecords}`;
  }


  /**
   * Create an array containing objects that represent each available page of records
   *
   * @param total - The total records remaining
   * @param perPage - How many records are shown per page
   * @return The array representing all possible pages of records
   */
  private createPagesArray(total: number, perPage: number): TsPaginationMenuItem[] {
    const paginationArray: TsPaginationMenuItem[] = [];
    let recordsRemaining = total;
    let currentPage = 1;

    // If there are no records just return an empty array
    if (!recordsRemaining || recordsRemaining < 1) {
      return paginationArray;
    }

    while (recordsRemaining >= perPage) {
      const rangeEnd = (currentPage * perPage);
      const page: number = paginationArray.length + 1;

      // Create a page object
      paginationArray.push({
        name: `${currentPage * perPage - (perPage - 1)} - ${rangeEnd}`,
        value: `${page.toString()}`,
      });

      // Update the remaining count
      recordsRemaining -= perPage;

      // Set up for next loop if enough records exist
      if (recordsRemaining >= perPage) {
        currentPage = page + 1;
      }

    }

    // If any records remain, add the partial group as the last page in the array
    if (recordsRemaining > 0) {
      let name;
      let value;

      if (paginationArray.length > 0) {
        name = `${currentPage * perPage + 1} - ${currentPage * perPage + recordsRemaining}`;
        value = `${currentPage + 1}`;
      } else {
        name = `${currentPage} - ${recordsRemaining}`;
        value = currentPage;
      }

      paginationArray.push({
        name: name,
        value: value.toString(),
      });
    }

    return paginationArray;
  }


  /**
   * Tracking method for the pagesArray ngFor
   *
   * @param index - The current index
   * @param page - The page object
   * @return The value to be used
   */
  public trackPagesArray(index: number, page: TsPaginationMenuItem): string | undefined {
    return page ? page.name : undefined;
  }

}
