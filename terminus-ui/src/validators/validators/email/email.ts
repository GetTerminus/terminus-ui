import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { emailRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that an email address is valid
 *
 * @return The validator function
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      email: {
        valid: false,
        actual: control.value,
      },
    };

    return emailRegex.test(control.value) ? null : invalidResponse;
  };
}
