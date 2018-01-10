import { FormControl } from '@angular/forms';

import { creditCardValidator } from './creditCard';


describe(`creditCardValidator`, () => {

  beforeEach(() => {
    this.validatorFn = creditCardValidator();

    // Valid card numbers can be found here: https://stripe.com/docs/testing
    this.validNumbers = [
      `4242424242424242`,
      `38520000023237`,
      `6011111111111117`,
      `378282246310005`,
    ];
    this.invalidNumbers = [
      `1234`,
      ``, // this will get caught by the first `!control.value`
      `e`,
      `test@test.com`,
      `3852000023237`,
      `424242424242424242`,
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


  describe(`if the number is valid`, () => {

    test(`should return null`, () => {
      const control0 = new FormControl(this.validNumbers[0]);
      expect(this.validatorFn(control0)).toEqual(null);

      const control1 = new FormControl(this.validNumbers[1]);
      expect(this.validatorFn(control1)).toEqual(null);

      const control2 = new FormControl(this.validNumbers[2]);
      expect(this.validatorFn(control2)).toEqual(null);

      const control3 = new FormControl(this.validNumbers[3]);
      expect(this.validatorFn(control3)).toEqual(null);
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control0 = new FormControl(this.invalidNumbers[0]);
      expect(this.validatorFn(control0).creditCard.valid).toEqual(false);

      const control1 = new FormControl(this.invalidNumbers[2]);
      expect(this.validatorFn(control1).creditCard.valid).toEqual(false);

      const control2 = new FormControl(this.invalidNumbers[3]);
      expect(this.validatorFn(control2).creditCard.valid).toEqual(false);

      const control3 = new FormControl(this.invalidNumbers[4]);
      expect(this.validatorFn(control3).creditCard.valid).toEqual(false);

      const control4 = new FormControl(this.invalidNumbers[5]);
      expect(this.validatorFn(control4).creditCard.valid).toEqual(false);
    });

  });


  describe(`the invalid response object`, () => {

    test(`should return the control value`, () => {
      const control0 = new FormControl(this.invalidNumbers[0]);
      const result = this.validatorFn(control0);

      expect(result.creditCard.actual).toEqual(this.invalidNumbers[0]);
    });

  });

});
