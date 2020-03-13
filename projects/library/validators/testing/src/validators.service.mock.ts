import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class TsValidatorsServiceMock {
  public isValid = true;

  public creditCard: ValidatorFn = () => {
    const response = {
      creditCard: {
        valid: false,
        actual: '1234',
      },
    };
    return this.isValid ? null : response;
  };

  public domain: ValidatorFn = () => {
    const response = {
      domain: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public email: ValidatorFn = () => {
    const response = {
      email: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public equalToControl: ValidatorFn = () => {
    const response = {
      equalToControl: {
        valid: false,
        compareValue: 'foo',
        actual: 'bar',
      },
    };
    return this.isValid ? null : response;
  };

  public greaterThan: ValidatorFn = () => {
    const response = {
      greaterThan: {
        valid: false,
        greaterThan: 10,
        actual: 5,
      },
    };
    return this.isValid ? null : response;
  };

  public inCollection: ValidatorFn = () => {
    const response = {
      inCollection: {
        valid: false,
        actual: 'fo',
        collection: ['foo', 'bar', 'baz'],
      },
    };
    return this.isValid ? null : response;
  };

  public isInRange: ValidatorFn = () => {
    const response = {
      isInRange: {
        valid: false,
        isInRange: [10, 100],
        actual: 5,
      },
    };

    return this.isValid ? null : response;
  };

  public lessThan: ValidatorFn = () => {
    const response = {
      lessThan: {
        valid: false,
        lessThan: 10,
        actual: 15,
      },
    };
    return this.isValid ? null : response;
  };

  public lowercase: ValidatorFn = () => {
    const response = {
      lowercase: {
        valid: false,
        lowercaseMin: 4,
        actual: 'abcDE',
      },
    };
    return this.isValid ? null : response;
  };

  public maxDate: ValidatorFn = () => {
    const response = {
      maxDate: {
        valid: false,
        actual: new Date(2020, 1, 1),
      },
    };
    return this.isValid ? null : response;
  };

  public minDate: ValidatorFn = () => {
    const response = {
      minDate: {
        valid: false,
        actual: new Date(2017, 1, 1),
      },
    };
    return this.isValid ? null : response;
  };

  public numbers: ValidatorFn = () => {
    const response = {
      numbers: {
        valid: false,
        numbersMin: 4,
        actual: '123',
      },
    };
    return this.isValid ? null : response;
  };

  public password: ValidatorFn = () => {
    const response = {
      password: {
        valid: false,
        actual: 'foo',
      },
    };
    return this.isValid ? null : response;
  };

  public uppercase: ValidatorFn = () => {
    const response = {
      uppercase: {
        valid: false,
        uppercaseMin: 4,
        actual: 'ABCde',
      },
    };
    return this.isValid ? null : response;
  };

  public url: ValidatorFn = () => {
    const response = {
      lessThan: {
        valid: false,
        actual: 'http://foo',
      },
    };
    return this.isValid ? null : response;
  };
}
