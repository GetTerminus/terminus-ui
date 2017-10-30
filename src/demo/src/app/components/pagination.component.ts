import { Component } from '@angular/core';


@Component({
  selector: 'demo-pagination',
  template: `
    <div>
      <label for="page">
        Set the current page from the parent component:
      </label>
      <select name="page" [(ngModel)]="currentPage">
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

    <ts-pagination
      [theme]="myTheme"
      [totalRecords]="recordCount"
      [showRecordsPerPageSelector]="showSelector"
      [currentPage]="currentPage"
      [menuLocation]="location"
      [paginationMessageTemplate]="myTemplate"
      recordCountTooHighMessage="Please refine your filters."
      (pageSelect)="onPageSelect($event)"
      (firstPageChosen)="first($event)"
      (previousPageChosen)="previous($event)"
      (nextPageChosen)="next($event)"
      (lastPageChosen)="last($event)"
    ></ts-pagination>

    <ng-template #myTemplate let-message>
      <a href="components/link">{{ message }}</a>
    </ng-template>
  `,
})
export class PaginationComponent {
  myTheme = 'primary';
  recordCount = 111;
  showSelector = true;
  currentPage = 1;
  location = 'below';
  pages = [1, 2, 3, 4, 5];




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
