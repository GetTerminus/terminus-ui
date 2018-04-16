// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { maxDateValidator } from './maxDate';


describe(`maxDateValidator`, () => {
  let maxDate: string;
  let validDate: string;
  let invalidDate: string;
  let validatorFn: ValidatorFn;
  let invalidValidatorFn: ValidatorFn;
  let validDateControl: AbstractControl;
  let invalidDateControl: AbstractControl;

  beforeEach(() => {
    maxDate = new Date(2017, 4, 1).toISOString();
    validDate = new Date(2017, 3, 1).toISOString();
    invalidDate = new Date(2017, 5, 1).toISOString();

    validatorFn = maxDateValidator(maxDate);
    invalidValidatorFn = maxDateValidator('foo');

    validDateControl = new FormControl(validDate);
    invalidDateControl = new FormControl(invalidDate);
  });


  describe(`if the control doesn't exist`, () => {

    it(`should return null`, () => {
      expect(validatorFn(new FormControl(null))).toEqual(null);
    });

  });


  describe(`if the control has no value`, () => {

    test(`should return null`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

  });


  describe(`if the maxDate is not a valid date`, () => {

    it(`should return null`, () => {
      expect(invalidValidatorFn(validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is not a valid date`, () => {

    it(`should return the invalid response`, () => {
      const actual = validatorFn(new FormControl('foo'))!.maxDate;
      const expected = {
        valid: false,
        maxDate: maxDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

  });


  describe(`if the control value is before the maxDate`, () => {

    it(`should return null`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is after the maxDate`, () => {

    it(`should return the invalid response`, () => {
      const actual = validatorFn(invalidDateControl)!.maxDate;
      const expected = {
        valid: false,
        maxDate: maxDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });

  });

});
