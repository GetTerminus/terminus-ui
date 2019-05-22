import { TsDatePipe } from '@terminus/ui/pipes';
import { TsValidationMessagesService } from './validation-messages.service';


describe(`TsValidationMessagesService`, function() {
  let service: TsValidationMessagesService;
  const datePipe = new TsDatePipe();

  beforeEach(() => {
    service = new TsValidationMessagesService(datePipe);
  });


  it(`should exist`, () => {
    expect(service).toBeTruthy();
  });


  describe(`getValidatorErrorMessage()`, () => {

    test(`should return a supplied minLength message`, () => {
      const validatorValueMock = {requiredLength: 9};
      const actual = service.getValidatorErrorMessage('minLength', validatorValueMock);
      const expected = `be at least 9`;

      expect(actual).toEqual(expect.stringContaining(expected));
    });


    test(`should return an error message when supplied lowercase letters less than required`, () => {
      const validatorValueMock = {lowercase: 4};
      const actual = service.getValidatorErrorMessage('lowercase', validatorValueMock);
      const expected = `4 lowercase letters`;

      expect(actual).toEqual(expect.stringContaining(expected));
    });


    test(`should return a maxLength message`, () => {
      const validatorValueMock = {requiredLength: 12};
      const actual = service.getValidatorErrorMessage('maxLength', validatorValueMock);
      const expected = `less than 12`;

      expect(actual).toEqual(expect.stringContaining(expected));
    });


    test(`should return the maxDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const maxDate = new Date(2017, 4, 1);
      const validatorValueMock = {
        value: date,
        maxDate,
      };
      const actual = service.getValidatorErrorMessage('maxDate', validatorValueMock);
      const expected = `Date must be before ${datePipe.transform(maxDate, 'short')}`;

      expect(actual).toEqual(expected);
    });


    test(`should return the minDate validation message`, () => {
      const date = new Date(2017, 3, 1);
      const minDate = new Date(2017, 2, 1);
      const validatorValueMock = {
        value: date,
        minDate,
      };
      const actual = service.getValidatorErrorMessage('minDate', validatorValueMock);
      const expected = `Date must be after ${datePipe.transform(minDate, 'short')}`;

      expect(actual).toEqual(expected);
    });


    test(`should return a maxLength message`, () => {
      const validatorValueMock = {actual: '3:12'};
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
        const expected = `must be greater than 10.`;

        expect(actual).toEqual(expect.stringContaining(expected));
      });

      test(`max should should return max message`, () => {
        const validatorValueMock = {
          actual: 15,
          max: 10,
        };
        const actual = service.getValidatorErrorMessage('max', validatorValueMock);
        const expected = `must be less than 10.`;

        expect(actual).toEqual(expect.stringContaining(expected));
      });

      test(`requiredTrue should return requiredTrue message`, () => {
        const validatorValueMock = {actual: false};
        const actual = service.getValidatorErrorMessage('requiredTrue', validatorValueMock);
        const expected = `be checked.`;

        expect(actual).toEqual(expect.stringContaining(expected));
      });


    });

  });

});
