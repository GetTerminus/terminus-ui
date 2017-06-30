import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination',
  template: `
    <ts-pagination
      [totalRecords]="allItems"
      (pageSelect)="onPageSelect($event)"
      (firstPageChosen)="first($event)"
      (previousPageChosen)="previous($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-pagination>
  `,
})
export class PaginationComponent {
  allItems = 347;
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
