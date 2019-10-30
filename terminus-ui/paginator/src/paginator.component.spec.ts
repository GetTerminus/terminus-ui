import { Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';

import * as TestComponents from '../testing/src/test-components';
import {
  clickToChangePage,
  expectAllButtonsEnabled,
  getPaginatorInstance,
  updateRecordsPerPage,
} from '../testing/src/test-helpers';
import { TsPaginatorMenuItem } from './paginator.component';
import { TsPaginatorModule } from './paginator.module';


// FIXME: Tests should not rely on QA* classes
describe(`TsPaginatorComponent`, function() {
  test(`should exist`, () => {
    const fixture = createComponent(TestComponents.Basic);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-paginator'))).toBeTruthy();
  });

  describe(`showRecordsPerPageSelector`, () => {
    let fixture: ComponentFixture<TestComponents.RecordsPerPage>;
    let hostComponent: TestComponents.RecordsPerPage;

    beforeEach(() => {
      fixture = createComponent(TestComponents.RecordsPerPage);
      hostComponent = fixture.componentInstance;
    });

    test(`should set and retrieve dropdown to choose page`, () => {
      fixture.detectChanges();

      expect(hostComponent.showRecordsPerPageSelector).toEqual(true);
      expect(fixture.debugElement.query(By.css('.qa-paginator-per-page-select'))).toBeTruthy();
    });

    test(`should change page on select`, () => {
      const index: string = hostComponent.recordsPerPageChoices[1].toString();
      fixture.detectChanges();
      updateRecordsPerPage(fixture, index);

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      expect(titleEl.textContent).toContain('1 - 20 of 100');

    });

    test(`should be hidden when set`, () => {
      hostComponent.showRecordsPerPageSelector = false;
      fixture.detectChanges();

      expect(hostComponent.showRecordsPerPageSelector).toEqual(false);
      expect(fixture.debugElement.query(By.css('.qa-paginator-per-page-select'))).toBeFalsy();
    });
  });

  describe(`clicking page buttons`, () => {
    let fixture: ComponentFixture<TestComponents.RecordsPerPage>;

    beforeEach(() => {
      fixture = createComponent(TestComponents.RecordsPerPage);
    });

    test(`should go to the next page`, fakeAsync(() => {
      fixture.detectChanges();
      const dir = 'next';
      tick(2000);
      clickToChangePage(fixture, dir);

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const nextPageIndex = instance.nextPageIndex;

      expect(titleEl.textContent).toContain('11 - 20 of 100');
      expect(nextPageIndex).toEqual(1);
    }));

    test(`should go to the previous page`, fakeAsync(() => {
      fixture.detectChanges();
      const dir = 'previous';
      tick(2000);
      clickToChangePage(fixture, 'next');

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;

      expect(titleEl.textContent).toContain('11 - 20 of 100');

      clickToChangePage(fixture, dir);

      expect(titleEl.textContent).toContain('1 - 10 of 100');
    }));

    test(`should go to the first page and disable first & prev buttons`, fakeAsync(() => {
      fixture.detectChanges();
      const dir = 'first';
      tick(2000);
      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      clickToChangePage(fixture, 'next');
      clickToChangePage(fixture, 'next');

      expect(titleEl.textContent).toContain('21 - 30 of 100');

      clickToChangePage(fixture, dir);

      const firstPageBut =
        fixture.debugElement.query(By.css(`.qa-paginator-${dir}-page-button .c-button`)).nativeElement as HTMLButtonElement;
      const previousPageBut =
        fixture.debugElement.query(By.css(`.qa-paginator-previous-page-button .c-button`)).nativeElement as HTMLButtonElement;

      expect(titleEl.textContent).toContain('1 - 10 of 100');
      expect(firstPageBut.disabled).toEqual(true);
      expect(previousPageBut.disabled).toEqual(true);
    }));


    test(`should go to the last page and disable last and next buttons`, fakeAsync(() => {
      fixture.detectChanges();
      const dir = 'last';
      tick(2000);
      clickToChangePage(fixture, dir);

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const lastPageBut =
        fixture.debugElement.query(By.css(`.qa-paginator-${dir}-page-button .c-button`)).nativeElement as HTMLButtonElement;
      const nextPageBut =
        fixture.debugElement.query(By.css(`.qa-paginator-next-page-button .c-button`)).nativeElement as HTMLButtonElement;

      expect(titleEl.textContent).toContain('91 - 100 of 100');
      expect(lastPageBut.disabled).toEqual(true);
      expect(nextPageBut.disabled).toEqual(true);
    }));

  });

  describe(`current page menu`, () => {
    let fixture: ComponentFixture<TestComponents.RecordsPerPage>;
    let hostComponent: TestComponents.RecordsPerPage;

    beforeEach(() => {
      fixture = createComponent(TestComponents.RecordsPerPage);
      hostComponent = fixture.componentInstance;
    });

    test(`should default to first set of results`, () => {
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const firstPageIndex = instance.firstPageIndex;

      expect(titleEl.textContent).toContain('1 - 10 of 100');
      expect(instance.isFirstPage(firstPageIndex)).toEqual(true);
    });

    /**
     * TODO: revisit this after menu component has been converted to integration tests
     * menu:  https://github.com/GetTerminus/terminus-ui/issues/1288
     * paginator: https://github.com/GetTerminus/terminus-ui/issues/1512
     */
    test.todo(`should change page when another page is selected from the menu`);

    test(`should show all results if they fit on a page, zeroBased`, () => {
      hostComponent.totalRecords = 8;
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const firstPageIndex = instance.firstPageIndex;

      expect(titleEl.textContent).toContain('1 - 8 of 8');
      expect(instance.isFirstPage(firstPageIndex)).toEqual(true);

      expectAllButtonsEnabled(fixture);
    });

    test(`should show all results if they fit on a page, not zeroBased`, () => {
      hostComponent.totalRecords = 8;
      hostComponent.zeroBased = false;
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const firstPageIndex = instance.firstPageIndex;

      expect(titleEl.textContent).toContain('1 - 8 of 8');
      expect(instance.isFirstPage(firstPageIndex)).toEqual(true);

      expectAllButtonsEnabled(fixture);
    });

    test(`should specify partial results on the last page, zeroBased`, fakeAsync(() => {
      // testing number coercion
      hostComponent.totalRecords = '95' as any;
      fixture.detectChanges();
      tick(2000);
      clickToChangePage(fixture, 'last');

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const lastPageIndex = instance.lastPageIndex;

      expect(titleEl.textContent).toContain('91 - 95 of 95');
      expect(instance.isLastPage(lastPageIndex)).toEqual(true);
    }));

    test(`should specify partial results on the last page, not zeroBased`, fakeAsync(() => {
      hostComponent.totalRecords = 15;
      hostComponent.zeroBased = false;
      fixture.detectChanges();
      tick(2000);
      clickToChangePage(fixture, 'last');

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;
      const instance = getPaginatorInstance(fixture);
      const lastPageIndex = instance.lastPageIndex;

      expect(titleEl.textContent).toContain('11 - 15 of 15');
      expect(instance.isLastPage(lastPageIndex)).toEqual(true);
    }));

    test(`should return to current page if invalid page is requested`, () => {
      const requestedPage: TsPaginatorMenuItem = {
        name: '10',
        value: 10,
      };
      fixture.detectChanges();
      const instance = getPaginatorInstance(fixture);
      instance.currentPageChanged(requestedPage);

      const titleEl = fixture.debugElement.query(By.css('.qa-paginator-current-page-menu .c-button__content')).nativeElement as HTMLElement;

      expect(titleEl.textContent).toContain('91 - 100 of 100');
      expect(instance.currentPageIndex).toEqual(instance.lastPageIndex);
    });
  });

  describe(`isZeroBased`, () => {

    test(`should be zero-based by default`, () => {
      const fixture = createComponent(TestComponents.Basic);
      fixture.detectChanges();
      const instance = getPaginatorInstance(fixture);

      expect(instance.isZeroBased).toEqual(true);
      expect(instance.firstPageIndex).toEqual(0);
      expect(instance.currentPageIndex).toEqual(0);
    });

    test(`should not be zero-based when set`, () => {
      const fixture = createComponent(TestComponents.ZeroBased);
      const instance = getPaginatorInstance(fixture);
      const hostComponent = fixture.componentInstance;
      hostComponent.isZeroBased = false;
      fixture.detectChanges();

      expect(instance.isZeroBased).toEqual(false);
      expect(instance.firstPageIndex).toEqual(1);
      expect(instance.currentPageIndex).toEqual(1);
    });

    test(`should adjust lastPageIndex`, () => {
      const fixture = createComponent(TestComponents.ZeroBased);
      const instance = getPaginatorInstance(fixture);
      const hostComponent = fixture.componentInstance;
      hostComponent.isZeroBased = true;
      fixture.detectChanges();

      expect(instance.lastPageIndex).toEqual(9);

      hostComponent.isZeroBased = false;
      fixture.detectChanges();

      expect(instance.lastPageIndex).toEqual(10);
    });
  });


  describe(`recordCountTooHighMessage`, () => {

    test(`should not display message when totalRecords is less than maxPreferredRecords`, () => {
      const fixture = createComponent(TestComponents.RecordsPerPage);
      const instance = getPaginatorInstance(fixture);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.c-paginator__message'))).toBeFalsy();
      expect(instance.totalRecords).toEqual(100);
      expect(instance.maxPreferredRecords).toEqual(100);
    });

    test(`should display message when totalRecords is greater than maxPreferredRecords`, () => {
      const fixture = createComponent(TestComponents.RecordsPerPage);
      const hostComponent = fixture.componentInstance;
      hostComponent.totalRecords = 125;
      fixture.detectChanges();

      const messageEl = fixture.debugElement.query(By.css('.c-paginator__message')).nativeElement as HTMLElement;
      expect(messageEl.textContent!.trim()).toEqual('That\'s a lot of results! Try refining your filters for better results.');
    });

    test(`should update message text`, () => {
      const fixture = createComponent(TestComponents.RecordsCount);
      const hostComponent = fixture.componentInstance;
      hostComponent.recordCountTooHighMessage = 'There are too many results!';
      fixture.detectChanges();

      const messageEl = fixture.debugElement.query(By.css('.c-paginator__message')).nativeElement as HTMLElement;

      expect(messageEl.textContent!.trim()).toEqual('There are too many results!');
    });

    test(`should set maxPreferredRecords`, () => {
      const fixture = createComponent(TestComponents.RecordsCount);
      const hostComponent = fixture.componentInstance;
      const instance = getPaginatorInstance(fixture);
      hostComponent.maxPreferredRecords = 200;
      fixture.detectChanges();

      expect(instance.maxPreferredRecords).toEqual(200);
      expect(fixture.debugElement.query(By.css('.c-paginator__message'))).toBeFalsy();
    });
  });


  /*
   * TODO: revisit this after tooltip tests have been converted to integration tests
   * tooltip:   https://github.com/GetTerminus/terminus-ui/issues/1296
   * paginator: https://github.com/GetTerminus/terminus-ui/issues/1512
   */
  describe(`tooltips`, () => {

    test.todo(`should display default tooltips by default`);

    test.todo(`should update tooltips if set`);

  });

});


/**
 * HELPERS
 */

function createComponent<T>(component: Type<T>): ComponentFixture<T> {

  return createComponentInner<T>(
    component,
    undefined,
    [
      TsPaginatorModule,
    ],
  );
}
