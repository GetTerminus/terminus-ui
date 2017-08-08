import { validatePassword } from './password.validator';

describe(`validatePassword()`, () => {

  beforeEach(() => {
    this.controlMock = {
      value: <any>null,
    };
    this.validPasswords = [
      `7GmfvH`,
      `V9Cpp7RGB9`,
      `29N74UV9ogt2UKpT3pZN3oLngp8Trkk4mCZfCgdE`,
      /* tslint:disable:max-line-length */
      `FQ49j6BQ2BqerBnFMkeL7hfMd83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMd83fVsseAMV9xDJrTWd9J8xsdN`,
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
      `FQ49j6BQ2BqerBnFMkeL7hfMd83fVsseAMV9xDJrTWd9J8xsdNFQ49j6BQ2BqerBnFMkeL7hfMd83fVsseAMV9xDJrTWd9J8xsdN1`,
      /* tslint-enable:max-line-length */
    ];
  });


  it(`should return null if the password is valid`, () => {
    this.controlMock.value = this.validPasswords[0];
    expect(validatePassword(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validPasswords[1];
    expect(validatePassword(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validPasswords[2];
    expect(validatePassword(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validPasswords[3];
    expect(validatePassword(this.controlMock)).toEqual(null);
  });


  it(`should return an object with valid set to FALSE if the password is invalid`, () => {
    this.controlMock.value = this.invalidPasswords[0];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

    this.controlMock.value = this.invalidPasswords[1];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

    this.controlMock.value = this.invalidPasswords[2];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

    this.controlMock.value = this.invalidPasswords[3];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

    this.controlMock.value = this.invalidPasswords[4];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);

    this.controlMock.value = this.invalidPasswords[5];
    expect(validatePassword(this.controlMock).invalidPassword.valid).toEqual(false);
  });

});
