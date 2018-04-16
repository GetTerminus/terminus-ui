import { TsValidationMessagesComponent } from './validation-messages.component';
import { TsValidationMessageServiceMock } from './../services/validation-message/validation-message.service.mock';


describe('InputMessagesComponent', () => {
  let component: TsValidationMessagesComponent;

  beforeEach(() => {
    component = new TsValidationMessagesComponent(new TsValidationMessageServiceMock());
    component['validationMessageService'].getValidatorErrorMessage = jest.fn();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`get validationMessage()`, () => {

    it(`should return messages for validation errors if the control has been touched`, () => {
      const ERROR = {
        valid: false,
      };
      component.validateOnChange = false;
      component.control = {
        touched: true,
        errors: {
          invalidEmail: ERROR,
        },
      } as any;
      // tslint:disable: no-unused-variable
      const message = component.validationMessage;
      // tslint:enable: no-unused-variable

      expect(component['validationMessageService'].getValidatorErrorMessage)
        .toHaveBeenCalledWith('invalidEmail', ERROR);
    });


    it(`should return messages for validation errors if validateOnChange is true`, () => {
      component.validateOnChange = true;
      component.control = {
        touched: false,
        errors: {},
      } as any;
      const message = component.validationMessage;

      expect(component['validationMessageService'].getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });


    it(`should return null if the control hasn't been touched`, () => {
      const ERROR = {
        valid: false,
      };
      component.control = {
        touched: false,
        errors: {
          invalidEmail: ERROR,
        },
      } as any;
      const message = component.validationMessage;

      expect(component['validationMessageService'].getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });


    it(`should return null if no control was passed in`, () => {
      expect(component.validationMessage).toEqual(null);
      expect(component['validationMessageService'].getValidatorErrorMessage).not.toHaveBeenCalled();
    });

  });

});
