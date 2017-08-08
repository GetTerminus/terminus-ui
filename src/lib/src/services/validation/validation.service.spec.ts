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

});
