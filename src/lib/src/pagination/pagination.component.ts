import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { find } from 'lodash';

const _ = {
  find: find,
};

/**
 * A pagination component
 * TODO: Fill out example
 *
 * @example
 * <ts-pagination
 *              item="Value"
 * ></ts-pagination>
 */
@Component({
  selector: 'ts-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class TsPaginationComponent implements OnInit {
  /**
   * Define the default count of records per page
   */
  private DEFAULT_PER_PAGE: number = 10;

  /**
   * Define the icon for the 'first page' button
   */
  private firstPageIcon: string = 'first_page';

  /**
   * Define the icon for the 'previous page' button
   */
  private previousPageIcon: string = 'keyboard_arrow_left';

  /**
   * Define the icon for the 'next page' button
   */
  private nextPageIcon: string = 'keyboard_arrow_right';

  /**
   * Define the icon for the 'last page' button
   */
  private lastPageIcon: string = 'last_page';

  /**
   * Store the array of objects that represent pages of collections
   */
  private pagesArray: object[];

  /**
   * Store the label for the current page
   */
  private currentPageLabel: string;

  /**
   * Define the amount of records show per page
   */
  private recordsPerPage: number = this.DEFAULT_PER_PAGE;

  /**
   * Define the current page
   * TODO: Does a string make more sense here?
   * TODO: Go to this page after init
   */
  @Input() currentPage: number = 1;

  /**
   * Define the total number of records
   */
  @Input() totalRecords: number = 0;

  /**
   * Define if the records per page select menu should be visible
   * TODO: Show/hide the menu
   */
  @Input() showRecordsPerPageSelector: boolean = false;

  /**
   * Define how many records are shown per page
   * TODO: Use this to build the menu
   */
  @Input() recordsPerPageChoices: number[];

  /**
   * Define the menu location (open up or open down)
   */
  @Input() menuLocation: 'above' | 'below' = 'above';

  /**
   * Define if the progress indicator should show
   */
  @Input() showProgress: boolean = false;

  /**
   * Emit a page selected event
   */
  @Output() pageSelect = new EventEmitter<number>();

  /**
   * Emit a change event when the records per page changes
   * TODO: use for a menu to change per page
   */
  @Output() recordsPerPageChange = new EventEmitter<number>();


  // TODO: Add tooltips to buttons


  /**
   * @hidden Set up needed resources
   */
  ngOnInit(): void {
    this.pagesArray = this._createPagesArray(this.totalRecords, this.recordsPerPage);
    this.currentPageLabel = this._createCurrentPageLabel(this.currentPage, this.pagesArray);

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
    this.currentPageLabel = this._createCurrentPageLabel(this.currentPage, this.pagesArray);

    // Emit an event
    this.pageSelect.emit(event);
  }


  /**
   * Manually trigger a page change event from a number
   *
   * @param {Number} destinationPage The selected page
   * @param {Number} currentPage The current page
   */
  changePage(destinationPage: number, currentPage: number, pages: any[]): void {
    // If the destinationPage number is valid and we are not already on the destinationPage
    if (destinationPage > 0 && destinationPage !== currentPage) {
      const foundPage: any = _.find(pages, (item: any) => {
        return item.value === destinationPage.toString();
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
    return page === this.pagesArray.length;
  }


  /**
   * Create a new label based on the current page
   *
   * @param {Number} currentPage The current page
   * @param {Array} pages The array of all pages
   * @return {String} timeAgo The difference in time
   */
  _createCurrentPageLabel(currentPage: number, pages: object[]): string {
    const page: any = _.find(pages, (item: any) => {
      return item.value === currentPage.toString();
    });

    // '1 - 10 of 243'
    return `${page.name} of ${this.totalRecords}`;
  }


  /**
   * Create an array containing objects that represent each available page of records
   *
   * @param {Number} total The total records remaining
   * @param {Number} perPage How many records are shown per page
   * @return {Array} paginationArray The array representing all possible pages of records
   */
  _createPagesArray(total: number, perPage: number): any {
    const paginationArray = [];
    let recordsRemaining = total;
    let currentPage = 1;

    while (recordsRemaining >= 10) {
      const rangeEnd = (currentPage * perPage);
      const page = rangeEnd.toString().slice(0, -1);

      // Create a page object
      paginationArray.push({
        name: `${currentPage * perPage - (perPage - 1)} - ${rangeEnd}`,
        value: `${page.toString()}`,
      });

      // Update the remaining count
      recordsRemaining -= perPage;

      // Set up for next loop if enough records exist
      if (recordsRemaining >= perPage) {
        currentPage = parseInt(page, 10) + 1;
      }

    }

    // If any records remain, add the partial group as the last page
    if (recordsRemaining > 0) {
      paginationArray.push({
        name: `${currentPage * perPage} - ${currentPage * perPage + recordsRemaining}`,
        value: `${currentPage + 1}`,
      });
    }

    return paginationArray;
  }

}
