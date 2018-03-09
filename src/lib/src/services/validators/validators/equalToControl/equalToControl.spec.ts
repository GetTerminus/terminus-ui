import { FormControl } from '@angular/forms';

import { equalToControlValidator } from './equalToControl';


describe(`equalToControlValidator`, () => {

  beforeEach(() => {
    this.validatorFn = equalToControlValidator(this.minDate);
    this.invalidValidatorFn = equalToControlValidator('foo' as any);

    this.nullControl = new FormControl(null);
    this.stringControl = new FormControl('foo' as any);
    this.stringControl2 = new FormControl('foo' as any);
    this.stringControlUnmatched = new FormControl('bar');
    this.validValidatorFn = equalToControlValidator(this.stringControl);
  });


  describe(`if the control doesn't exist`, () => {

    it(`should return null`, () => {
      expect(this.validatorFn(this.nullControl)).toEqual(null);
    });

  });


  describe(`if the control has no value`, () => {

    test(`should return null`, () => {
      expect(this.validatorFn({})).toEqual(null);
    });

  });


  describe(`if the contol values match`, () => {

    test(`should return null`, () => {
      expect(this.validValidatorFn(this.stringControl2)).toEqual(null);
    });

  });


  describe(`if the control values do not match`, () => {

    test(`should return the invalid response`, () => {
      const actual = this.validValidatorFn(this.stringControlUnmatched).equalToControl;
      const expected = {
        valid: false,
        compareValue: 'foo',
        actual: 'bar',
      };
      expect(actual).toEqual(expected);
    });

  });

});
