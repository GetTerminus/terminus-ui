import { Injectable } from '@angular/core';


@Injectable()
export class TsValidatorsServiceMock {
  isValid = false;

  creditCard = jest.fn().mockReturnValue(this.isValid ? null : {
    creditCard: {
      valid: false,
      actual: '1234',
    },
  });

  password = jest.fn().mockReturnValue(this.isValid ? null : {
    password: {
      valid: false,
      actual: 'foo',
    },
  });

  email = jest.fn().mockReturnValue(this.isValid ? null : {
    email: {
      valid: false,
      actual: 'foo',
    },
  });

  maxDate = jest.fn().mockReturnValue(this.isValid ? null : {
    maxDate: {
      valid: false,
      actual: new Date(2020, 1, 1),
    },
  });

  minDate = jest.fn().mockReturnValue(this.isValid ? null : {
    minDate: {
      valid: false,
      actual: new Date(2017, 1, 1),
    },
  });



  /*
   *creditCard = jasmine.createSpy('validateCreditCard').and.returnValue({
   *  invalidCreditCard: {
   *    valid: false,
   *  },
   *});
   */

  /*
   *password = jasmine.createSpy('validatePassword').and.returnValue({
   *  invalidPassword: {
   *    valid: false,
   *  },
   *});
   */

  /*
   *email = jasmine.createSpy('validateEmail').and.returnValue({
   *  invalidEmail: {
   *    valid: false,
   *  },
   *});
   */

}
