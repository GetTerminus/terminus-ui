import { validateEmail } from './email.validator';


describe(`validateEmail()`, () => {

  beforeEach(() => {
    this.controlMock = {
      value: <any>null,
    };

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
    expect(validateEmail(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validEmails[1];
    expect(validateEmail(this.controlMock)).toEqual(null);
  });


  it(`should return an object with an error message if the email is invalid`, () => {
    this.controlMock.value = this.invalidEmails[0];
    expect(validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

    this.controlMock.value = this.invalidEmails[1];
    expect(validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

    this.controlMock.value = this.invalidEmails[2];
    expect(validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

    this.controlMock.value = this.invalidEmails[3];
    expect(validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);

    this.controlMock.value = this.invalidEmails[4];
    expect(validateEmail(this.controlMock).invalidEmail.valid).toEqual(false);
  });

});

