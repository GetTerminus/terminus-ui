import {
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { domainValidator } from './domain';

describe(`domainValidator`, function() {
  let validatorFn: ValidatorFn;
  let nullControl: AbstractControl;

  beforeEach(() => {
    validatorFn = domainValidator();
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

  describe(`if the domain is valid`, () => {
    test(`should return null`, () => {
      const control = new FormControl('foo.com/blah_blah');

      expect(validatorFn(control)).toEqual(null);
    });
  });

  describe(`if the domain is NOT valid`, () => {
    test(`should return the invalid response`, () => {
      const control = new FormControl(' shouldfail.com');
      const expected = {
        valid: false,
        actual: ' shouldfail.com',
      };

      expect(validatorFn(control)!.domain).toEqual(expected);
    });
  });
});
