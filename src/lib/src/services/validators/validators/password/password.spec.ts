import { FormControl } from '@angular/forms';

import { passwordValidator } from './password';


describe(`passwordValidator`, () => {

  beforeEach(() => {
    this.validatorFn = passwordValidator();

    this.validPasswords = [
      `7GmfvH`,
      `V9Cpp7RGB9`,
      `29N74UV9ogt2UKpT3pZN3oLngp8Trkk4mCZfCgdE`,
      /* tslint:disable:max-line-length */
      `FQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdN`,
      /* tslint-enable:max-line-length */
    ];
    this.invalidPasswords = [
      // empty
      ``, // this will get caught by the first `!control.value`
      // too short
      `MA9Lv`,
      // no numbers
      `xnhoQzDwAv`,
      // symbol
      `yGiUf>DfQ2`,
      // space
      `FQ49j BQ29`,
      /* tslint:disable:max-line-length */
      // too long
      `FQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdN1`,
      /* tslint-enable:max-line-length */
    ];
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
      const control0 = new FormControl(this.validPasswords[0]);
      expect(this.validatorFn(control0)).toEqual(null);

      const control1 = new FormControl(this.validPasswords[1]);
      expect(this.validatorFn(control1)).toEqual(null);

      const control2 = new FormControl(this.validPasswords[2]);
      expect(this.validatorFn(control2)).toEqual(null);

      const control3 = new FormControl(this.validPasswords[3]);
      expect(this.validatorFn(control3)).toEqual(null);
    });

  });


  describe(`if the password is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control1 = new FormControl(this.invalidPasswords[1]);
      expect(this.validatorFn(control1).password.valid).toEqual(false);

      const control2 = new FormControl(this.invalidPasswords[2]);
      expect(this.validatorFn(control2).password.valid).toEqual(false);

      const control3 = new FormControl(this.invalidPasswords[3]);
      expect(this.validatorFn(control3).password.valid).toEqual(false);

      const control4 = new FormControl(this.invalidPasswords[4]);
      expect(this.validatorFn(control4).password.valid).toEqual(false);

      const control5 = new FormControl(this.invalidPasswords[5]);
      expect(this.validatorFn(control5).password.valid).toEqual(false);
    });

  });


  describe(`the invalid response object`, () => {

    test(`should return the control value`, () => {
      const control1 = new FormControl(this.invalidPasswords[1]);
      const result = this.validatorFn(control1);

      expect(result.password.actual).toEqual(this.invalidPasswords[1]);
    });

  });

});
