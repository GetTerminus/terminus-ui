import {
  ChangeDetectorRef,
  Component,
  ViewChild,
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
export class PaginatorComponent {
  myTheme: TsStyleThemeTypes = 'primary';
  recordCount = 114;
  showSelector = true;
  currentPageIndex = 0;
  location = 'below';
  pages: number[] = [0, 1, 2, 3, 4, 5];
  zeroBased = true;
  simpleMode = false;

  @ViewChild(TsPaginatorComponent, {static: true})
  paginator!: TsPaginatorComponent;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  updatePages(isZeroBased: boolean): void {
    Promise.resolve().then(() => {
      if (isZeroBased) {
        this.pages = Array.from(Array(this.paginator.pagesArray.length).keys());
      } else {
        // NOTE: Prepending the incrementer (++) will increment the value _before_ returning the value.
        this.pages = Array.from(Array(this.paginator.pagesArray.length).keys()).map(v => ++v);
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  onPageSelect(e: TsPaginatorMenuItem): void {
    console.log('DEMO: page selected: ', e);
  }


  perPageChange(e: number): void {
    console.log('DEMO: records per page changed: ', e);
  }

}
