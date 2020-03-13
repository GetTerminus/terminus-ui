import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TsValidatorsServiceMock {
  public isValid = true;

  public creditCard = () => {
    const response = {
      creditCard: {
        valid: false,
        actual: '1234',
      },
    };
    return this.isValid ? null : response;
  };

  public domain = () => {
    const response = {
      domain: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public email = () => {
    const response = {
      email: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public equalToControl = () => {
    const response = {
      equalToControl: {
        valid: false,
        compareValue: 'foo',
        actual: 'bar',
      },
    };
    return this.isValid ? null : response;
  };

  public greaterThan = () => {
    const response = {
      greaterThan: {
        valid: false,
        greaterThan: 10,
        actual: 5,
      },
    };
    return this.isValid ? null : response;
  };

  public inCollection = () => {
    const response = {
      inCollection: {
        valid: false,
        actual: 'fo',
        collection: ['foo', 'bar', 'baz'],
      },
    };
    return this.isValid ? null : response;
  };

  public isInRange = () => {
    const response = {
      isInRange: {
        valid: false,
        isInRange: [10, 100],
        actual: 5,
      },
    };

    return this.isValid ? null : response;
  };

  public lessThan = () => {
    const response = {
      lessThan: {
        valid: false,
        lessThan: 10,
        actual: 15,
      },
    };
    return this.isValid ? null : response;
  };

  public lowercase = () => {
    const response = {
      lowercase: {
        valid: false,
        lowercaseMin: 4,
        actual: 'abcDE',
      },
    };
    return this.isValid ? null : response;
  };

  public maxDate = () => {
    const response = {
      maxDate: {
        valid: false,
        actual: new Date(2020, 1, 1),
      },
    };
    return this.isValid ? null : response;
  };

  public minDate = () => {
    const response = {
      minDate: {
        valid: false,
        actual: new Date(2017, 1, 1),
      },
    };
    return this.isValid ? null : response;
  };

  public numbers = () => {
    const response = {
      numbers: {
        valid: false,
        numbersMin: 4,
        actual: '123',
      },
    };
    return this.isValid ? null : response;
  };

  public password = () => {
    const response = {
      password: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public uppercase = () => {
    const response = {
      uppercase: {
        valid: false,
        uppercaseMin: 4,
        actual: 'ABCde',
      },
    };
    return this.isValid ? null : response;
  };

  public url = () => {
    const response = {
      lessThan: {
        valid: false,
        actual: 'http://foo',
      },
    };
    return this.isValid ? null : response;
  };
}
