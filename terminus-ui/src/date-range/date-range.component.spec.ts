// tslint:disable: no-non-null-assertion
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  MatDatepickerInput,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';

import { TsDateRangeComponent } from './date-range.component';


describe(`TsDateRangeComponent`, () => {
  const formBuilder = new FormBuilder();
  let component: TsDateRangeComponent;
  let date1: Date;
  let date2: Date;
  let dateRangeStart: Date;
  let dateRangeEnd: Date;
  let formGroup: FormGroup;
  let testDatepickerEvent: MatDatepickerInputEvent<Date>;
  let testDate: Date;

  beforeEach(() => {
    component = new TsDateRangeComponent();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    beforeEach(() => {
      component['seedDateRange'] = jest.fn();
      component['seedWithFormValues'] = jest.fn();
      date1 = new Date(2017, 1, 1); // feb
      date2 = new Date(2017, 2, 1); // march
      component.startInitialDate = date1;
      component.endInitialDate = date2;
      dateRangeStart = new Date(2017, 4, 6);
      dateRangeEnd = new Date(2017, 4, 8);
      formGroup = formBuilder.group({
        dateRange: formBuilder.group({
          startDate: [
            dateRangeStart,
          ],
          endDate: [
            dateRangeEnd,
          ],
        }),
      });
    });


    test(`should seed the initial values`, () => {
      component.ngOnInit();

      expect(component['seedDateRange']).toHaveBeenCalledWith(date1, date2);
      expect(component['seedWithFormValues']).not.toHaveBeenCalled();
    });


    test(`should trigger to  seed the initial dates and min/maxes`, () => {
      const group = formGroup.controls.dateRange;
      component.dateFormGroup = group;
      component.ngOnInit();

      expect(component['seedWithFormValues']).toHaveBeenCalledWith(group);
    });

  });


  describe(`seedDateRange()`, () => {

    beforeEach(() => {
      date1 = new Date(2017, 1, 1); // feb
      date2 = new Date(2017, 2, 1); // march
    });


    test(`should seed dateRange.start`, () => {
      component['seedDateRange'](date1, undefined);
      const range = component['dateRange'];
      expect(range.start).toEqual(date1);
      expect(range.end).toEqual(undefined);
    });


    test(`should seed dateRange.end`, () => {
      component['seedDateRange'](undefined, date2);
      const range = component['dateRange'];
      expect(range.start).toEqual(undefined);
      expect(range.end).toEqual(date2);
    });

  });


  describe(`seedWithFormValues()`, () => {
    let testRangeStart: Date;
    let testRangeEnd: Date;
    let formGroup1: FormGroup;
    let formGroup2: FormGroup;

    beforeEach(() => {
      testRangeStart = new Date(2017, 4, 6);
      testRangeEnd = new Date(2017, 4, 8);
      formGroup1 = formBuilder.group({
        dateRange: formBuilder.group({
          startDate: [
            testRangeStart,
          ],
          endDate: [
            null,
          ],
        }),
      });
      formGroup2 = formBuilder.group({
        dateRange: formBuilder.group({
          startDate: [
            null,
          ],
          endDate: [
            testRangeEnd,
          ],
        }),
      });
    });


    test(`should return undefined if the formGroup isn't passed in`, () => {
      const actual = component['seedWithFormValues'](null as any);
      expect(actual).toEqual(undefined);
    });


    test(`should set startInitialDate and the endDate minimum`, () => {
      component['seedWithFormValues'](formGroup1.get('dateRange') as FormGroup);

      expect(component.startInitialDate).toEqual(testRangeStart);
      expect(component.endInitialDate).toBeFalsy();

      component.endMinDate$.subscribe((v: any) => {
        expect(v).toEqual(testRangeStart);
      });
    });


    test(`should set endInitialDate and the startDate maximum`, () => {
      component['seedWithFormValues'](formGroup2.get('dateRange') as FormGroup);

      expect(component.endInitialDate).toEqual(testRangeEnd);

      component.startMaxDate$.subscribe((v: Date) => {
        expect(v).toEqual(testRangeEnd);
      });
    });

  });


  describe(`startDateSelected()`, () => {

    beforeEach(() => {
      testDate = new Date(2017, 4, 1);
      testDatepickerEvent = {
        target: {} as MatDatepickerInput<Date>,
        targetElement: {} as HTMLElement,
        value: testDate,
      };
      component.startSelected.emit = jest.fn().mockName('startSelectedEmit');
      component.selectedDate.emit = jest.fn().mockName('endSelectedEmit');
    });


    describe(`when datepickerEvent has NO value`, () => {

      beforeEach(() => {
        testDatepickerEvent.value = null;
      });


      test(`should not emit events or set values`, () => {
        component.startDateSelected(testDatepickerEvent);

        expect(component.startSelected.emit).not.toHaveBeenCalled();
        expect(component.selectedDate.emit).not.toHaveBeenCalled();
        expect(component.startDate).toBeUndefined();
      });


      test(`should pass the original endMinDate to endMinDate$`, () => {
        component.endMinDate = testDate;
        component.startDateSelected(testDatepickerEvent);

        component.endMinDate$.subscribe((v: Date) => {
          expect(v).toEqual(testDate);
        });
      });

    });


    describe(`when datepickerEvent has a value`, () => {

      test(`should set the startDate`, () => {
        expect(component.startDate).toEqual(undefined);

        component.startDateSelected(testDatepickerEvent);
        expect(component.startDate).toEqual(testDate);
      });


      test(`should emit events`, () => {
        component.startDateSelected(testDatepickerEvent);

        expect(component.startSelected.emit).toHaveBeenCalledWith(testDate);
        expect(component.selectedDate.emit).toHaveBeenCalled();
      });


      test(`should update the form value`, () => {
        dateRangeStart = new Date(2017, 4, 6);
        dateRangeEnd = new Date(2017, 4, 8);
        component.dateFormGroup = formBuilder.group({
          startDate: [
            dateRangeStart,
          ],
          endDate: [
            dateRangeEnd,
          ],
        });
        component.startDateSelected(testDatepickerEvent);

        const actualStart = component.dateFormGroup.get('startDate')!.value;
        const actualEnd = component.dateFormGroup.get('endDate')!.value;

        expect(actualStart).toEqual(testDate);
        expect(actualEnd).toEqual(dateRangeEnd);
      });

    });

  });


  describe(`endDateSelected()`, () => {

    beforeEach(() => {
      testDate = new Date(2017, 4, 1);
      testDatepickerEvent = {
        target: {} as MatDatepickerInput<Date>,
        targetElement: {} as HTMLElement,
        value: testDate,
      };
      component.endSelected.emit = jest.fn();
      component.selectedDate.emit = jest.fn();
    });


    describe(`when datepickerEvent has NO value`, () => {

      beforeEach(() => {
        testDatepickerEvent.value = null;
      });


      test(`should pass the original startMaxDate to _startMaxDate$`, () => {
        component.startMaxDate = testDate;
        component.endDateSelected(testDatepickerEvent);

        component.startMaxDate$.subscribe((v: any) => {
          expect(v).toEqual(testDate);
        });
      });


      test(`should not emit if no date was passed in`, () => {
        component.endSelected.emit = jest.fn();
        component.endDateSelected(testDatepickerEvent);

        expect(component.endSelected.emit).not.toHaveBeenCalled();
        expect(component.selectedDate.emit).not.toHaveBeenCalled();
        expect(component.endDate).toBeUndefined();
      });

    });


    describe(`when datepickerEvent has a value`, () => {

      test(`should set the endDate`, () => {
        expect(component.endDate).toEqual(undefined);

        component.endDateSelected(testDatepickerEvent);

        expect(component.endDate).toEqual(testDate);
      });


      test(`should emit events`, () => {
        component.selectedDate.emit = jest.fn();
        component.endDateSelected(testDatepickerEvent);

        expect(component.endSelected.emit).toHaveBeenCalledWith(testDate);
        expect(component.selectedDate.emit).toHaveBeenCalledWith({
          end: testDate,
          start: undefined,
        });
      });


      test(`should update the form value`, () => {
        dateRangeStart = new Date(2017, 4, 6);
        dateRangeEnd = new Date(2017, 4, 8);
        component.dateFormGroup = formBuilder.group({
          startDate: [
            dateRangeStart,
          ],
          endDate: [
            dateRangeEnd,
          ],
        });
        component.endDateSelected(testDatepickerEvent);

        const actualStart = component.dateFormGroup.get('startDate')!.value;
        const actualEnd = component.dateFormGroup.get('endDate')!.value;

        expect(actualStart).toEqual(dateRangeStart);
        expect(actualEnd).toEqual(testDate);
      });

    });

  });


  describe(`dateRange()`, () => {

    test(`should return the date range object`, () => {
      component.startDate = new Date(2017, 4, 1);
      component.endDate = new Date(2017, 4, 2);
      const actual = component['dateRange'];

      expect(actual).toBeTruthy();
      expect(actual.start).toEqual(component.startDate);
    });


    test(`should return null if no date is found`, () => {
      component.startDate = new Date(2017, 4, 1);
      const actual = component['dateRange'];

      expect(actual.start).toEqual(component.startDate);
      expect(actual.end).toEqual(undefined);
    });

  });


  describe(`startDateControl`, () => {

    test(`should use fallback control if one was not passed in`, () => {
      expect(component.startDateControl instanceof AbstractControl).toBeTruthy();
    });

  });


  describe(`endDateControl`, () => {

    test(`should use fallback control if one was not passed in`, () => {
      component.theme = 'accent';
      expect(component.endDateControl instanceof AbstractControl).toBeTruthy();
      expect(component.theme).toEqual('accent');
    });

  });


  describe(`blur events`, () => {
    const date = new Date(2018, 1, 1);

    test(`should set the start date`, () => {
      component.startBlur(undefined);
      expect(component.startDate).toEqual(undefined);
      expect(component.endMinDate$.getValue()).toEqual(undefined);

      component.startBlur(date);
      expect(component.startDate).toEqual(date);
      expect(component.endMinDate$.getValue()).toEqual(date);
    });


    test(`should set the end date`, () => {
      component.endBlur(undefined);
      expect(component.endDate).toEqual(undefined);
      expect(component.startMaxDate$.getValue()).toEqual(undefined);

      component.endBlur(date);
      expect(component.endDate).toEqual(date);
      expect(component.startMaxDate$.getValue()).toEqual(date);
    });

  });

});
