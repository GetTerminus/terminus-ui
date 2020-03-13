import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { emailValidator } from './email';

describe(`emailValidator`, function() {
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = emailValidator();
  });

  describe(`if the control doesn't exist`, () => {
    test(`should return null`, () => {
      expect(validatorFn(new FormControl(null))).toEqual(null);
    });
  });

  describe(`if the control has no value`, () => {
    test(`should return null`, () => {
      expect(validatorFn({} as any)).toEqual(null);
    });
  });

  describe(`if the email is valid`, () => {
    test(`should return null`, () => {
      const control = new FormControl(`foo@bar.co`);

      expect(validatorFn(control)).toEqual(null);
    });
  });

  describe(`if the email is NOT valid`, () => {
    test(`should return the invalid response`, () => {
      const control = new FormControl(`foo@bar`);
      const expected = {
        valid: false,
        actual: 'foo@bar',
      };

      expect(validatorFn(control)!.email).toEqual(expected);
    });
  });
});
