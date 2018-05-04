// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { lessThanValidator } from './lessThan';


describe(`lessThanValidator`, () => {
  let validatorFn: ValidatorFn;
  let validatorFnNoNumber: ValidatorFn;

  beforeEach(() => {
    validatorFn = lessThanValidator(10);
    validatorFnNoNumber = lessThanValidator();
  });


  test(`should return null if the control is invalid`, () => {
    const values = [undefined, {}];

    for (const val of values) {
      expect(validatorFn(val as any)).toEqual(null);
    }
  });


  test(`should return null if the number is valid`, () => {
    const values = [9, 0, -1];

    for (const val of values) {
      expect(validatorFn(new FormControl(val))).toEqual(null);
    }
  });


  test(`should return the invalid response if the number is NOT valid`, () => {
    const values = [10, 11, 98.6, 9999];

    for (const val of values) {
      const result = validatorFn(new FormControl(val));

      expect(result!.lessThan.valid).toEqual(false);
      expect(result!.lessThan.actual).toEqual(val);
    }
  });


  test(`should default to 0 if no number is passed in`, () => {
    const result = validatorFnNoNumber(new FormControl(1));

    expect(result!.lessThan.valid).toEqual(false);
    expect(result!.lessThan.actual).toEqual(1);
  });

});
