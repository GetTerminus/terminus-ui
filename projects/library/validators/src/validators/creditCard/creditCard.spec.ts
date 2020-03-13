import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { creditCardValidator } from './creditCard';

describe(`creditCardValidator`, function() {
  let validatorFn: ValidatorFn;
  let nullControl: AbstractControl;

  beforeEach(() => {
    validatorFn = creditCardValidator();
    nullControl = new FormControl(null);
  });

  describe(`if the control doesn't exist`, () => {
    test(`should return null`, () => {
      expect(validatorFn(nullControl)).toEqual(null);
    });
  });

  describe(`if the control has no value`, () => {
    test(`should return null`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });
  });

  describe(`if the number is valid`, () => {
    test(`should return null`, () => {
      const control = new FormControl(`4242424242424242`);

      expect(validatorFn(control)).toEqual(null);
    });
  });

  describe(`if the number is NOT valid`, () => {
    test(`should return the invalid response`, () => {
      const control = new FormControl('1234');
      const expected = {
        valid: false,
        actual: '1234',
      };

      expect(validatorFn(control)!.creditCard).toEqual(expected);
    });
  });
});
