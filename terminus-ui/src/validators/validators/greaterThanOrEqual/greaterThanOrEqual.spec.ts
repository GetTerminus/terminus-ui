// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { greaterThanOrEqualValidator } from './greaterThanOrEqual';


describe(`greaterThanOrEqualValidator`, () => {
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = greaterThanOrEqualValidator(10);
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
      const values = [12, 10, 98.6, 9999];

      for (const val of values) {
        expect(validatorFn(new FormControl(val))).toEqual(null);
      }
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const values = [9, -10, 0];

      for (const val of values) {
        const result = validatorFn(new FormControl(val));

        expect(result!.greaterThanOrEqual.valid).toEqual(false);
        expect(result!.greaterThanOrEqual.actual).toEqual(val);
      }
    });

  });

});
