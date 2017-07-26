import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';


/**
 * A pagination component
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
 *              (pageSelect)="myMethod($event)"
 *              (recordsPerPageChange)="myMethod($event)"
 * ></ts-pagination>
 */
@Component({
  selector: 'ts-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
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
  public pagesArray: object[];

  /**
   * Store the label for the current page
   */
  public currentPageLabel: string;

  /**
   * Define the amount of records show per page
   */
  private recordsPerPage: number = this.DEFAULT_PER_PAGE;

  /**
   * Define the label for the records per page select
   */
  private recordsSelectLabel: string = 'Per page';

  /**
   * Define the current page
   */
  @Input() currentPage: number = 1;

  /**
   * Define how many pages exist to show a prompt about better filtering
   */
  @Input() maxPreferredRecords: number = this.DEFAULT_MAX_PREFERED_RECORDS;

  /**
   * Define the menu location (open up or open down)
   */
  @Input() menuLocation: 'above' | 'below' = 'above';

  /**
   * Define the total number of records
   */
  @Input() totalRecords: number = 0;

  /**
   * Define the message to show when too many pages exist
   * TODO: This should probably support rich HTML so it can link to filters/help/etc
   */
  @Input() recordCountTooHighMessage: string = this.DEFAULT_HIGH_RECORD_MESSAGE;

  /**
   * Define how many records are shown per page
   */
  @Input() recordsPerPageChoices: number[] = this.DEFAULT_RECORDS_PER_PAGE_OPTIONS;

  /**
   * Define if the records per page select menu should be visible
   */
  @Input() showRecordsPerPageSelector: boolean = true;

  /**
   * Emit a page selected event
   */
  @Output() pageSelect = new EventEmitter<number>();

  /**
   * Emit a change event when the records per page changes
   */
  @Output() recordsPerPageChange = new EventEmitter<number>();


  // TODO: Add tooltips on all buttons


  /**
   * @hidden
   */
  ngOnInit(): void {
    this.initialize();
  }


  /**
   * @hidden
   */
  ngOnChanges(): void {
    this.initialize();
  }


  /**
   * Set up initial resources
   */
  initialize() {
    this.pagesArray = this._createPagesArray(this.totalRecords, this.recordsPerPage);
    this.currentPageLabel = this._createCurrentPageLabel(this.currentPage, this.pagesArray, this.totalRecords);

    // Go to the initially set page
    this.changePage(this.currentPage, 1, this.pagesArray);
  }


  /**
   * Perform tasks when the current page is changed
   *
   * @param {Object} event The selected page
   */
  currentPageChanged(event: any): void {
    // Set the current page
    this.currentPage = parseInt(event.value, 10);

    // Create a new label for the menu
    this.currentPageLabel = this._createCurrentPageLabel(this.currentPage, this.pagesArray, this.totalRecords);

    // Emit an event
    this.pageSelect.emit(event);
  }


  /**
   * Manually trigger a page change event from a number
   *
   * @param {Number} destinationPage The selected page number
   * @param {Number} currentPage The current page number
   * @param {Array} pages The collection of pages
   */
  changePage(destinationPage: number, currentPage: number, pages: any[]): void {
    const destinationIsValid = destinationPage > 0 && destinationPage <= pages.length;
    const notAlreadyOnPage = destinationPage !== currentPage;

    if (destinationIsValid && notAlreadyOnPage) {
      const foundPage: any = pages.find((page) => {
        return page.value === destinationPage.toString();
      });

      this.currentPageChanged(foundPage);
    }
  }


  /**
   * Check if a page is the first page
   *
   * @param {Number} page The number of the current page
   * @return {Boolean} isFirstPage A boolean representing if this is the first page
   */
  isFirstPage(page: number): boolean {
    return page === 1;
  }


  /**
   * Check if a page is the last page
   *
   * @param {Number} page The number of the current page
   * @return {Boolean} isLastPage A boolean representing if this is the last page
   */
  isLastPage(page: number): boolean {
    if (this.pagesArray) {
      return page === this.pagesArray.length;
    } else {
      return false;
    }
  }


  /**
   * Determine if the string exists
   *
   * @param {String} message The help message when too many results are returned
   * @param {String} max The max number of records before the message should be shown
   * @param {String} totalRecords The number of records
   * @return {Boolean} shouldShow A boolean representing if the message should be shown
   */
  shouldShowRecordsMessage(message: string, max: number, totalRecords: number): boolean {
    if (totalRecords > max) {
      return (message && message.length > 0) ? true : false;
    } else {
      return false;
    }
  }


  /**
   * Re-initialize the pagination when records per page changes
   *
   * @param {Number} selection The selected records-per-page count
   */
  recordsPerPageUpdated(selection: number): void {
    this.recordsPerPage = selection;
    this.currentPage = 1;

    // Re-init pagination
    this.initialize();
  }


  /**
   * Determine if the page select menu should be disabled
   *
   * @param {Number} pagesCount The number of pages
   * @return {Boolean} shouldDisable A boolean representing if the menu should be disabled
   */
  menuIsDisabled(pagesCount: number): boolean {
    return pagesCount < 2;
  }


  /**
   * Determine if the records-per-page menu should be disabled
   *
   * @param {Number} total The total number of records
   * @param {Array} recordsPerPageChoices The array of counts representing how many records may be show per
   * page
   * @return {Boolean} shouldDisable A boolean representing if the records select should be disabled
   */
  disableRecordsPerPage(totalRecords: number, recordsPerPageChoices: number[]): boolean {
    const lowestPerPage = Math.min.apply(Math, recordsPerPageChoices);

    return totalRecords < lowestPerPage;
  }


  /**
   * Create a new label based on the current page
   *
   * @param {Number} currentPage The current page
   * @param {Array} pages The array of all pages
   * @return {String} timeAgo The difference in time
   */
  private _createCurrentPageLabel(currentPage: number, pages: any, totalRecords: number): string {
    const findPage = (allPages: any[], number: number) => {
      return pages.find((page: any) => {
        return page.value === number.toString();
      });
    };

    let foundPage = findPage(pages, currentPage);

    if (!foundPage) {
      foundPage = findPage(pages, currentPage - 1);
      // Save the current page change back to the primary variable
      this.currentPage -= 1;
    }

    // '1 - 10 of 243'
    return `${foundPage.name} of ${totalRecords}`;
  }


  /**
   * Create an array containing objects that represent each available page of records
   *
   * @param {Number} total The total records remaining
   * @param {Number} perPage How many records are shown per page
   * @return {Array} paginationArray The array representing all possible pages of records
   */
  private _createPagesArray(total: number, perPage: number): any {
    const paginationArray: any[] = [];
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

}
