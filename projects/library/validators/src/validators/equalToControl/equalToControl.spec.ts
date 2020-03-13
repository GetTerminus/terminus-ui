import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { equalToControlValidator } from './equalToControl';

describe(`equalToControlValidator`, function() {
  let validValidatorFn: ValidatorFn;

  beforeEach(() => {
    validValidatorFn = equalToControlValidator(new FormControl('foo'));
  });

  describe(`if the control doesn't exist`, () => {
    test(`should return null`, () => {
      expect(validValidatorFn(new FormControl(null))).toEqual(null);
    });
  });

  describe(`if the control has no value`, () => {
    test(`should return null`, () => {
      expect(validValidatorFn({} as any)).toEqual(null);
    });
  });

  describe(`if the contol values match`, () => {
    test(`should return null`, () => {
      expect(validValidatorFn(new FormControl('foo' as any))).toEqual(null);
    });
  });

  describe(`if the control values do not match`, () => {
    test(`should return the invalid response`, () => {
      const actual = validValidatorFn(new FormControl('bar'))!.equalToControl;
      const expected = {
        valid: false,
        compareValue: 'foo',
        actual: 'bar',
      };
      expect(actual).toEqual(expected);
    });
  });
});
