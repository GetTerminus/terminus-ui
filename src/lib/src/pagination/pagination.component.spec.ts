import { TsPaginationComponent } from './pagination.component';
import { TsPaginationMenuItem } from '../utilities/interfaces';


describe(`PaginationComponent`, () => {

  beforeEach(() => {
    this.component = new TsPaginationComponent();
    this.TOTAL_RECORDS = 100;
  });


  it(`should exist`, () => {
    this.component.totalRecords = 125;
    this.component.ngOnInit();

    expect(this.component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    it(`should call the initialization method`, () => {
      this.component.initialize = jasmine.createSpy('initialize');
      this.component.ngOnInit();

      expect(this.component.initialize).toHaveBeenCalled();
    });

  });


  describe(`ngOnChanges()`, () => {

    it(`should call the initialization method`, () => {
      this.component.initialize = jasmine.createSpy('initialize');
      this.component.ngOnChanges({});

      expect(this.component.initialize).toHaveBeenCalled();
    });


    it(`should set the recordCountTooHighMessage if passed in`, () => {
      this.component.initialize = jasmine.createSpy('initialize');
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

  });


  describe(`currentPageChanged()`, () => {

    it(`should set the current page, and trigger methods`, () => {
      const eventMock = {
        name: '21 - 30 of 125',
        value: '3',
      };
      spyOn(this.component.pageSelect, 'emit').and.callThrough();
      spyOn(this.component, 'createPagesArray').and.callThrough();
      spyOn(this.component, 'createCurrentPageLabel').and.callThrough();
      this.component.totalRecords = 125;
      this.component.ngOnInit();

      expect(this.component.currentPage).toEqual(1);

      this.component.currentPageChanged(eventMock);

      expect(this.component.currentPage).toEqual(3);
      expect(this.component.createPagesArray).toHaveBeenCalled();
      expect(this.component.createCurrentPageLabel).toHaveBeenCalled();
      expect(this.component.pageSelect.emit).toHaveBeenCalled();
    });

  });


  describe(`changePage()`, () => {

    it(`should fake a changed page event when valid`, () => {
      spyOn(this.component, 'currentPageChanged').and.callThrough();
      this.component.totalRecords = 125;
      this.component.ngOnInit();
      this.component.changePage(2, 1, this.component.pagesArray);

      expect(this.component.currentPageChanged).toHaveBeenCalled();
    });


    it(`should do nothing when the destination is not valid`, () => {
      spyOn(this.component, 'currentPageChanged');
      this.component.totalRecords = 125;
      this.component.ngOnInit();

      this.component.changePage(0, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();

      const invalidLength = this.component.pagesArray.length + 2;
      this.component.changePage(invalidLength, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });


    it(`should do nothing when already on the requested page`, () => {
      spyOn(this.component, 'currentPageChanged');
      this.component.totalRecords = 125;
      this.component.ngOnInit();

      this.component.changePage(2, 2, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });

  });


  describe(`isFirstPage()`, () => {

    it(`should return TRUE when the passed in page is 1`, () => {
      this.component.totalRecords = 125;
      this.component.ngOnInit();

      expect(this.component.isFirstPage(1)).toEqual(true);
    });


    it(`should return FALSE when the passed in page is not 1`, () => {
      this.component.totalRecords = 125;
      this.component.ngOnInit();

      expect(this.component.isFirstPage(7)).toEqual(false);
      expect(this.component.isFirstPage(0)).toEqual(false);
      expect(this.component.isFirstPage(-2)).toEqual(false);
    });

  });


  describe(`isLastPage()`, () => {

    it(`should return TRUE when the page is the last in the array`, () => {
      this.component.totalRecords = 20;
      this.component.ngOnInit();

      expect(this.component.isLastPage(2)).toEqual(true);
    });


    it(`should return FALSE when the page is not the last in the array`, () => {
      this.component.totalRecords = 20;
      this.component.ngOnInit();

      expect(this.component.isLastPage(1)).toEqual(false);
    });


    it(`should return FALSE if the pagesArray doesn't exist`, () => {
      this.pagesArray = undefined;

      expect(this.component.isLastPage(1)).toEqual(false);
    });
  });


  describe(`shouldShowRecordsMessage()`, () => {

    it(`should return TRUE if there are more records than the recommended max and the message exists`, () => {
      this.component.totalRecords = 101;
      this.component.ngOnInit();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 101);
      const expected = true;
      expect(actual).toEqual(expected);
    });


    it(`should return FALSE if there are more records than the recommended max but there is no message`, () => {
      this.component.totalRecords = 101;
      this.component.ngOnInit();

      const actual = this.component.shouldShowRecordsMessage('', 100, 101);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    it(`should return FALSE if there are less records than the recommended max`, () => {
      this.component.totalRecords = 99;
      this.component.ngOnInit();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 99);
      const expected = false;
      expect(actual).toEqual(expected);
    });

  });


  describe(`recordsPerPageUpdated()`, () => {

    it(`should update the records per page, reset current page & re-initialize`, () => {
      spyOn(this.component, 'initialize');
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();

      this.component.recordsPerPageUpdated(25);

      expect(this.component.recordsPerPage).toEqual(25);
      expect(this.component.currentPage).toEqual(1);
      expect(this.component.initialize).toHaveBeenCalled();
    });

  });


  describe(`menuIsDisabled()`, () => {

    it(`should return TRUE if there are less than 2 pages`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();

      expect(this.component.menuIsDisabled(1)).toEqual(true);
    });


    it(`should return FALSE if there are 2 or more pages`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();

      expect(this.component.menuIsDisabled(3)).toEqual(false);
    });

  });


  describe(`disableRecordsPerPage()`, () => {
    const options = [5, 10, 20];

    it(`should return TRUE if there are fewer records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();

      expect(this.component.disableRecordsPerPage(4, options)).toEqual(true);
    });


    it(`should return FALSE if there are more records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();

      expect(this.component.disableRecordsPerPage(6, options)).toEqual(false);
    });

  });


  describe(`createCurrentPageLabel()`, () => {

    it(`should return a valid title`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();
      const actual = this.component.createCurrentPageLabel(2, this.component.pagesArray, 100);
      const expected = '11 - 20 of 100';

      expect(actual).toEqual(expected);
    });


    it(`should return a valid title when no records exist`, () => {
      this.component.ngOnInit();
      const actual = this.component.createCurrentPageLabel(1, [], 0);
      const expected = '0 of 0';

      expect(actual).toEqual(expected);
    });


    it(`should return a valid title when the requested page doesn't exist`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();
      const actual = this.component.createCurrentPageLabel(11, this.component.pagesArray, this.TOTAL_RECORDS);
      const expected = '91 - 100 of 100';

      expect(actual).toEqual(expected);
    });

  });


  describe(`createPagesArray()`, () => {

    it(`should return an empty array if there are no records`, () => {
      this.component.ngOnInit();
      const actual = this.component.createPagesArray(0, 10);
      const expected: TsPaginationMenuItem[] = [];

      expect(actual).toEqual(expected);
    });


    it(`should create a valid array`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();
      const actual = this.component.createPagesArray(105, 10);
      const expected = 11;

      expect(actual.length).toEqual(expected);
    });


    it(`should create a final page when fewer than the per-page amount are remaining`, () => {
      this.component.totalRecords = this.TOTAL_RECORDS;
      this.component.ngOnInit();
      const array = this.component.createPagesArray(105, 10);
      const expected = 11;

      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('101 - 105');
    });


    it(`should create a valid array when there are fewer total records than the per page amount`, () => {
      this.component.totalRecords = 8;
      this.component.ngOnInit();
      const array = this.component.createPagesArray(8, 10);
      const expected = 1;

      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('1 - 8');
    });

  });


  describe(`trackPagesArray()`, () => {

    it(`should return a tracking property or undefined`, () => {
      expect(this.component.trackPagesArray(1, {name: 'foo'})).toEqual('foo');
      expect(this.component.trackPagesArray(2, {name: 'bar'})).toEqual('bar');
      expect(this.component.trackPagesArray(3, null)).toBeUndefined();
    });

  });

});
