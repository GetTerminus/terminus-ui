// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { lessThanOrEqualValidator } from './lessThanOrEqual';


describe(`lessThanOrEqualValidator`, () => {
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = lessThanOrEqualValidator(10);
  });


  describe(`if the control is invalid`, () => {

    test(`should return null`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(validatorFn(val as any)).toEqual(null);
      }
    });

  });


  describe(`if the number is valid`, () => {

    test(`should return null`, () => {
      const values = [9, 0, -1, 10];

      for (const val of values) {
        expect(validatorFn(new FormControl(val))).toEqual(null);
      }
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const values = [11, 98.6, 9999];

      for (const val of values) {
        const result = validatorFn(new FormControl(val));

        expect(result!.lessThanOrEqual.valid).toEqual(false);
        expect(result!.lessThanOrEqual.actual).toEqual(val);
      }
    });

  });

});
