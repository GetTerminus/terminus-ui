import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import {
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from './paginator.component';


describe(`TsPaginatorComponent`, () => {

  beforeEach(() => {
    this.component = new TsPaginatorComponent(
      new ChangeDetectorRefMock(),
    );
    this.TOTAL_RECORDS = 100;
  });


  test(`should exist`, () => {
    this.component.totalRecords = 125;
    this.component.ngAfterViewInit();

    expect(this.component).toBeTruthy();
  });


  describe(`ngAfterViewInit()`, () => {

    test(`should call the initialization method`, () => {
      this.component.initialize = jest.fn();
      this.component.ngAfterViewInit();

      expect(this.component.initialize).toHaveBeenCalled();
    });

  });


  describe(`ngOnChanges()`, () => {

    beforeEach(() => {
      this.component.initialize = jest.fn();
    });


    test(`should call the initialization method`, () => {
      this.component.ngOnChanges({});

      expect(this.component.initialize).toHaveBeenCalled();
    });


    test(`should set the recordCountTooHighMessage if passed in`, () => {
      this.component.recordCountTooHighMessage = 'my new message';
      // Fake the change event that Angular would normally trigger
      this.component.ngOnChanges({
        recordCountTooHighMessage: {
          previousValue: 'old message',
          currentValue: 'my new message',
        },
      });

      expect(this.component.templateContext.$implicit).toEqual('my new message');
    });


    test(`should reset currentPageIndex if isZeroBased changed`, () => {
      // Fake the change event that Angular would normally trigger
      this.component.ngOnChanges({
        isZeroBased: {
          previousValue: true,
          currentValue: false,
        },
      });

      expect(this.component.currentPageIndex).toEqual(1);
    });

  });


  describe(`currentPageChanged()`, () => {

    test(`should set the current page, and trigger methods`, () => {
      const eventMock = {
        name: '21 - 30 of 125',
        value: '2',
      };
      spyOn(this.component.pageSelect, 'emit').and.callThrough();
      spyOn(this.component, 'createPagesArray').and.callThrough();
      spyOn(this.component, 'createCurrentPageLabel').and.callThrough();
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();

      expect(this.component.currentPageIndex).toEqual(0);

      this.component.currentPageChanged(eventMock);

      expect(this.component.currentPageIndex).toEqual(2);
      expect(this.component.createPagesArray).toHaveBeenCalled();
      expect(this.component.createCurrentPageLabel).toHaveBeenCalled();
      expect(this.component.pageSelect.emit).toHaveBeenCalled();
    });

  });


  describe(`changePage()`, () => {

    test(`should fake a changed page event when valid`, () => {
      spyOn(this.component, 'currentPageChanged').and.callThrough();
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();
      this.component.changePage(2, 1, this.component.pagesArray);

      expect(this.component.currentPageChanged).toHaveBeenCalled();
    });


    test(`should do nothing when the destination is not valid`, () => {
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();
      spyOn(this.component, 'currentPageChanged');

      this.component.changePage(-1, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();

      const invalidLength = this.component.pagesArray.length + 2;
      this.component.changePage(invalidLength, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });


    test(`should do nothing when already on the requested page`, () => {
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();
      spyOn(this.component, 'currentPageChanged');

      this.component.changePage(2, 2, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });

  });


  describe(`isFirstPage()`, () => {

    test(`should return TRUE when the passed in page is 0`, () => {
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();

      expect(this.component.isFirstPage(0)).toEqual(true);
    });


    test(`should return FALSE when the passed in page is not 0`, () => {
      this.component.totalRecords = 125;
      this.component.ngAfterViewInit();

      expect(this.component.isFirstPage(7)).toEqual(false);
      expect(this.component.isFirstPage(1)).toEqual(false);
      expect(this.component.isFirstPage(-2)).toEqual(false);
    });

  });


  describe(`isLastPage()`, () => {

    test(`should return TRUE when the page is the last in the array`, () => {
      this.component.totalRecords = 20;
      this.component.ngAfterViewInit();

      expect(this.component.isLastPage(1)).toEqual(true);
    });


    test(`should return FALSE when the page is not the last in the array`, () => {
      this.component.totalRecords = 20;
      this.component.ngAfterViewInit();

      expect(this.component.isLastPage(0)).toEqual(false);
    });


    test(`should return FALSE if the pagesArray doesn't exist`, () => {
      this.pagesArray = undefined;

      expect(this.component.isLastPage(1)).toEqual(false);
    });
  });


  describe(`shouldShowRecordsMessage()`, () => {

    test(`should return TRUE if there are more records than the recommended max and the message exists`, () => {
      this.component.totalRecords = 101;
      this.component.ngAfterViewInit();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 101);
      const expected = true;
      expect(actual).toEqual(expected);
    });


    test(`should return FALSE if there are more records than the recommended max but there is no message`, () => {
      this.component.totalRecords = 101;
      this.component.ngAfterViewInit();

      const actual = this.component.shouldShowRecordsMessage('', 100, 101);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    test(`should return FALSE if there are less records than the recommended max`, () => {
      this.component.totalRecords = 99;
      this.component.ngAfterViewInit();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 99);
      const expected = false;
      expect(actual).toEqual(expected);
    });

  });


  describe(`recordsPerPageUpdated()`, () => {

    test(`should update the records per page, reset current page & re-initialize`, () => {
      spyOn(this.component, 'initialize');
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();

      this.component.recordsPerPageUpdated(25);

      expect(this.component.recordsPerPage).toEqual(25);
      expect(this.component.currentPageIndex).toEqual(0);
      expect(this.component.initialize).toHaveBeenCalled();
    });

  });


  describe(`menuIsDisabled()`, () => {

    test(`should return TRUE if there are less than 2 pages`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();

      expect(this.component.menuIsDisabled(1)).toEqual(true);
    });


    test(`should return FALSE if there are 2 or more pages`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();

      expect(this.component.menuIsDisabled(3)).toEqual(false);
    });

  });


  describe(`disableRecordsPerPage()`, () => {
    const options = [5, 10, 20];

    test(`should return TRUE if there are fewer records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();

      expect(this.component.disableRecordsPerPage(4, options)).toEqual(true);
    });


    test(`should return FALSE if there are more records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();

      expect(this.component.disableRecordsPerPage(6, options)).toEqual(false);
    });

  });


  describe(`createCurrentPageLabel()`, () => {

    test(`should return a valid title`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();
      const actual = this.component.createCurrentPageLabel(2, this.component.pagesArray, 100);
      const expected = '21 - 30 of 100';

      expect(actual).toEqual(expected);
    });


    test(`should return a valid title when no records exist`, () => {
      this.component.ngAfterViewInit();
      const actual = this.component.createCurrentPageLabel(1, [], 0);
      const expected = '0 of 0';

      expect(actual).toEqual(expected);
    });


    test(`should return a valid title when the requested page doesn't exist`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngAfterViewInit();
      const actual = this.component.createCurrentPageLabel(10, this.component.pagesArray, this.TOTAL_RECORDS);
      const expected = '91 - 100 of 100';

      expect(actual).toEqual(expected);
    });

  });


  describe(`createPagesArray()`, () => {

    test(`should return an empty array if there are no records`, () => {
      const actual = this.component.createPagesArray(0, 10, true);
      const expected: TsPaginatorMenuItem[] = [];

      expect(actual).toEqual(expected);
    });


    test(`should create a valid array`, () => {
      const actual = this.component.createPagesArray(105, 10, true);
      const expected = 11;

      expect(actual.length).toEqual(expected);
    });


    test(`should create a final page when fewer than the per-page amount are remaining`, () => {
      const array = this.component.createPagesArray(105, 10, true);
      const expected = 11;

      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('101 - 105');
    });


    test(`should create a valid array when there are fewer total records than the per page amount`, () => {
      const array = this.component.createPagesArray(8, 10, true);
      const expected = 1;

      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('1 - 8');
    });


    test(`should create a valid array with '1' as the base page value`, () => {
      const array = this.component.createPagesArray(105, 10, false);
      const expected = 11;

      expect(array.length).toEqual(expected);
      expect(array[0].value).toEqual('1');
    });

  });


  describe(`trackPagesArray()`, () => {

    test(`should return a tracking property or undefined`, () => {
      expect(this.component.trackPagesArray(1, {name: 'foo'})).toEqual('foo');
      expect(this.component.trackPagesArray(2, {name: 'bar'})).toEqual('bar');
      expect(this.component.trackPagesArray(3, null)).toBeUndefined();
    });

  });


  describe(`isZeroBased`, () => {

    test(`should should set/get the value`, () => {
      expect(this.component.isZeroBased).toEqual(true);
      this.component.isZeroBased = 'false';

      expect(this.component.isZeroBased).toEqual(false);
    });

  });


  describe(`nextPageIndex`, () => {

    test(`should return the index for the next page`, () => {
      this.component.isZeroBased = false;
      this.component.currentPageIndex = 10;

      expect(this.component.nextPageIndex).toEqual(9);
    });

  });


  describe(`lastPageIndex`, () => {

    test(`should return the index for the last page`, () => {
      this.component.isZeroBased = true;
      this.component.pagesArray = [1, 2, 3, 4, 5];

      expect(this.component.lastPageIndex).toEqual(4);
    });

  });

});
