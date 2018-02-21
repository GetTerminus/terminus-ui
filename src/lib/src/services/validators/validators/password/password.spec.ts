import { FormControl } from '@angular/forms';

import { passwordValidator } from './password';


describe(`passwordValidator`, () => {

  beforeEach(() => {
    this.validatorFn = passwordValidator();
    this.nullControl = new FormControl(null);
  });


  describe(`if the control doesn't exist`, () => {

    test(`should return null`, () => {
      expect(this.validatorFn(this.nullControl)).toEqual(null);
    });

  });


  describe(`if the control has no value`, () => {

    test(`should return null`, () => {
      expect(this.validatorFn({})).toEqual(null);
    });

  });


  describe(`if the password is valid`, () => {

    test(`should return null`, () => {
      const control = new FormControl('7GmfvH');

      expect(this.validatorFn(control)).toEqual(null);
    });

  });


  describe(`if the password is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control = new FormControl('yGiUf>DfQ2');
      const expected = {
        valid: false,
        actual: 'yGiUf>DfQ2',
      };

      expect(this.validatorFn(control).password).toEqual(expected);
    });

  });

});
