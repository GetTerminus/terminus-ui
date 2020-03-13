import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { urlValidator } from './url';

describe(`urlValidator`, function() {
  let validatorFn: ValidatorFn;
  let nullControl: AbstractControl;

  beforeEach(() => {
    validatorFn = urlValidator();
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

  describe(`if the URL is valid`, () => {
    test(`should return null`, () => {
      const control = new FormControl('http://foo.com/blah_blah');

      expect(validatorFn(control)).toEqual(null);
    });
  });

  describe(`if the URL is NOT valid`, () => {
    test(`should return the invalid response`, () => {
      const control = new FormControl('http:// shouldfail.com');
      const expected = {
        valid: false,
        actual: 'http:// shouldfail.com',
      };

      expect(validatorFn(control)!.url).toEqual(expected);
    });
  });
});
