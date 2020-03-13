import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { creditCardRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that a credit card number is valid
 *
 * @returns The validator function
 */
export const creditCardValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidResponse: ValidationErrors = {
    creditCard: {
      valid: false,
      actual: control.value,
    },
  };

  return creditCardRegex.test(control.value) ? null : invalidResponse;
};
