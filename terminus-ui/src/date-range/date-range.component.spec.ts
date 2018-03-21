import {
  FormBuilder,
} from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';

import { TsDateRangeComponent } from './date-range.component';


describe(`TsDateRangeComponent`, () => {

  beforeEach(() => {
    this.component = new TsDateRangeComponent();
  });


  test(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    beforeEach(() => {
      this.component.seedDateRange = jest.fn();
      this.component.seedWithFormValues = jest.fn();
      this.date1 = new Date(2017, 1, 1); // feb
      this.date2 = new Date(2017, 2, 1); // march
      this.component.startInitialDate = this.date1;
      this.component.endInitialDate = this.date2;
      this.dateRangeStart = new Date(2017, 4, 6);
      this.dateRangeEnd = new Date(2017, 4, 8);
      this.formBuilder = new FormBuilder();
      this.formGroup = this.formBuilder.group({
        dateRange: this.formBuilder.group({
          startDate: [
            this.dateRangeStart,
          ],
          endDate: [
            this.dateRangeEnd,
          ],
        }),
      });
    });


    test(`should seed the initial values`, () => {
      this.component.ngOnInit();

      expect(this.component.seedDateRange).toHaveBeenCalledWith(this.date1, this.date2);
      expect(this.component.seedWithFormValues).not.toHaveBeenCalled();
    });


    test(`should trigger to  seed the initial dates and min/maxes`, () => {
      const group = this.formGroup.controls.dateRange;
      this.component.dateFormGroup = group;
      this.component.ngOnInit();

      expect(this.component.seedWithFormValues).toHaveBeenCalledWith(group);
    });

  });


  describe(`seedDateRange()`, () => {

    beforeEach(() => {
      this.date1 = new Date(2017, 1, 1); // feb
      this.date2 = new Date(2017, 2, 1); // march
    });


    test(`should seed dateRange.start`, () => {
      this.component.seedDateRange(this.date1, null);
      const range = this.component.dateRange;
      expect(range.start).toEqual(this.date1);
      expect(range.end).toEqual(null);
    });


    test(`should seed dateRange.end`, () => {
      this.component.seedDateRange(null, this.date2);
      const range = this.component.dateRange;
      expect(range.start).toEqual(null);
      expect(range.end).toEqual(this.date2);
    });

  });


  describe(`seedWithFormValues()`, () => {

    beforeEach(() => {
      this.testRangeStart = new Date(2017, 4, 6);
      this.testRangeEnd = new Date(2017, 4, 8);
      this.formBuilder = new FormBuilder();
      this.formGroup1 = this.formBuilder.group({
        dateRange: this.formBuilder.group({
          startDate: [
            this.testRangeStart,
          ],
          endDate: [
            null,
          ],
        }),
      });
      this.formGroup2 = this.formBuilder.group({
        dateRange: this.formBuilder.group({
          startDate: [
            null,
          ],
          endDate: [
            this.testRangeEnd,
          ],
        }),
      });
    });


    test(`should set startInitialDate and the endDate minimum`, () => {
      this.component.seedWithFormValues(this.formGroup1.get('dateRange'));

      expect(this.component.startInitialDate).toEqual(this.testRangeStart);
      expect(this.component.endInitialDate).toBeFalsy();

      this.component._endMinDate$.subscribe((v: any) => {
        expect(v).toEqual(this.testRangeStart);
      });
    });


    test(`should set endInitialDate and the startDate maximum`, () => {
      this.component.seedWithFormValues(this.formGroup2.get('dateRange'));

      expect(this.component.endInitialDate).toEqual(this.testRangeEnd);

      this.component._startMaxDate$.subscribe((v: any) => {
        expect(v).toEqual(this.testRangeEnd);
      });
    });

  });


  describe(`startDateSelected()`, () => {

    beforeEach(() => {
      this.testDate = new Date(2017, 4, 1);
      this.testDatepickerEvent = {
        target: {} as MatDatepickerInput<Date>,
        targetElement: {} as HTMLElement,
        value: this.testDate,
      };
      this.component.startSelected.emit = jest.fn().mockName('startSelectedEmit');
      this.component.selectedDate.emit = jest.fn().mockName('endSelectedEmit');
    });


    describe(`when datepickerEvent has NO value`, () => {

      beforeEach(() => {
        this.testDatepickerEvent.value = null;
      });


      test(`should not emit events or set values`, () => {
        this.component.startDateSelected(this.testDatepickerEvent);

        expect(this.component.startSelected.emit).not.toHaveBeenCalled();
        expect(this.component.selectedDate.emit).not.toHaveBeenCalled();
        expect(this.component.startDate).toBeUndefined();
      });


      test(`should pass the original endMinDate to _endMinDate$`, () => {
        this.component.endMinDate = this.testDate;
        this.component.startDateSelected(this.testDatepickerEvent);

        this.component._endMinDate$.subscribe((v: any) => {
          expect(v).toEqual(this.testDate);
        });
      });

    });


    describe(`when datepickerEvent has a value`, () => {

      test(`should set the startDate`, () => {
        expect(this.component.startDate).toEqual(undefined);

        this.component.startDateSelected(this.testDatepickerEvent);
        expect(this.component.startDate).toEqual(this.testDate);
      });


      test(`should emit events`, () => {
        this.component.startDateSelected(this.testDatepickerEvent);

        expect(this.component.startSelected.emit).toHaveBeenCalledWith(this.testDate);
        expect(this.component.selectedDate.emit).toHaveBeenCalled();
      });


      test(`should update the form value`, () => {
        this.dateRangeStart = new Date(2017, 4, 6);
        this.dateRangeEnd = new Date(2017, 4, 8);
        this.formBuilder = new FormBuilder();
        this.component.dateFormGroup = this.formBuilder.group({
          startDate: [
            this.dateRangeStart,
          ],
          endDate: [
            this.dateRangeEnd,
          ],
        });
        this.component.startDateSelected(this.testDatepickerEvent);

        const actualStart = this.component.dateFormGroup.get('startDate').value;
        const actualEnd = this.component.dateFormGroup.get('endDate').value;

        expect(actualStart).toEqual(this.testDate);
        expect(actualEnd).toEqual(this.dateRangeEnd);
      });

    });

  });


  describe(`endDateSelected()`, () => {

    beforeEach(() => {
      this.testDate = new Date(2017, 4, 1);
      this.testDatepickerEvent = {
        target: {} as MatDatepickerInput<Date>,
        targetElement: {} as HTMLElement,
        value: this.testDate,
      };
      this.component.endSelected.emit = jest.fn();
      this.component.selectedDate.emit = jest.fn();
    });


    describe(`when datepickerEvent has NO value`, () => {

      beforeEach(() => {
        this.testDatepickerEvent.value = null;
      });


      test(`should pass the original startMaxDate to _startMaxDate$`, () => {
        this.component.startMaxDate = this.testDate;
        this.component.endDateSelected(this.testDatepickerEvent);

        this.component._startMaxDate$.subscribe((v: any) => {
          expect(v).toEqual(this.testDate);
        });
      });


      test(`should not emit if no date was passed in`, () => {
        this.component.endSelected.emit = jest.fn();
        this.component.endDateSelected(this.testDatepickerEvent);

        expect(this.component.endSelected.emit).not.toHaveBeenCalled();
        expect(this.component.selectedDate.emit).not.toHaveBeenCalled();
        expect(this.component.endDate).toBeUndefined();
      });

    });


    describe(`when datepickerEvent has a value`, () => {

      test(`should set the endDate`, () => {
        expect(this.component.endDate).toEqual(undefined);

        this.component.endDateSelected(this.testDatepickerEvent);

        expect(this.component.endDate).toEqual(this.testDate);
      });


      test(`should emit events`, () => {
        this.component.selectedDate.emit = jest.fn();
        this.component.endDateSelected(this.testDatepickerEvent);

        expect(this.component.endSelected.emit).toHaveBeenCalledWith(this.testDate);
        expect(this.component.selectedDate.emit.mock.calls[0][0]).toEqual({
          end: this.testDate,
          start: null,
        });
      });


      test(`should update the form value`, () => {
        this.dateRangeStart = new Date(2017, 4, 6);
        this.dateRangeEnd = new Date(2017, 4, 8);
        this.formBuilder = new FormBuilder();
        this.component.dateFormGroup = this.formBuilder.group({
          startDate: [
            this.dateRangeStart,
          ],
          endDate: [
            this.dateRangeEnd,
          ],
        });
        this.component.endDateSelected(this.testDatepickerEvent);

        const actualStart = this.component.dateFormGroup.get('startDate').value;
        const actualEnd = this.component.dateFormGroup.get('endDate').value;

        expect(actualStart).toEqual(this.dateRangeStart);
        expect(actualEnd).toEqual(this.testDate);
      });

    });

  });


  describe(`dateRange()`, () => {

    test(`should return the date range object`, () => {
      this.component.startDate = new Date(2017, 4, 1);
      this.component.endDate = new Date(2017, 4, 2);
      const actual = this.component.dateRange;

      expect(actual).toBeTruthy();
      expect(actual.start).toEqual(this.component.startDate);
    });


    test(`should return null if no date is found`, () => {
      this.component.startDate = new Date(2017, 4, 1);
      const actual = this.component.dateRange;

      expect(actual.start).toEqual(this.component.startDate);
      expect(actual.end).toEqual(null);
    });

  });

});
