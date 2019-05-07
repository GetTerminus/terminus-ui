import { Injectable } from '@angular/core';


@Injectable()
export class TsValidatorsServiceMock {
  public isValid = true;

  public creditCard = () => jest.fn().mockReturnValue(this.isValid ? null : {
    creditCard: {
      valid: false,
      actual: '1234',
    },
  })

  public domain = () => jest.fn().mockReturnValue(this.isValid ? null : {
    domain: {
      valid: false,
      actual: 'foo',
    },
  })

  public email = () => jest.fn().mockReturnValue(this.isValid ? null : {
    email: {
      valid: false,
      actual: 'foo',
    },
  })

  public equalToControl = () => jest.fn().mockReturnValue(this.isValid ? null : {
    equalToControl: {
      valid: false,
      compareValue: 'foo',
      actual: 'bar',
    },
  })

  public greaterThan = () => jest.fn().mockReturnValue(this.isValid ? null : {
    greaterThan: {
      valid: false,
      greaterThan: 10,
      actual: 5,
    },
  })

  public inCollection = () => jest.fn().mockReturnValue(this.isValid ? null : {
    inCollection: {
      valid: false,
      actual: 'fo',
      collection: ['foo', 'bar', 'baz'],
    },
  })

  public isInRange = () => jest.fn().mockReturnValue(this.isValid ? null : {
    isInRange: {
      valid: false,
      isInRange: [10, 100],
      actual: 5,
    },
  })

  public lessThan = () => jest.fn().mockReturnValue(this.isValid ? null : {
    lessThan: {
      valid: false,
      lessThan: 10,
      actual: 15,
    },
  })

  public lowercase = () => jest.fn().mockReturnValue(this.isValid ? null : {
    lowercase: {
      valid: false,
      lowercaseMin: 4,
      actual: 'abcDE',
    },
  })

  public maxDate = () => jest.fn().mockReturnValue(this.isValid ? null : {
    maxDate: {
      valid: false,
      actual: new Date(2020, 1, 1),
    },
  })

  public minDate = () => jest.fn().mockReturnValue(this.isValid ? null : {
    minDate: {
      valid: false,
      actual: new Date(2017, 1, 1),
    },
  })

  public numbers = () => jest.fn().mockReturnValue(this.isValid ? null : {
    numbers: {
      valid: false,
      numbersMin: 4,
      actual: '123',
    },
  })

  public password = () => jest.fn().mockReturnValue(this.isValid ? null : {
    password: {
      valid: false,
      actual: 'foo',
    },
  })

  public uppercase = () => jest.fn().mockReturnValue(this.isValid ? null : {
    uppercase: {
      valid: false,
      uppercaseMin: 4,
      actual: 'ABCde',
    },
  })

  public url = () => jest.fn().mockReturnValue(this.isValid ? null : {
    lessThan: {
      valid: false,
      actual: 'http://foo',
    },
  })

}
