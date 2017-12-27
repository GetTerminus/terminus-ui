import { Injectable } from '@angular/core';


@Injectable()
export class TsValidatorsServiceMock {

  validateCreditCard = jasmine.createSpy('validateCreditCard').and.returnValue({
    invalidCreditCard: {
      valid: false,
    },
  });

  validateEmail = jasmine.createSpy('validateEmail').and.returnValue({
    invalidEmail: {
      valid: false,
    },
  });

  validatePassword = jasmine.createSpy('validatePassword').and.returnValue({
    invalidPassword: {
      valid: false,
    },
  });

}
