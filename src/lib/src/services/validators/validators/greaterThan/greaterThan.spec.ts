import { FormControl } from '@angular/forms';

import { greaterThanValidator } from './greaterThan';


describe(`greaterThanValidator`, () => {

  beforeEach(() => {
    this.validatorFn = greaterThanValidator(10);

    this.nullControl = new FormControl(null);
  });


  describe(`if the control doesn't exist`, () => {

    test(`should return null`, () => {
      expect(this.validatorFn()).toEqual(null);
    });

  });


  describe(`if the control has no value`, () => {

    test(`should return null`, () => {
      expect(this.validatorFn({})).toEqual(null);
    });

  });


  describe(`if the number is valid`, () => {

    test(`should return null`, () => {
      const control0 = new FormControl(12);
      expect(this.validatorFn(control0)).toEqual(null);

      const control1 = new FormControl(10);
      expect(this.validatorFn(control1)).toEqual(null);

      const control2 = new FormControl(9999);
      expect(this.validatorFn(control2)).toEqual(null);
    });

  });


  describe(`if the number is NOT valid`, () => {

    test(`should return the invalid response`, () => {
      const control0 = new FormControl(9);
      expect(this.validatorFn(control0).greaterThan.valid).toEqual(false);

      const control1 = new FormControl(-10);
      expect(this.validatorFn(control1).greaterThan.valid).toEqual(false);

      const control3 = new FormControl(0);
      expect(this.validatorFn(control3).greaterThan.valid).toEqual(false);
    });

  });


  describe(`the invalid response object`, () => {

    test(`should return the control value`, () => {
      const control0 = new FormControl(5);
      const result = this.validatorFn(control0);

      expect(result.greaterThan.actual).toEqual(5);
    });

  });

});

