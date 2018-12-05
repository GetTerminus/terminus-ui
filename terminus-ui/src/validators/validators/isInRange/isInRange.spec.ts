// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { isInRangeValidator } from './isInRange';


describe(`isInRangeValidator`, () => {

  describe(`value input`, () => {
    let validatorFn: ValidatorFn;
    let validatorFnNoNumber: ValidatorFn;

    beforeEach(() => {
      validatorFn = isInRangeValidator(10, 100);
      validatorFnNoNumber = isInRangeValidator();
    });


    test(`should return null if the control is invalid`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(validatorFn(val as any)).toEqual(null);
      }
    });


    test(`should return null if the number is valid`, () => {
      const values = [12, 10, 98.6];

      for (const val of values) {
        expect(validatorFn(new FormControl(val))).toEqual(null);
      }
    });


    test(`should return the invalid response if the number is NOT valid`, () => {
      const values = [9, -10, 0];

      for (const val of values) {
        const result = validatorFn(new FormControl(val));

        expect(result!.isInRange.valid).toEqual(false);
        expect(result!.isInRange.actual).toEqual(val);
      }
    });


    test(`should default to 0 if no number is passed in`, () => {
      expect(validatorFnNoNumber(new FormControl(0))).toEqual(null);
    });

  });


  describe(`control input`, () => {
    let validatorFn: ValidatorFn;
    let validatorFn2: ValidatorFn;
    let validatorFnNoNumber: ValidatorFn;

    beforeEach(() => {
      validatorFn = isInRangeValidator(new FormControl(10), new FormControl(100));
      validatorFnNoNumber = isInRangeValidator(new FormControl());
    });


    test(`should return null if control is null`, () => {
      validatorFn2 = isInRangeValidator(null);
      const result = validatorFn2(new FormControl('a'));

      expect(result).toEqual(null);
    });


    test(`should return null if the number is valid`, () => {
      const values = [10, 22, 98.6, 100];

      for (const val of values) {
        const c = new FormControl(val);
        expect(validatorFn(c)).toEqual(null);
      }
    });


    test(`should return the invalid response if the number is NOT valid`, () => {
      const values = [9, -10, 0];

      for (const val of values) {
        const c = new FormControl(val);
        const result = validatorFn(c);

        expect(result!.isInRange.valid).toEqual(false);
        expect(result!.isInRange.actual).toEqual(val);
      }
    });


    test(`should default to 0 if no number is passed in`, () => {
      expect(validatorFnNoNumber(new FormControl(0))).toEqual(null);
    });

  });

});
