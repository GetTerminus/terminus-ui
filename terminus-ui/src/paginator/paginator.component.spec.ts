import {
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import { TsSelectComponent, TsSelectChange } from '../select/select.component';
import { TsPaginatorComponent } from './paginator.component';


describe(`TsPaginatorComponent`, function() {
  let component: TsPaginatorComponent;
  const TOTAL_RECORDS = 100;

  beforeEach(() => {
    component = new TsPaginatorComponent(
      new ChangeDetectorRefMock(),
    );
  });


  test(`should exist`, () => {
    component.totalRecords = 125;
    component.ngAfterViewInit();

    expect(component).toBeTruthy();
  });

  describe(`showRecordsPerPageSelector`, () => {
    test(`should set and retrieve`, () => {
      component.showRecordsPerPageSelector = true;
      expect(component.showRecordsPerPageSelector).toEqual(true);
    });
  });


  describe(`ngAfterViewInit()`, () => {

    test(`should call the initialization method`, () => {
      component['initialize'] = jest.fn();
      component.ngAfterViewInit();

      expect(component['initialize']).toHaveBeenCalled();
    });

  });


  describe(`ngOnChanges()`, () => {

    beforeEach(() => {
      component['initialize'] = jest.fn();
    });


    test(`should call the initialization method`, () => {
      component.ngOnChanges({});

      expect(component['initialize']).toHaveBeenCalled();
    });


    test(`should set the recordCountTooHighMessage if passed in`, () => {
      component.recordCountTooHighMessage = 'my new message';
      const changesMock: SimpleChanges = {
        recordCountTooHighMessage: new SimpleChange('old message', 'my new message', false),
      };
      // Fake the change event that Angular would normally trigger
      component.ngOnChanges(changesMock);

      expect(component.templateContext.$implicit).toEqual('my new message');
    });


    test(`should reset currentPageIndex if isZeroBased changed`, () => {
      const changesMock1: SimpleChanges = {
        isZeroBased: new SimpleChange(true, false, false),
      };
      // Fake the change event that Angular would normally trigger
      component.ngOnChanges(changesMock1);

      expect(component.currentPageIndex).toEqual(1);

      const changesMock2: SimpleChanges = {
        isZeroBased: new SimpleChange(false, true, false),
      };
      // Fake the change event that Angular would normally trigger
      component.ngOnChanges(changesMock2);

      expect(component.currentPageIndex).toEqual(0);
    });

  });


  describe(`currentPageChanged()`, () => {

    test(`should set the current page, and trigger methods`, () => {
      const eventMock = {
        name: '21 - 30 of 125',
        value: 2,
      };
      component.pageSelect.emit = jest.fn();
      component['createCurrentPageLabel'] = jest.fn();
      component.totalRecords = 125;
      component.ngAfterViewInit();

      expect(component.currentPageIndex).toEqual(0);

      component.currentPageChanged(eventMock);

      expect(component.currentPageIndex).toEqual(2);
      expect(component['createCurrentPageLabel']).toHaveBeenCalled();
      expect(component.pageSelect.emit).toHaveBeenCalled();
    });

  });


  describe(`changePage()`, () => {

    test(`should fake a changed page event when valid`, () => {
      spyOn(component, 'currentPageChanged').and.callThrough();
      component.totalRecords = 125;
      component.ngAfterViewInit();
      component.changePage(2, 1, component.pagesArray);

      expect(component.currentPageChanged).toHaveBeenCalled();
    });


    test(`should do nothing when the destination is not valid`, () => {
      component.totalRecords = 125;
      component.ngAfterViewInit();
      spyOn(component, 'currentPageChanged');

      component.changePage(-1, 1, component.pagesArray);
      expect(component.currentPageChanged).not.toHaveBeenCalled();

      const invalidLength = component.pagesArray.length + 2;
      component.changePage(invalidLength, 1, component.pagesArray);
      expect(component.currentPageChanged).not.toHaveBeenCalled();
    });


    test(`should do nothing when already on the requested page`, () => {
      component.totalRecords = 125;
      component.ngAfterViewInit();
      spyOn(component, 'currentPageChanged');

      component.changePage(2, 2, component.pagesArray);
      expect(component.currentPageChanged).not.toHaveBeenCalled();
    });

  });


  describe(`isFirstPage()`, () => {

    test(`should return TRUE when the passed in page is 0`, () => {
      component.totalRecords = 125;
      component.ngAfterViewInit();

      expect(component.isFirstPage(0)).toEqual(true);
    });


    test(`should return FALSE when the passed in page is not 0`, () => {
      component.totalRecords = 125;
      component.ngAfterViewInit();

      expect(component.isFirstPage(7)).toEqual(false);
      expect(component.isFirstPage(1)).toEqual(false);
      expect(component.isFirstPage(-2)).toEqual(false);
    });

  });


  describe(`isLastPage()`, () => {

    test(`should return TRUE when the page is the last in the array`, () => {
      component.totalRecords = 20;
      component.ngAfterViewInit();

      expect(component.isLastPage(1)).toEqual(true);
    });


    test(`should return FALSE when the page is not the last in the array`, () => {
      component.totalRecords = 20;
      component.ngAfterViewInit();

      expect(component.isLastPage(0)).toEqual(false);
    });


    test(`should return FALSE if the pagesArray doesn't exist`, () => {
      component.pagesArray = undefined as any;

      expect(component.isLastPage(1)).toEqual(false);
    });


    test(`should return TRUE when the page is the last in the array and not zero-based`, () => {
      component.totalRecords = 20;
      component.isZeroBased = false;
      component.ngAfterViewInit();

      expect(component.isLastPage(2)).toEqual(true);
    });

  });


  describe(`shouldShowRecordsMessage()`, () => {

    test(`should return TRUE if there are more records than the recommended max and the message exists`, () => {
      component.totalRecords = 101;
      component.ngAfterViewInit();

      const actual = component.shouldShowRecordsMessage('foo', 100, 101);
      const expected = true;
      expect(actual).toEqual(expected);
    });


    test(`should return FALSE if there are more records than the recommended max but there is no message`, () => {
      component.totalRecords = 101;
      component.ngAfterViewInit();

      const actual = component.shouldShowRecordsMessage('', 100, 101);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    test(`should return FALSE if there are less records than the recommended max`, () => {
      component.totalRecords = 99;
      component.ngAfterViewInit();

      const actual = component.shouldShowRecordsMessage('foo', 100, 99);
      const expected = false;
      expect(actual).toEqual(expected);
    });

  });


  describe(`recordsPerPageUpdated()`, () => {

    test(`should update the records per page, reset current page & re-initialize`, () => {
      component['initialize'] = jest.fn();
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();
      const change = new TsSelectChange({} as TsSelectComponent, 25);

      component.recordsPerPageUpdated(change);

      expect(component.recordsPerPage).toEqual(25);
      expect(component.currentPageIndex).toEqual(0);
      expect(component['initialize']).toHaveBeenCalled();
    });

  });


  describe(`menuIsDisabled()`, () => {

    test(`should return TRUE if there are less than 2 pages`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();

      expect(component.menuIsDisabled(1)).toEqual(true);
    });


    test(`should return FALSE if there are 2 or more pages`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();

      expect(component.menuIsDisabled(3)).toEqual(false);
    });

  });


  describe(`disableRecordsPerPage()`, () => {
    const options = [5, 10, 20];

    test(`should return TRUE if there are fewer records than the amount of the lowest records-per-page option`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();

      expect(component.disableRecordsPerPage(4, options)).toEqual(true);
    });


    test(`should return FALSE if there are more records than the amount of the lowest records-per-page option`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();

      expect(component.disableRecordsPerPage(6, options)).toEqual(false);
    });

  });


  describe(`createCurrentPageLabel()`, () => {

    test(`should return a valid title`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();
      const actual = component['createCurrentPageLabel'](2, component.pagesArray, 100);
      const expected = '21 - 30 of 100';

      expect(actual).toEqual(expected);
    });


    test(`should return a valid title when no records exist`, () => {
      component.ngAfterViewInit();
      const actual = component['createCurrentPageLabel'](1, [], 0);
      const expected = '0 of 0';

      expect(actual).toEqual(expected);
    });


    test(`should return a valid title when the requested page doesn't exist`, () => {
      component.totalRecords = TOTAL_RECORDS;
      component.ngAfterViewInit();
      const actual = component['createCurrentPageLabel'](10, component.pagesArray, TOTAL_RECORDS);
      const expected = '91 - 100 of 100';

      expect(actual).toEqual(expected);
    });

  });


  describe(`createPagesArray()`, () => {

    test(`should return an empty array if there are no records`, () => {
      const actual = component['createPagesArray'](0, 10, true);

      expect(actual).toEqual([]);
    });


    test(`should create a valid array`, () => {
      const actual = component['createPagesArray'](105, 10, true);

      expect(actual.length).toEqual(11);
    });


    test(`should create a final page when fewer than the per-page amount are remaining`, () => {
      const array = component['createPagesArray'](105, 10, true);

      expect(array.length).toEqual(11);
      expect(array[array.length - 1].name).toEqual('101 - 105');
    });


    test(`should create a valid array when there are fewer total records than the per page amount`, () => {
      const array1 = component['createPagesArray'](8, 10, true);
      expect(array1.length).toEqual(1);
      expect(array1[array1.length - 1].name).toEqual('1 - 8');

      const array2 = component['createPagesArray'](8, 10, false);
      expect(array2.length).toEqual(1);
      expect(array2[array2.length - 1].name).toEqual('1 - 8');
    });


    test(`should create a valid array with '1' as the base page value`, () => {
      const array = component['createPagesArray'](105, 10, false);

      expect(array.length).toEqual(11);
      expect(array[0].value).toEqual(1);
    });


    test(`should create a valid array with more than 10 per page`, () => {
      // 1-based
      const actual1 = component['createPagesArray'](59, 50, false);
      const expected1 = [
        {
          name: '1 - 50',
          value: 1,
        },
        {
          name: '51 - 59',
          value: 2,
        },
      ];

      expect(actual1).toEqual(expected1);

      // 0-based
      const actual2 = component['createPagesArray'](59, 50, true);
      const expected2 = [
        {
          name: '1 - 50',
          value: 0,
        },
        {
          name: '51 - 59',
          value: 1,
        },
      ];

      expect(actual2).toEqual(expected2);
    });

  });


  describe(`trackPagesArray()`, () => {

    test(`should return a tracking property or undefined`, () => {
      expect(component.trackPagesArray(1, {name: 'foo'})).toEqual('foo');
      expect(component.trackPagesArray(2, {name: 'bar'})).toEqual('bar');
      expect(component.trackPagesArray(3, null as any)).toBeUndefined();
    });

  });


  describe(`isZeroBased`, () => {

    test(`should should set/get the value`, () => {
      expect(component.isZeroBased).toEqual(true);
      component.isZeroBased = 'false' as any;

      expect(component.isZeroBased).toEqual(false);
    });

  });


  describe(`nextPageIndex`, () => {

    test(`should return the index for the next page`, () => {
      component.isZeroBased = false;
      component.currentPageIndex = 10;

      expect(component.nextPageIndex).toEqual(9);
    });

  });


  describe(`lastPageIndex`, () => {

    test(`should return the index for the last page`, () => {
      component.isZeroBased = true;
      component.pagesArray = [1, 2, 3, 4, 5] as any[];

      expect(component.lastPageIndex).toEqual(4);
    });


    test(`should return the index for the last page when not zero-based`, () => {
      component.isZeroBased = false;
      component.pagesArray = [1, 2, 3, 4, 5] as any[];

      expect(component.lastPageIndex).toEqual(5);
    });

  });

});
