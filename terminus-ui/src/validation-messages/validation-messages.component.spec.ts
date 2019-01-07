import { TsValidationMessagesComponent } from './validation-messages.component';
import { TsValidationMessageServiceMock } from './validation-message.service.mock';


describe('InputMessagesComponent', function() {
  let component: TsValidationMessagesComponent;

  beforeEach(() => {
    component = new TsValidationMessagesComponent(new TsValidationMessageServiceMock());
    component['validationMessageService'].getValidatorErrorMessage = jest.fn();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`get validationMessage()`, () => {

    test(`should return messages for validation errors if the control has been touched`, () => {
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


    test(`should return messages for validation errors if validateOnChange is true`, () => {
      component.validateOnChange = true;
      component.control = {
        touched: false,
        errors: {},
      } as any;
      const message = component.validationMessage;

      expect(component['validationMessageService'].getValidatorErrorMessage).not.toHaveBeenCalled();
      expect(message).toEqual(null);
    });


    test(`should return null if the control hasn't been touched`, () => {
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


    test(`should return null if no control was passed in`, () => {
      expect(component.validationMessage).toEqual(null);
      expect(component['validationMessageService'].getValidatorErrorMessage).not.toHaveBeenCalled();
    });

  });


  describe(`validateImmediately`, () => {

    test(`should set/get the immediate flag`, () => {
      expect(component.validateImmediately).toEqual(false);
      component.validateImmediately = true;
      expect(component.validateImmediately).toEqual(true);
    });

  });


  describe(`id`, () => {

    test(`should use UID if no value is passed in`, () => {
      component.id = undefined as any;
      expect(component.id).toEqual(expect.stringContaining('ts-validation-messages-'));
    });

  });

});
