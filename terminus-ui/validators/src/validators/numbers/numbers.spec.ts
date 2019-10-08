// tslint:disable: no-non-null-assertion
import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { numbersValidator } from './numbers';


describe(`numbersValidator`, () => {
  let validatorFn: ValidatorFn;
  let validatorFn2: ValidatorFn;

  beforeEach(() => {
    validatorFn = numbersValidator(2);
    validatorFn2 = numbersValidator();
  });


  describe(`if the control is invalid`, () => {

    test(`should return null`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(validatorFn(val as any)).toEqual(null);
      }
    });

  });


  describe(`if number length is correct`, () => {

    test(`should return null`, () => {
      const val = '23ab';
      expect(validatorFn(new FormControl(val))).toEqual(null);
    });

  });

  describe(`if number length is incorrect`, () => {

    test(`should return error`, () => {
      const val = '2CD';
      const result = validatorFn(new FormControl(val));
      expect(result!.numbers.valid).toEqual(false);
      expect(result!.numbers.actual).toEqual(val);
    });

  });


  describe(`if the number is missing`, () => {

    test(`should return response as default number 1`, () => {
      expect(validatorFn2(new FormControl('6'))).toEqual(null);
    });
  });

});
