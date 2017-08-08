import { validateCreditCard } from './credit-card.validator';

describe(`validateCreditCard()`, () => {

  beforeEach(() => {
    this.controlMock = {
      value: <any>null,
    };

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
    expect(validateCreditCard(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validNumbers[1];
    expect(validateCreditCard(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validNumbers[2];
    expect(validateCreditCard(this.controlMock)).toEqual(null);

    this.controlMock.value = this.validNumbers[3];
    expect(validateCreditCard(this.controlMock)).toEqual(null);
  });


  it(`should return an object with valid set to FALSE if the CC number is invalid`, () => {
    this.controlMock.value = this.invalidNumbers[0];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);

    this.controlMock.value = this.invalidNumbers[1];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);

    this.controlMock.value = this.invalidNumbers[2];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);

    this.controlMock.value = this.invalidNumbers[3];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);

    this.controlMock.value = this.invalidNumbers[4];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);

    this.controlMock.value = this.invalidNumbers[5];
    expect(validateCreditCard(this.controlMock).invalidCreditCard.valid).toEqual(false);
  });

});
