import { format } from 'date-fns';

import { TsValidationMessageService } from './validation-message.service';


describe(`TsValidationMessageService`, () => {

  beforeEach(() => {
    this.service = new TsValidationMessageService();
  });

  it(`should exist`, () => {
    expect(this.service).toBeTruthy();
  });


  describe(`getValidatorErrorMessage()`, () => {

    test(`should return a supplied message`, () => {
      const validatorValueMock = {
        requiredLength: 9,
      };
      const actual = this.service.getValidatorErrorMessage('minlength', validatorValueMock);
      const expected = `Minimum length 9`;

      expect(actual).toEqual(expected);
    });


    test(`should return the maxDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const maxDate = new Date(2017, 4, 1);
      const validatorValueMock = {
        value: date,
        maxDate: maxDate,
      };
      const actual = this.service.getValidatorErrorMessage('maxDate', validatorValueMock);
      const expected = `Date must be before ${format(maxDate, 'M/D/YYYY')}`;

      expect(actual).toEqual(expected);
    });


    test(`should return the minDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const minDate = new Date(2017, 2, 1);
      const validatorValueMock = {
        value: date,
        minDate: minDate,
      };
      const actual = this.service.getValidatorErrorMessage('minDate', validatorValueMock);
      const expected = `Date must be after ${format(minDate, 'M/D/YYYY')}`;

      expect(actual).toEqual(expected);
    });

  });

});
