import { TsValidatorsService } from '@services/validators/validators.service';


describe(`TsValidatorsService`, () => {

  beforeEach(() => {
    this.service = new TsValidatorsService();

    this.controlMock = {
      value: null as any,
    };
  });


  it(`should exist`, () => {
    expect(this.service).toBeTruthy();
  });


  describe(`validateCreditCard()`, () => {

    beforeEach(() => {
      // Valid card numbers can be found here: https://stripe.com/docs/testing
      this.validNumbers = [
        `4242424242424242`,
        `38520000023237`,
        `6011111111111117`,
        `378282246310005`,
      ];
      this.invalidNumbers = [
        `1234`,
        ``,
        `e`,
        `test@test.com`,
        `3852000023237`,
        `424242424242424242`,
      ];
    });


    it(`should return null if the CC number is valid`, () => {
      this.controlMock.value = this.validNumbers[0];
      expect(this.service.validateCreditCard(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validNumbers[1];
      expect(this.service.validateCreditCard(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validNumbers[2];
      expect(this.service.validateCreditCard(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validNumbers[3];
      expect(this.service.validateCreditCard(this.controlMock)).toEqual(null);
    });


    it(`should return an object with valid set to FALSE if the CC number is invalid`, () => {
      this.controlMock.value = this.invalidNumbers[0];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);

      this.controlMock.value = this.invalidNumbers[1];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);

      this.controlMock.value = this.invalidNumbers[2];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);

      this.controlMock.value = this.invalidNumbers[3];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);

      this.controlMock.value = this.invalidNumbers[4];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);

      this.controlMock.value = this.invalidNumbers[5];
      expect(this.service.validateCreditCard(this.controlMock)
        .invalidCreditCard.valid).toEqual(false);
    });

  });


  describe(`validateEmail()`, () => {

    beforeEach(() => {
      this.validEmails = [
        `foo@bar.co`,
        `foo@bar.baz.net`,
      ];
      this.invalidEmails = [
        `foo`,
        `foo@`,
        `foo@bar`,
        `foo@bar.`,
        `foo@bar.c`,
      ];
    });


    it(`should return null if the email is valid`, () => {
      this.controlMock.value = this.validEmails[0];
      expect(this.service.validateEmail(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validEmails[1];
      expect(this.service.validateEmail(this.controlMock)).toEqual(null);
    });


    it(`should return an object with an error message if the email is invalid`, () => {
      this.controlMock.value = this.invalidEmails[0];
      expect(this.service.validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

      this.controlMock.value = this.invalidEmails[1];
      expect(this.service.validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

      this.controlMock.value = this.invalidEmails[2];
      expect(this.service.validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

      this.controlMock.value = this.invalidEmails[3];
      expect(this.service.validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

      this.controlMock.value = this.invalidEmails[4];
      expect(this.service.validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);
    });


  });


  describe(`validatePassword()`, () => {

    beforeEach(() => {
      this.validPasswords = [
        `7GmfvH`,
        `V9Cpp7RGB9`,
        `29N74UV9ogt2UKpT3pZN3oLngp8Trkk4mCZfCgdE`,
        /* tslint:disable:max-line-length */
        `FQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdN`,
        /* tslint-enable:max-line-length */
      ];
      this.invalidPasswords = [
        // empty
        ``,
        // too short
        `MA9Lv`,
        // no numbers
        `xnhoQzDwAv`,
        // symbol
        `yGiUf>DfQ2`,
        // space
        `FQ49j BQ29`,
        /* tslint:disable:max-line-length */
        // too long
        `FQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMw83fVsseAMV9xDJrTWd9J8xsdN1`,
        /* tslint-enable:max-line-length */
      ];
    });


    it(`should return null if the password is valid`, () => {
      this.controlMock.value = this.validPasswords[0];
      expect(this.service.validatePassword(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validPasswords[1];
      expect(this.service.validatePassword(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validPasswords[2];
      expect(this.service.validatePassword(this.controlMock)).toEqual(null);

      this.controlMock.value = this.validPasswords[3];
      expect(this.service.validatePassword(this.controlMock)).toEqual(null);
    });


    it(`should return an object with valid set to FALSE if the password is invalid`, () => {
      this.controlMock.value = this.invalidPasswords[0];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

      this.controlMock.value = this.invalidPasswords[1];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

      this.controlMock.value = this.invalidPasswords[2];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

      this.controlMock.value = this.invalidPasswords[3];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

      this.controlMock.value = this.invalidPasswords[4];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

      this.controlMock.value = this.invalidPasswords[5];
      expect(this.service.validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);
    });

  });

});
