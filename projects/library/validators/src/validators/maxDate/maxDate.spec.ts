import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { maxDateValidator } from './maxDate';

describe(`maxDateValidator`, function() {
  describe(`date input`, () => {
    let maxDate: string;
    let validDate: string;
    let invalidDate: string;
    let validatorFn: ValidatorFn;
    let validDateControl: AbstractControl;
    let invalidDateControl: AbstractControl;

    beforeEach(() => {
      maxDate = new Date(2017, 4, 1).toISOString();
      validDate = new Date(2017, 3, 1).toISOString();
      invalidDate = new Date(2017, 5, 1).toISOString();
      validatorFn = maxDateValidator(maxDate);
      validDateControl = new FormControl(validDate);
      invalidDateControl = new FormControl(invalidDate);
    });

    test(`should return null if the control doesn't exist`, () => {
      expect(validatorFn(new FormControl(null))).toEqual(null);
    });

    test(`should return null if the control has no value`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

    test(`should return the invalid response if the control value is not a valid date`, () => {
      const actual = validatorFn(new FormControl('foo'))!.maxDate;
      const expected = {
        valid: false,
        maxDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

    test(`should return null if the control value is before the maxDate`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

    test(`should return the invalid response if the control value is after the maxDate`, () => {
      const actual = validatorFn(invalidDateControl)!.maxDate;
      const expected = {
        valid: false,
        maxDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe(`control input`, () => {
    let maxDate: string;
    let validDate: string;
    let invalidDate: string;
    let validatorFn: ValidatorFn;
    let validDateControl: AbstractControl;
    let invalidDateControl: AbstractControl;

    beforeEach(() => {
      maxDate = new Date(2017, 4, 1).toISOString();
      validDate = new Date(2017, 3, 1).toISOString();
      invalidDate = new Date(2017, 5, 1).toISOString();

      validatorFn = maxDateValidator(new FormControl(maxDate));

      validDateControl = new FormControl(validDate);
      invalidDateControl = new FormControl(invalidDate);
    });

    test(`should return null if the control doesn't exist`, () => {
      expect(validatorFn(new FormControl(null))).toEqual(null);
    });

    test(`should return null if the control has no value`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

    test(`should return the invalid response if the control value is not a valid date with control input`, () => {
      const actual = validatorFn(new FormControl('foo'))!.maxDate;
      const expected = {
        valid: false,
        maxDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

    test(`should return null if the control value is before the maxDate`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

    test(`should return the invalid response if the control value is after the maxDate`, () => {
      const actual = validatorFn(invalidDateControl)!.maxDate;
      const expected = {
        valid: false,
        maxDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });
  });
});
