import {
  AbstractControl,
  AsyncValidatorFn,
  Validator,
  Validators,
  ValidatorFn,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// TODO: Items from this file are being documented under 'miscellaneous'. Can this be refactored as
// a Class so it is organized under 'classes'?


/**
 * Validation result interface
 */
/* tslint:disable:camelcase */
/* tslint-enable: camelcase */
export interface IValidationResult {
  [validator: string]: string | boolean;
};


/**
 * Accept validators of all shapes and sizes, and produce a single asynchronous validator function
 * Reference: http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
 */
export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;


/**
 * Accept validators of all shapes and sizes, and produce a single asynchronous validator function
 * Reference: http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
 */
export type ValidatorArray = Array<Validator | ValidatorFn>;


/**
 * Normalize all validators
 *
 * @param validator The validator
 * @return function|validator
 */
const normalizeValidator =
    (validator: Validator | ValidatorFn): ValidatorFn | AsyncValidatorFn => {
  const func = (validator as Validator).validate.bind(validator);

  if (typeof func === 'function') {
    return (c: AbstractControl) => func(c);
  } else {
    return <ValidatorFn | AsyncValidatorFn> validator;
  }
};


/**
 * Compose validators for the validate method
 *
 * @param validators An array of validators
 * @return null|validators
 */
export const composeValidators =
    (validators: ValidatorArray): AsyncValidatorFn | ValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }

  return Validators.compose(validators.map(normalizeValidator));
};


/**
 * Method to run the validators
 *
 * @param validators An array of validators
 * @param asyncValidators An array of async validators
 * @return Observable
 */
export const validate =
    (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
  return (control: AbstractControl) => {
    const synchronousValid = () => composeValidators(validators)(control);

    if (asyncValidators) {
      const asyncValidator = composeValidators(asyncValidators);

      return asyncValidator(control).map((v: any) => {
        const secondary = synchronousValid();

        if (secondary || v) { // compose async and sync validator results
          return Object.assign({}, secondary, v);
        }
      });
    }

    if (validators) {
      return Observable.of(synchronousValid());
    }

    return Observable.of(null);
  };
};


/**
 * Respond to validators with specific messages
 *
 * HACK: TypeScript throws an error that a validator does not exist on type. (ie
 * validator.minlength.requiredLength) Setting it to `any` allows us to access the property.
 *
 * @param validator
 * @param key
 *
 * @return message
 */
export const message = (validator: IValidationResult, key: string): string => {
  const ALPHA_PATTERN = '^[a-zA-Z]+$';

  switch (key) {
    case 'required':
      return `Please enter a value`;

    case 'pattern':
      let valMessage = 'Value does not match pattern.';

      if ((validator as any).pattern.requiredPattern === ALPHA_PATTERN) {
        valMessage = 'Value must be letters only.'
      }

      return valMessage;

    case 'minlength':
      return `Value must be ${(validator as any).minlength.requiredLength} characters`;

    case 'maxlength':
      return `Value must be a maximum of N characters`;
  }

  switch (typeof validator[key]) {
    case 'string':
      return <string> validator[key];
    default:
      return `Validation failed: ${key}`;
  }
};
