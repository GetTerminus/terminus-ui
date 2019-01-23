import { format } from 'date-fns';

import { TsValidationMessageService } from './validation-message.service';


describe(`TsValidationMessageService`, () => {
  let service: TsValidationMessageService;

  beforeEach(() => {
    service = new TsValidationMessageService();
  });


  it(`should exist`, () => {
    expect(service).toBeTruthy();
  });


  describe(`getValidatorErrorMessage()`, () => {

    test(`should return a supplied message`, () => {
      const validatorValueMock = {
        requiredLength: 9,
      };
      const actual = service.getValidatorErrorMessage('minlength', validatorValueMock);
      const expected = `Minimum length 9`;

      expect(actual).toEqual(expected);
    });


    test(`should return an error message when supplied lowercase letters less than required`, () => {
      const validatorValueMock = {
        lowercase: 4,
      };
      const actual = service.getValidatorErrorMessage('lowercase', validatorValueMock);
      const expected = `Must contain at least 4 lowercase letters`;

      expect(actual).toEqual(expected);
    });


    test(`should return a maxLength message`, () => {
      const validatorValueMock = {
        requiredLength: 12,
      };
      const actual = service.getValidatorErrorMessage('maxlength', validatorValueMock);
      const expected = `Maximum length 12`;

      expect(actual).toEqual(expected);
    });


    test(`should return the maxDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const maxDate = new Date(2017, 4, 1);
      const validatorValueMock = {
        value: date,
        maxDate: maxDate,
      };
      const actual = service.getValidatorErrorMessage('maxDate', validatorValueMock);
      const expected = `Date must be before ${format(maxDate, 'M/d/YYYY')}`;

      expect(actual).toEqual(expected);
    });


    test(`should return the minDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const minDate = new Date(2017, 2, 1);
      const validatorValueMock = {
        value: date,
        minDate: minDate,
      };
      const actual = service.getValidatorErrorMessage('minDate', validatorValueMock);
      const expected = `Date must be after ${format(minDate, 'M/d/YYYY')}`;

      expect(actual).toEqual(expected);
    });


    test(`should return a maxLength message`, () => {
      const validatorValueMock = {
        actual: '3:12',
      };
      const actual = service.getValidatorErrorMessage('imageRatio', validatorValueMock);
      const expected = `3:12 is not an allowed image ratio.`;

      expect(actual).toEqual(expected);
    });


    describe(`should return appropriate messages for Angular's built-in validators`, () => {

      test(`min should return min message`, () => {
          const validatorValueMock = {
            actual: 5,
            min: 10,
          };
          const actual = service.getValidatorErrorMessage('min', validatorValueMock);
          const expected = `5 is less than 10.`;

          expect(actual).toEqual(expected);
      });

      test(`max should should return max message`, () => {
        const validatorValueMock = {
          actual: 15,
          max: 10,
        };
        const actual = service.getValidatorErrorMessage('max', validatorValueMock);
        const expected = `15 is greater than 10.`;

        expect(actual).toEqual(expected);
      });

      test(`requiredTrue should return requiredTrue message`, () => {
        const validatorValueMock = {
          actual: false,
        };
        const actual = service.getValidatorErrorMessage('requiredTrue', validatorValueMock);
        const expected = `requiredTrue must be checked.`;

        expect(actual).toEqual(expected);
      });


    });

  });

});
