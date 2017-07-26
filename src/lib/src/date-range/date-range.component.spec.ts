import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TsDateRangeComponent } from './date-range.component';
import { TsDatepickerModule } from './../datepicker/datepicker.module';

@Component({
  template: `
    <div>
      <ts-date-range>
      </ts-date-range>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsDateRangeComponent)
  public dateRange: TsDateRangeComponent;
}

describe(`TsDateRangeComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TsDatepickerModule,
      ],
      declarations: [
        TsDateRangeComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.dateRange;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });


  describe(`startDateSelected()`, () => {

    it(`should not emit event if no date is passed in`, () => {
      this.component.startSelected.emit = jasmine.createSpy('emit');
      this.fixture.detectChanges();

      this.component.startDateSelected();
      expect(this.component.startSelected.emit).not.toHaveBeenCalled();
    });


    it(`should set the _startDate`, () => {
      const date = new Date(2017, 4, 1);
      this.fixture.detectChanges();
      expect(this.component._startDate).toEqual(undefined);

      this.component.startDateSelected(date);
      expect(this.component._startDate).toEqual(date);
    });


    it(`should clear the _endDate if the new start is after the current end`, () => {
      this.component._startDate = new Date(2017, 4, 1);
      this.component._endDate = new Date(2017, 4, 2);
      this.component.end.resetValue = jasmine.createSpy('resetValue');
      this.fixture.detectChanges();

      this.component.startDateSelected(new Date(2017, 4, 3));
      expect(this.component._endDate).toEqual(null);
      expect(this.component.end.resetValue).toHaveBeenCalled();
    });


    it(`should emit the startSelected event`, () => {
      this.fixture.detectChanges();
      this.component.startSelected.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.startDateSelected(date);
      expect(this.component.startSelected.emit).toHaveBeenCalled();
    });


    it(`should emit the selectedDate event`, () => {
      this.fixture.detectChanges();
      this.component.selectedDate.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.startDateSelected(date);
      expect(this.component.selectedDate.emit).toHaveBeenCalled();
    });

  });


  describe(`endDateSelected()`, () => {

    it(`should not emit if no date was passed in`, () => {
      this.fixture.detectChanges();
      this.component.endSelected.emit = jasmine.createSpy('emit');

      this.component.endDateSelected();

      expect(this.component._endDate).toEqual(undefined);
      expect(this.component.endSelected.emit).not.toHaveBeenCalled();
    });


    it(`should set the _endDate and emit the endSelected event`, () => {
      this.fixture.detectChanges();
      this.component.endSelected.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      expect(this.component._endDate).toEqual(undefined);
      this.component.endDateSelected(date);

      expect(this.component._endDate).toEqual(date);
      expect(this.component.endSelected.emit).toHaveBeenCalled();
    });


    it(`should set the _endDate and emit the selectedDate event`, () => {
      this.fixture.detectChanges();
      this.component.selectedDate.emit = jasmine.createSpy('emit');
      const date = new Date(2017, 4, 1);

      this.component.endDateSelected(date);
      expect(this.component.selectedDate.emit).toHaveBeenCalled();
    });

  });


  describe(`dateRange()`, () => {

    it(`should return the date range object`, () => {
      this.component._startDate = new Date(2017, 4, 1);
      this.component._endDate = new Date(2017, 4, 2);
      this.fixture.detectChanges();
      const actual = this.component.dateRange;

      expect(actual).toEqual(jasmine.any(Object));
      expect(actual.start).toEqual(this.component._startDate)
    });


    it(`should return null if no date is found`, () => {
      this.component._startDate = new Date(2017, 4, 1);
      this.fixture.detectChanges();
      const actual = this.component.dateRange;

      expect(actual.start).toEqual(this.component._startDate)
      expect(actual.end).toEqual(null);
    });

  });

});
