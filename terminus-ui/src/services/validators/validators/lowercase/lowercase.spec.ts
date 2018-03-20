import { FormControl } from '@angular/forms';

import { lowercaseValidator } from './lowercase';


describe(`lowercaseValidator`, () => {

  beforeEach(() => {
    this.validatorFn = lowercaseValidator(2);
  });


  describe(`if the control is invalid`, () => {

    test(`should return null`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(this.validatorFn(val)).toEqual(null);
      }
    });

  });


  describe(`if string length is correct`, () => {

    test(`should return null`, () => {
      const val = 'abCD';
      expect(this.validatorFn(new FormControl(val))).toEqual(null);
    });

  });

  describe(`if string length is incorrect`, () => {

    test(`should return error`, () => {
      const val = 'aCD';
      const result = this.validatorFn(new FormControl(val));
      expect(result.lowercase.valid).toEqual(false);
      expect(result.lowercase.actual).toEqual(val);
    });

  });


  describe(`if the number is missing`, () => {

    test(`should return response as default number 1`, () => {
      this.validatorFn2 = lowercaseValidator();
      expect(this.validatorFn2(new FormControl('a'))).toEqual(null);
    });
  });

});
