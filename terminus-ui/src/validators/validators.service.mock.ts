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

  email = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      email: {
        valid: false,
        actual: 'foo',
      },
    });
  }

  equalToControl = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      equalToControl: {
        valid: false,
        compareValue: 'foo',
        actual: 'bar',
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

  greaterThanOrEqual = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      greaterThanOrEqual: {
        valid: false,
        greaterThanOrEqual: 10,
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

  lessThanOrEqual = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      lessThanOrEqual: {
        valid: false,
        lessThanOrEqual: 10,
        actual: 15,
      },
    });
  }

  lowercase = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      lowercase: {
        valid: false,
        lowercaseMin: 4,
        actual: 'abcDE',
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

  numbers = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      numbers: {
        valid: false,
        numbersMin: 4,
        actual: '123',
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

  uppercase = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      uppercase: {
        valid: false,
        uppercaseMin: 4,
        actual: 'ABCde',
      },
    });
  }

  url = () => {
    return jest.fn().mockReturnValue(this.isValid ? null : {
      lessThan: {
        valid: false,
        actual: 'http://foo',
      },
    });
  }

}
