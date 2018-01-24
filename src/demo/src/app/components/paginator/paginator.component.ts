import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { TsPaginatorComponent } from '@terminus/ui';


@Component({
  selector: 'demo-paginator',
  templateUrl: './paginator.component.html',
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
