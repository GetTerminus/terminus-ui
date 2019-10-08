// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { greaterThanValidator } from './greaterThan';


describe(`greaterThanValidator`, function() {

  describe(`value input`, () => {
    let validatorFn: ValidatorFn;
    let validatorFnNoNumber: ValidatorFn;

    beforeEach(() => {
      validatorFn = greaterThanValidator(10);
      validatorFnNoNumber = greaterThanValidator();
    });


    test(`should return null  the control is invalid`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(validatorFn(val as any)).toEqual(null);
      }
    });


    test(`should return null if the number is valid`, () => {
      const values = [12, 98.6, 9999];

      for (const val of values) {
        expect(validatorFn(new FormControl(val))).toEqual(null);
      }
    });


    test(`should return the invalid response if the number is NOT valid`, () => {
      const values = [9, 10, -10, 0];

      for (const val of values) {
        const result = validatorFn(new FormControl(val));

        expect(result!.greaterThan.valid).toEqual(false);
        expect(result!.greaterThan.actual).toEqual(val);
      }
    });


    test(`should default to 0 if no number is passed in`, () => {
      const result = validatorFnNoNumber(new FormControl(0));

      expect(result!.greaterThan.valid).toEqual(false);
      expect(result!.greaterThan.actual).toEqual(0);
    });

  });


  describe(`control input`, () => {
    let validatorFn: ValidatorFn;
    let validatorFn2: ValidatorFn;
    let validatorFnNoNumber: ValidatorFn;

    beforeEach(() => {
      validatorFn = greaterThanValidator(new FormControl(10));
      validatorFnNoNumber = greaterThanValidator(new FormControl());
    });


    test(`should return null if control is null`, () => {
      validatorFn2 = greaterThanValidator(null);
      const result = validatorFn2(new FormControl('a'));

      expect(result).toEqual(null);
    });


    test(`should return null if the number is valid`, () => {
      const values = [12, 98.6, 9999];

      for (const val of values) {
        const c = new FormControl(val);
        expect(validatorFn(c)).toEqual(null);
      }
    });


    test(`should return the invalid response if the number is NOT valid`, () => {
      const values = [9, 10, -10, 0];

      for (const val of values) {
        const c = new FormControl(val);
        const result = validatorFn(c);

        expect(result!.greaterThan.valid).toEqual(false);
        expect(result!.greaterThan.actual).toEqual(val);
      }
    });


    test(`should default to 0 if no number is passed in`, () => {
      const result = validatorFnNoNumber(new FormControl(0));

      expect(result!.greaterThan.valid).toEqual(false);
      expect(result!.greaterThan.actual).toEqual(0);
    });

  });

});
