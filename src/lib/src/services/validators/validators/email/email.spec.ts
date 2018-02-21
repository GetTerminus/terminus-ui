import { FormControl } from '@angular/forms';

import { emailValidator } from './email';


describe(`emailValidator`, () => {

  beforeEach(() => {
    this.validatorFn = emailValidator();

    this.nullControl = new FormControl(null);
    this.validEmails = [
      `foo@bar.co`,
      `foo@bar.baz.net`,
    ];
    this.invalidEmails = [
      `foo`,
      `foo@`,
      `foo@bar`,
      `foo@bar.`,
      `foo@bar.c`,
    ];
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


  describe(`if the email is valid`, () => {

    test(`should return null`, () => {
      const control = new FormControl(`foo@bar.co`);

      expect(this.validatorFn(control)).toEqual(null);
    });

  });


  describe(`if the email is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control = new FormControl(`foo@bar`);
      const expected = {
        valid: false,
        actual: 'foo@bar',
      };

      expect(this.validatorFn(control).email).toEqual(expected);
    });

  });

});
