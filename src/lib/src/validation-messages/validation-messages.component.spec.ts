import { TsValidationMessagesComponent } from './validation-messages.component';
import { ValidationServiceMock } from './../services/validation/validation.service.mock';


describe('InputMessagesComponent', () => {

  beforeEach(() => {
    this.component = new TsValidationMessagesComponent(new ValidationServiceMock());
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`get validationMessage()`, () => {

    it(`should return messages for validation errors if the control has been touched`, () => {
      const ERROR = {
        valid: false,
      };
      this.component.validateOnChange = false;
      this.component.control = {
        touched: true,
        errors: {
          invalidEmail: ERROR,
        },
      };
      const message = this.component.validationMessage;

      expect(this.component.validationService.getValidatorErrorMessage)
        .toHaveBeenCalledWith('invalidEmail', ERROR);
    });


    it(`should return messages for validation errors if validateOnChange is true`, () => {
      this.component.validateOnChange = true;
      this.component.control = {
        touched: false,
        errors: {},
      };
      const message = this.component.validationMessage;

      expect(this.component.validationService.getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });


    it(`should return null if the control hasn't been touched`, () => {
      const ERROR = {
        valid: false,
      };
      this.component.control = {
        touched: false,
        errors: {
          invalidEmail: ERROR,
        },
      };
      const message = this.component.validationMessage;

      expect(this.component.validationService.getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });

  });

});
