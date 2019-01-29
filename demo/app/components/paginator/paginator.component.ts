import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from '@terminus/ui/paginator';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


@Component({
  selector: 'demo-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements AfterViewInit {
  myTheme: TsStyleThemeTypes = 'primary';
  recordCount = 114;
  showSelector = true;
  currentPageIndex = 0;
  location = 'below';
  pages: number[] = [0, 1, 2, 3, 4, 5];
  zeroBased = false;

  @ViewChild(TsPaginatorComponent)
  paginator!: TsPaginatorComponent;


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pages = Array.apply(null, {length: this.paginator.pagesArray.length}).map(Number.call, Number);
    });
  }


  onPageSelect(e: TsPaginatorMenuItem): void {
    console.log('DEMO: page selected: ', e);
  }


  perPageChange(e: number): void {
    console.log('DEMO: records per page changed: ', e);
  }

}
