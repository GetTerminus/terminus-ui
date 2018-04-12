// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { minDateValidator } from './minDate';


describe(`minDateValidator`, () => {
  let minDate: string;
  let validDate: string;
  let invalidDate: string;
  let validatorFn: ValidatorFn;
  let invalidValidatorFn: ValidatorFn;
  let nullControl: AbstractControl;
  let stringControl: AbstractControl;
  let validDateControl: AbstractControl;
  let invalidDateControl: AbstractControl;


  beforeEach(() => {
    minDate = new Date(2017, 4, 1).toISOString();
    validDate = new Date(2017, 5, 1).toISOString();
    invalidDate = new Date(2017, 3, 1).toISOString();

    validatorFn = minDateValidator(minDate);
    invalidValidatorFn = minDateValidator('foo');

    nullControl = new FormControl(null);
    stringControl = new FormControl('foo');
    validDateControl = new FormControl(validDate);
    invalidDateControl = new FormControl(invalidDate);
  });


  describe(`if the control doesn't exist`, () => {

    it(`should return null`, () => {
      expect(validatorFn(nullControl)).toEqual(null);
    });

  });


  describe(`if the control has no value`, () => {

    test(`should return null`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });

  });


  describe(`if the minDate is not a valid date`, () => {

    it(`should return null`, () => {
      expect(invalidValidatorFn(validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is not a valid date`, () => {

    it(`should return the invalid response`, () => {
      const actual = validatorFn(stringControl)!.minDate;
      const expected = {
        valid: false,
        minDate: minDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

  });


  describe(`if the control value is after the minDate`, () => {

    it(`should return null`, () => {
      expect(validatorFn(validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is before the minDate`, () => {

    it(`should return the invalid response`, () => {
      const actual = validatorFn(invalidDateControl)!.minDate;
      const expected = {
        valid: false,
        minDate: minDate,
        actual: invalidDate,
      };

      expect(actual).toEqual(expected);
    });

  });

});
