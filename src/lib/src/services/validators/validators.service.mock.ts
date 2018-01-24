import { Injectable } from '@angular/core';
import { emailValidator } from './validators/email/email';


@Injectable()
export class TsValidatorsServiceMock {
  isValid = true;

  creditCard = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      creditCard: {
        valid: false,
        actual: '1234',
      },
    });
  }

  password = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      password: {
        valid: false,
        actual: 'foo',
      },
    });
  }

  email = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      email: {
        valid: false,
        actual: 'foo',
      },
    });
  }

  maxDate = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      maxDate: {
        valid: false,
        actual: new Date(2020, 1, 1),
      },
    });
  }

  minDate = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      minDate: {
        valid: false,
        actual: new Date(2017, 1, 1),
      },
    });
  }

}
