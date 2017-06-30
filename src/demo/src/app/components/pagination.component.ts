import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination',
  template: `
    <ts-pagination
      [totalRecords]="pagesLarge"
      (pageSelect)="onPageSelect($event)"
      (firstPageChosen)="first($event)"
      (previousPageChosen)="previous($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-pagination>

    <br>
    <br>
    <br>

    <ts-pagination
      [totalRecords]="pagesMedium"
      [showRecordsPerPageSelector]="showSelector"
      (pageSelect)="onPageSelect($event)"
      (firstPageChosen)="first($event)"
      (previousPageChosen)="previous($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-pagination>

    <br>
    <br>
    <br>
    <br>

    <ts-pagination
      [totalRecords]="pagesSmall"
      (pageSelect)="onPageSelect($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-pagination>
  `,
})
export class PaginationComponent {
  pagesLarge = 117;
  pagesMedium = 17;
  pagesSmall = 7;
  showSelector = false;
  currentPage = 3;

  onPageSelect(e) {
    console.log('DEMO page selected: ', e);
  }

  first(e) {
    console.log('DEMO first: ', e);
  }

  previous(e) {
    console.log('DEMO previous: ', e);
  }

  next(e) {
    console.log('DEMO next: ', e);
  }

  last(e) {
    console.log('DEMO last: ', e);
  }
}
