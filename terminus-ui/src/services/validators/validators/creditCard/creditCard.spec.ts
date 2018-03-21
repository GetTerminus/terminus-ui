import { FormControl } from '@angular/forms';

import { creditCardValidator } from './creditCard';


describe(`creditCardValidator`, () => {

  beforeEach(() => {
    this.validatorFn = creditCardValidator();
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
      const control = new FormControl(`4242424242424242`);

      expect(this.validatorFn(control)).toEqual(null);
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control = new FormControl('1234');
      const expected = {
        valid: false,
        actual: '1234',
      };

      expect(this.validatorFn(control).creditCard).toEqual(expected);
    });

  });

});
