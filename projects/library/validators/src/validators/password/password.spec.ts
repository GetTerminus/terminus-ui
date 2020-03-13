import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { passwordValidator } from './password';

describe(`passwordValidator`, function() {
  let validatorFn: ValidatorFn;
  let nullControl: AbstractControl;

  beforeEach(() => {
    validatorFn = passwordValidator();
    nullControl = new FormControl(null);
  });

  describe(`if the control doesn't exist`, () => {
    test(`should return null`, () => {
      expect(validatorFn(nullControl)).toEqual(null);
    });
  });

  describe(`if the control has no value`, () => {
    test(`should return null`, () => {
      expect(validatorFn({} as AbstractControl)).toEqual(null);
    });
  });

  describe(`if the password is valid`, () => {
    test(`should return null`, () => {
      const control = new FormControl('7GmfvH');

      expect(validatorFn(control)).toEqual(null);
    });
  });

  describe(`if the password is NOT valid`, () => {
    test(`should return the invalid response`, () => {
      const control = new FormControl('yGiUf>DfQ2');
      const expected = {
        valid: false,
        actual: 'yGiUf>DfQ2',
      };

      expect(validatorFn(control)!.password).toEqual(expected);
    });
  });
});
