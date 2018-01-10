import { FormControl } from '@angular/forms';

import { minDateValidator } from './minDate';


describe(`minDateValidator`, () => {

  beforeEach(() => {
    this.minDate = new Date(2017, 4, 1);
    this.validDate = new Date(2017, 5, 1);
    this.invalidDate = new Date(2017, 3, 1);

    this.validatorFn = minDateValidator(this.minDate);
    this.invalidValidatorFn = minDateValidator('foo');

    this.nullControl = new FormControl(null);
    this.stringControl = new FormControl('foo');
    this.validDateControl = new FormControl(this.validDate);
    this.invalidDateControl = new FormControl(this.invalidDate);
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


  describe(`if the minDate is not a valid date`, () => {

    it(`should return null`, () => {
      expect(this.invalidValidatorFn(this.validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is not a valid date`, () => {

    it(`should return the invalid response`, () => {
      const actual = this.validatorFn(this.stringControl).minDate;
      const expected = {
        valid: false,
        minDate: this.minDate,
        actual: 'foo',
      };

      expect(actual).toEqual(expected);
    });

  });


  describe(`if the control value is after the minDate`, () => {

    it(`should return null`, () => {
      expect(this.validatorFn(this.validDateControl)).toEqual(null);
    });

  });


  describe(`if the control value is before the minDate`, () => {

    it(`should return the invalid response`, () => {
      const actual = this.validatorFn(this.invalidDateControl).minDate;
      const expected = {
        valid: false,
        minDate: this.minDate,
        actual: this.invalidDate,
      };

      expect(actual).toEqual(expected);
    });

  });

});
