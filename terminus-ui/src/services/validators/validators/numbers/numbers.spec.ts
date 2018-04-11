import { FormControl } from '@angular/forms';

import { numbersValidator } from './numbers';


describe(`numbersValidator`, () => {

  beforeEach(() => {
    this.validatorFn = numbersValidator(2);
  });


  describe(`if the control is invalid`, () => {

    test(`should return null`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(this.validatorFn(val)).toEqual(null);
      }
    });

  });


  describe(`if number length is correct`, () => {

    test(`should return null`, () => {
      const val = '23ab';
      expect(this.validatorFn(new FormControl(val))).toEqual(null);
    });

  });

  describe(`if number length is incorrect`, () => {

    test(`should return error`, () => {
      const val = '2CD';
      const result = this.validatorFn(new FormControl(val));
      expect(result.numbers.valid).toEqual(false);
      expect(result.numbers.actual).toEqual(val);
    });

  });


  describe(`if the number is missing`, () => {

    test(`should return response as default number 1`, () => {
      this.validatorFn2 = numbersValidator();
      expect(this.validatorFn2(new FormControl('6'))).toEqual(null);
    });
  });

});
