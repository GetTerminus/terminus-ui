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
      const control0 = new FormControl(this.validEmails[0]);
      expect(this.validatorFn(control0)).toEqual(null);

      const control1 = new FormControl(this.validEmails[1]);
      expect(this.validatorFn(control1)).toEqual(null);
    });

  });


  describe(`if the email is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control0 = new FormControl(this.invalidEmails[0]);
      expect(this.validatorFn(control0).email.valid).toEqual(false);

      const control1 = new FormControl(this.invalidEmails[1]);
      expect(this.validatorFn(control1).email.valid).toEqual(false);

      const control2 = new FormControl(this.invalidEmails[2]);
      expect(this.validatorFn(control2).email.valid).toEqual(false);

      const control3 = new FormControl(this.invalidEmails[3]);
      expect(this.validatorFn(control3).email.valid).toEqual(false);

      const control4 = new FormControl(this.invalidEmails[4]);
      expect(this.validatorFn(control4).email.valid).toEqual(false);
    });

  });


  describe(`the invalid response object`, () => {

    test(`should return the control value`, () => {
      const control0 = new FormControl(this.invalidEmails[0]);
      const result = this.validatorFn(control0);

      expect(result.email.actual).toEqual(this.invalidEmails[0]);
    });

  });

});
