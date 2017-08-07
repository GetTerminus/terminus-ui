import { ValidationService } from './validation.service';


describe(`ValidationService`, () => {

  beforeEach(() => {
    this.service = new ValidationService();
  });

  it(`should exist`, () => {
    expect(this.service).toBeTruthy();
  });


  describe(`getValidatorErrorMessage()`, () => {

    it(`should return a supplied message`, () => {
      const validatorValueMock = {
        requiredLength: 9,
      };
      const actual = this.service.getValidatorErrorMessage('minlength', validatorValueMock);
      const expected = `Minimum length 9`;

      expect(actual).toEqual(expected);
    });

  });


  describe(`creditCardValidator()`, () => {
    const validNumber = `4242424242424242`;
    const invalidNumber = `1234`;

    it(`should return null if the CC number is valid`, () => {
      const controlMock = {
        value: validNumber,
      };
      const actual = this.service.creditCardValidator(controlMock);
      const expected = null;
      expect(actual).toEqual(expected);
    });


    it(`should return an object with an error message if the CC number is invalid`, () => {
      const controlMock = {
        value: invalidNumber,
      };
      const actual = this.service.creditCardValidator(controlMock);
      expect(actual.invalidCreditCard).toEqual(true);
    });

  });


  describe(`emailValidator()`, () => {
    const controlMock = {
      value: null,
    };
    const validEmail1 = `foo@bar.co`;
    const validEmail2 = `foo@bar.baz.net`;
    const invalidEmail1 = `foo`;
    const invalidEmail2 = `foo@`;
    const invalidEmail3 = `foo@bar`;
    const invalidEmail4 = `foo@bar.`;
    const invalidEmail5 = `foo@bar.c`;

    it(`should return null if the email is valid`, () => {
      controlMock.value = validEmail1;
      expect(this.service.emailValidator(controlMock)).toEqual(null);

      controlMock.value = validEmail2;
      expect(this.service.emailValidator(controlMock)).toEqual(null);
    });


    it(`should return an object with an error message if the email is invalid`, () => {
      controlMock.value = invalidEmail1;
      expect(this.service.emailValidator(controlMock).invalidEmailAddress).toEqual(true);

      controlMock.value = invalidEmail2;
      expect(this.service.emailValidator(controlMock).invalidEmailAddress).toEqual(true);

      controlMock.value = invalidEmail3;
      expect(this.service.emailValidator(controlMock).invalidEmailAddress).toEqual(true);

      controlMock.value = invalidEmail4;
      expect(this.service.emailValidator(controlMock).invalidEmailAddress).toEqual(true);

      controlMock.value = invalidEmail5;
      expect(this.service.emailValidator(controlMock).invalidEmailAddress).toEqual(true);
    });

  });

});
