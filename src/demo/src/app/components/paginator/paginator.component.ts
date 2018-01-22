import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { TsPaginatorComponent } from '@terminus/ui';


@Component({
  selector: 'demo-paginator',
  template: `
    <div>
      <label for="page">
        Set the current page from the parent component:
      </label>
      <select name="page" [(ngModel)]="currentPageIndex">
        <option *ngFor="let page of pages">{{ page }}</option>
      </select>

      <br>
      <br>

      <label for="records">
        Set the total number of records from the parent component:
      </label>
      <input name="records" type="number" [(ngModel)]="recordCount">
    </div>

    <br>
    <br>
    <br>

    <ts-paginator
      [theme]="myTheme"
      [totalRecords]="recordCount"
      [showRecordsPerPageSelector]="showSelector"
      [currentPageIndex]="currentPageIndex"
      [menuLocation]="location"
      [paginatorMessageTemplate]="myTemplate"
      recordCountTooHighMessage="Please refine your filters."
      (recordsPerPageChange)="perPageChange($event)"
      (pageSelect)="onPageSelect($event)"
      (firstPageChosen)="first($event)"
      (previousPageChosen)="previous($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-paginator>

    <ng-template #myTemplate let-message>
      <a routerLink="/components/link">{{ message }}</a>
    </ng-template>
  `,
})
export class PaginatorComponent implements AfterViewInit {
  myTheme = 'primary';
  recordCount = 114;
  showSelector = true;
  currentPageIndex = 0;
  location = 'below';
  pages: number[] = [0, 1, 2, 3, 4, 5];


  @ViewChild(TsPaginatorComponent)
  paginator: TsPaginatorComponent;


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pages = Array.apply(null, {length: this.paginator.pagesArray.length}).map(Number.call, Number);
    });
  }


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

  perPageChange(e: number) {
    console.log('DEMO records per page changed: ', e);
  }

}
