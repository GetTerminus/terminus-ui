import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { minDateValidator } from './minDate';

describe(`minDateValidator`, function() {
  describe(`date input`, () => {
    let minDate: string;
    let validDate: string;
    let invalidDate: string;
    let validatorFn: ValidatorFn;
    let nullControl: AbstractControl;
    let stringControl: AbstractControl;
    let validDateControl: AbstractControl;
    let invalidDateControl: AbstractControl;

    beforeEach(() => {
      minDate = new Date(2017, 4, 1).toISOString();
      validDate = new Date(2017, 5, 1).toISOString();
      invalidDate = new Date(2017, 3, 1).toISOString();

      validatorFn = minDateValidator(minDate);

      nullControl = new FormControl(null);
      stringControl = new FormControl('foo');
      validDateControl = new FormControl(validDate);
      invalidDateControl = new FormControl(invalidDate);
    });

    test(`should return null if the control doesn't exist`, () => {
      expect(validatorFn(nullControl)).toEqual(null);
    });

    test(`should return null if the control has no value`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

    test(`should return the invalid response if the control value is not a valid date`, () => {
      const actual = validatorFn(stringControl)!.minDate;
      const expected = {
        valid: false,
        minDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

    test(`should return null if the control value is after the minDate`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

    test(`should return the invalid response if the control value is before the minDate`, () => {
      const actual = validatorFn(invalidDateControl)!.minDate;
      const expected = {
        valid: false,
        minDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe(`control input`, () => {
    let minDate: string;
    let validDate: string;
    let invalidDate: string;
    let validatorFn: ValidatorFn;
    let nullControl: AbstractControl;
    let stringControl: AbstractControl;
    let validDateControl: AbstractControl;
    let invalidDateControl: AbstractControl;

    beforeEach(() => {
      minDate = new Date(2017, 4, 1).toISOString();
      validDate = new Date(2017, 5, 1).toISOString();
      invalidDate = new Date(2017, 3, 1).toISOString();

      validatorFn = minDateValidator(new FormControl(minDate));

      nullControl = new FormControl(null);
      stringControl = new FormControl('foo');
      validDateControl = new FormControl(validDate);
      invalidDateControl = new FormControl(invalidDate);
    });

    test(`should return null if the control doesn't exist`, () => {
      expect(validatorFn(nullControl)).toEqual(null);
    });

    test(`should return null if the control has no value`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

    test(`should return the invalid response if the control value is not a valid date`, () => {
      const actual = validatorFn(stringControl)!.minDate;
      const expected = {
        valid: false,
        minDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

    test(`should return null if the control value is after the minDate`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

    test(`should return the invalid response if the control value is before the minDate`, () => {
      const actual = validatorFn(invalidDateControl)!.minDate;
      const expected = {
        valid: false,
        minDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });
  });
});
