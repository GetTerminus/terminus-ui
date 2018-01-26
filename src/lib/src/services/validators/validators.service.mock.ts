import { Injectable } from '@angular/core';


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

  greaterThan = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      greaterThan: {
        valid: false,
        greaterThan: 10,
        actual: 5,
      },
    });
  }

  lessThan = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      lessThan: {
        valid: false,
        lessThan: 10,
        actual: 15,
      },
    });
  }

}
