// tslint:disable: no-non-null-assertion
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { TsDateRangeComponent } from './date-range.component';


/**
 * NOTE (B$): The ideal test would be to actually check the DOM to verify that specific dates are disabled etc. I was not having any luck
 * querying that deeply into the generated DOM. So, for now, we are simply testing the class as fully as possible.
 */


describe(`TsDateRangeComponent`, () => {
  const formBuilder = new FormBuilder();
  let component: TsDateRangeComponent;
  let dateRangeStart: Date;
  let dateRangeEnd: Date;
  let formGroup: FormGroup;
  let testDate: Date;

  beforeEach(() => {
    component = new TsDateRangeComponent();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    beforeEach(() => {
      component['initializeMinAndMax'] = jest.fn();
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


    test(`should do nothing if no form group exists`, () => {
      component.ngOnInit();

      expect(component['initializeMinAndMax']).not.toHaveBeenCalled();
    });


    test(`should trigger to seed the initial dates and min/maxes`, () => {
      const group = formGroup.controls.dateRange;
      component.dateFormGroup = group;
      component.ngOnInit();

      expect(component['initializeMinAndMax']).toHaveBeenCalledWith(group);
    });

  });


  describe(`initializeMinAndMax`, () => {

    test(`should return undefined if the formGroup isn't passed in`, () => {
      expect(component['initializeMinAndMax'](null as any)).toEqual(undefined);
    });


    test(`should set endMinDate$ and startMaxDate$`, () => {
      const testRangeStart = new Date(2017, 4, 6);
      const testRangeEnd = new Date(2017, 4, 8);
      const formGroup1 = formBuilder.group({
        dateRange: formBuilder.group({
          startDate: [
            testRangeStart,
          ],
          endDate: [
            testRangeEnd,
          ],
        }),
      });
      component['initializeMinAndMax'](formGroup1.get('dateRange') as FormGroup);
      component.endMinDate$.next = jest.fn();
      component.startMaxDate$.next = jest.fn();

      component.endMinDate$.subscribe((v: Date) => {
        expect(v).toEqual(testRangeStart);
      });
      component.startMaxDate$.subscribe((v: Date) => {
        expect(v).toEqual(testRangeEnd);
      });
      expect.assertions(2);
    });

  });


  describe(`startDateSelected()`, () => {

    beforeEach(() => {
      testDate = new Date(2017, 4, 1);
      component.startSelected.emit = jest.fn();
      component.change.emit = jest.fn();
      component.endMinDate = new Date(2017, 1, 1);
    });


    describe(`when no date is selected`, () => {

      test(`should not emit events or set values and reset endMinDate$`, () => {
        component.startDateSelected(undefined as any);

        expect(component.startSelected.emit).not.toHaveBeenCalled();
        expect(component.change.emit).not.toHaveBeenCalled();
        component.endMinDate$.subscribe((v: Date) => {
          expect(v).toEqual(component.endMinDate);
        });
        expect.assertions(3);
      });


      test(`should pass the original endMinDate to endMinDate$`, () => {
        component.endMinDate = testDate;
        component.startDateSelected(testDate);

        component.endMinDate$.subscribe((v: Date) => {
          expect(v).toEqual(testDate);
        });
      });

    });


    describe(`when datepickerEvent has a value`, () => {

      test(`should emit events`, () => {
        component.startDateSelected(testDate);

        expect(component.startSelected.emit).toHaveBeenCalledWith(testDate);
        expect(component.change.emit).toHaveBeenCalled();
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
        component.startDateSelected(testDate);

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
      component.endSelected.emit = jest.fn();
      component.change.emit = jest.fn();
    });


    describe(`when no date is passed in`, () => {

      test(`should pass the original startMaxDate to _startMaxDate$`, () => {
        component.startMaxDate = testDate;
        component.endDateSelected(testDate);

        component.startMaxDate$.subscribe((v: Date) => {
          expect(v).toEqual(testDate);
        });
      });


      test(`should not emit if no date was passed in`, () => {
        component.endSelected.emit = jest.fn();
        component.endDateSelected(undefined as any);

        expect(component.endSelected.emit).not.toHaveBeenCalled();
        expect(component.change.emit).not.toHaveBeenCalled();
      });

    });


    describe(`when a date is passed in`, () => {

      test(`should emit events`, () => {
        const date = new Date(2017, 2, 3);
        component.change.emit = jest.fn();
        component.startDateControl.setValue(date);
        component.endDateControl.setValue(new Date(2017, 2, 4));
        component.endDateSelected(date);

        expect(component.endSelected.emit).toHaveBeenCalledWith(date);
        expect(component.change.emit).toHaveBeenCalledWith({
          end: new Date(2017, 2, 4),
          start: new Date(2017, 2, 3),
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
        component.endDateSelected(testDate);

        const actualStart = component.dateFormGroup.get('startDate')!.value;
        const actualEnd = component.dateFormGroup.get('endDate')!.value;

        expect(actualStart).toEqual(dateRangeStart);
        expect(actualEnd).toEqual(testDate);
      });

    });

  });


  describe(`dateRange()`, () => {

    test(`should return the date range object`, () => {
      component.startDateControl.setValue(new Date(2017, 4, 1));
      component.endDateControl.setValue(new Date(2017, 4, 2));
      const actual = component['dateRange'];

      expect(actual).toBeTruthy();
      expect(actual.start).toEqual(new Date(2017, 4, 1));
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
      expect(component.endMinDate$.getValue()).toEqual(undefined);

      component.startBlur(date);
      expect(component.endMinDate$.getValue()).toEqual(date);
    });


    test(`should set the end date`, () => {
      component.endBlur(undefined);
      expect(component.startMaxDate$.getValue()).toEqual(undefined);

      component.endBlur(date);
      expect(component.startMaxDate$.getValue()).toEqual(date);
    });

  });


  describe(`isDisabled`, () => {

    test(`should set the disabled flag`, () => {
      expect(component.isDisabled).toEqual(false);

      component.isDisabled = true;

      expect(component.isDisabled).toEqual(true);
    });

    });

  });

})
