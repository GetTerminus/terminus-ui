import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TsSelectModule } from './../select/select.module';
import { TsButtonModule } from './../button/button.module';
import { TsMenuModule } from './../menu/menu.module';

import { TsPaginationComponent } from './pagination.component';

@Component({
  template: `
    <div>
      <ts-pagination></ts-pagination>
    </div>
  `,
})
class TestHostComponent {
}

describe(`PaginationComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        TsSelectModule,
        TsButtonModule,
        TsMenuModule,
      ],
      declarations: [
        TsPaginationComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsPaginationComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsPaginationComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    this.component.totalRecords = 125;
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });


  describe(`currentPageChanged()`, () => {

    it(`should set the current page, and trigger methods`, () => {
      const eventMock = {
        name: '21 - 30 of 125',
        value: '3',
      };
      spyOn(this.component.pageSelect, 'emit').and.callThrough();
      spyOn(this.component, '_createPagesArray').and.callThrough();
      spyOn(this.component, '_createCurrentPageLabel').and.callThrough();
      this.component.totalRecords = 125;
      this.fixture.detectChanges();

      expect(this.component.currentPage).toEqual(1);

      this.component.currentPageChanged(eventMock);

      expect(this.component.currentPage).toEqual(3);
      expect(this.component._createPagesArray).toHaveBeenCalled();
      expect(this.component._createCurrentPageLabel).toHaveBeenCalled();
      expect(this.component.pageSelect.emit).toHaveBeenCalled();
    });

  });


  describe(`changePage()`, () => {

    it(`should fake a changed page event when valid`, () => {
      spyOn(this.component, 'currentPageChanged').and.callThrough();
      this.component.totalRecords = 125;
      this.fixture.detectChanges();
      this.component.changePage(2, 1, this.component.pagesArray);

      expect(this.component.currentPageChanged).toHaveBeenCalled();
    });


    it(`should do nothing when the destination is not valid`, () => {
      spyOn(this.component, 'currentPageChanged');
      this.component.totalRecords = 125;
      this.fixture.detectChanges();

      this.component.changePage(0, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();

      const invalidLength = this.component.pagesArray.length + 2;
      this.component.changePage(invalidLength, 1, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });


    it(`should do nothing when already on the requested page`, () => {
      spyOn(this.component, 'currentPageChanged');
      this.component.totalRecords = 125;
      this.fixture.detectChanges();

      this.component.changePage(2, 2, this.component.pagesArray);
      expect(this.component.currentPageChanged).not.toHaveBeenCalled();
    });

  });


  describe(`isFirstPage()`, () => {

    it(`should return TRUE when the passed in page is 1`, () => {
      this.component.totalRecords = 125;
      this.fixture.detectChanges();

      expect(this.component.isFirstPage(1)).toEqual(true);
    });


    it(`should return FALSE when the passed in page is not 1`, () => {
      this.component.totalRecords = 125;
      this.fixture.detectChanges();

      expect(this.component.isFirstPage(7)).toEqual(false);
      expect(this.component.isFirstPage(0)).toEqual(false);
      expect(this.component.isFirstPage(-2)).toEqual(false);
    });

  });


  describe(`isLastPage()`, () => {

    it(`should return TRUE when the page is the last in the array`, () => {
      this.component.totalRecords = 20;
      this.fixture.detectChanges();

      expect(this.component.isLastPage(2)).toEqual(true);
    });


    it(`should return FALSE when the page is not the last in the array`, () => {
      this.component.totalRecords = 20;
      this.fixture.detectChanges();

      expect(this.component.isLastPage(1)).toEqual(false);
    });

  });


  describe(`shouldShowRecordsMessage()`, () => {

    it(`should return TRUE if there are more records than the recommended max and the message exists`, () => {
      this.component.totalRecords = 101;
      this.fixture.detectChanges();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 101);
      const expected = true;
      expect(actual).toEqual(expected);
    });


    it(`should return FALSE if there are more records than the recommended max but there is no message`, () => {
      this.component.totalRecords = 101;
      this.fixture.detectChanges();

      const actual = this.component.shouldShowRecordsMessage('', 100, 101);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    it(`should return FALSE if there are less records than the recommended max`, () => {
      this.component.totalRecords = 99;
      this.fixture.detectChanges();

      const actual = this.component.shouldShowRecordsMessage('foo', 100, 99);
      const expected = false;
      expect(actual).toEqual(expected);
    });

  });


  describe(`recordsPerPageUpdated()`, () => {

    it(`should update the records per page, reset current page & re-initialize`, () => {
      spyOn(this.component, 'initialize');
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      this.component.recordsPerPageUpdated(25);

      expect(this.component.recordsPerPage).toEqual(25);
      expect(this.component.currentPage).toEqual(1);
      expect(this.component.initialize).toHaveBeenCalled();
    });

  });


  describe(`menuIsDisabled()`, () => {

    it(`should return TRUE if there are less than 2 pages`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      expect(this.component.menuIsDisabled(1)).toEqual(true);
    });


    it(`should return FALSE if there are 2 or more pages`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      expect(this.component.menuIsDisabled(3)).toEqual(false);
    });

  });


  describe(`disableRecordsPerPage()`, () => {
    const options = [5, 10, 20];

    it(`should return TRUE if there are fewer records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      expect(this.component.disableRecordsPerPage(4, options)).toEqual(true);
    });


    it(`should return FALSE if there are more records than the amount of the lowest records-per-page option`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      expect(this.component.disableRecordsPerPage(6, options)).toEqual(false);
    });

  });


  describe(`_createCurrentPageLabel()`, () => {

    it(`should return a valid title`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      const actual = this.component._createCurrentPageLabel(2, this.component.pagesArray, 100);
      const expected = '11 - 20 of 100';
      expect(actual).toEqual(expected);
    });


    it(`should return a valid title when the requested page does't exist`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      const actual = this.component._createCurrentPageLabel(11, this.component.pagesArray, 100);
      const expected = '91 - 100 of 100';
      expect(actual).toEqual(expected);
    });

  });


  describe(`_createPagesArray()`, () => {

    it(`should create a valid array`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      const actual = this.component._createPagesArray(105, 10);
      const expected = 11;
      expect(actual.length).toEqual(expected);
    });


    it(`should create a final page when fewer than the per-page amount are remaining`, () => {
      this.component.totalRecords = 100;
      this.fixture.detectChanges();

      const array = this.component._createPagesArray(105, 10);
      const expected = 11;
      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('101 - 105');
    });


    it(`should create a valid array when there are fewer total records than the per page amount`, () => {
      this.component.totalRecords = 8;
      this.fixture.detectChanges();

      const array = this.component._createPagesArray(8, 10);
      const expected = 1;
      expect(array.length).toEqual(expected);
      expect(array[array.length - 1].name).toEqual('1 - 8');
    });

  });

});
