import {
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { uppercaseValidator } from './uppercase';

describe(`uppercaseValidator`, function() {
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = uppercaseValidator(2);
  });

  describe(`if the control is invalid`, () => {
    test(`should return null`, () => {
      const values = [undefined, {}];

      for (const val of values) {
        expect(validatorFn(val as any)).toEqual(null);
      }
    });
  });

  describe(`if string length is correct`, () => {
    test(`should return null`, () => {
      const val = 'abCD';
      expect(validatorFn(new FormControl(val))).toEqual(null);
    });
  });

  describe(`if string length is incorrect`, () => {
    test(`should return error`, () => {
      const val = 'acD';
      const result = validatorFn(new FormControl(val));
      expect(result!.uppercase.valid).toEqual(false);
      expect(result!.uppercase.actual).toEqual(val);
    });
  });

  describe(`if the number is missing`, () => {
    test(`should return response as default number 1`, () => {
      const validatorFn2 = uppercaseValidator();
      expect(validatorFn2(new FormControl('A'))).toEqual(null);
    });
  });
});
