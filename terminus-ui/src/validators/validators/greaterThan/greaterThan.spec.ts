// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { greaterThanValidator } from './greaterThan';


describe(`greaterThanValidator`, () => {
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = greaterThanValidator(10);
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
      const values = [12, 98.6, 9999];

      for (const val of values) {
        expect(validatorFn(new FormControl(val))).toEqual(null);
      }
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const values = [9, 10, -10, 0];

      for (const val of values) {
        const result = validatorFn(new FormControl(val));

        expect(result!.greaterThan.valid).toEqual(false);
        expect(result!.greaterThan.actual).toEqual(val);
      }
    });

  });

});
