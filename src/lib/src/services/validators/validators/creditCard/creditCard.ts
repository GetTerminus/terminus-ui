import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { creditCardRegex } from './../../../../utilities/regex/credit-card.regex';


/**
 * Return a validator function to verify that a credit card number is valid
 *
 * @return The validator function
 */
export function creditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
}
