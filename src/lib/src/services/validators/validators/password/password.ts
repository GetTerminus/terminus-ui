import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { passwordRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that an email address is valid
 *
 * @return The validator function
 */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      password: {
        valid: false,
        actual: control.value,
      },
    };

    return passwordRegex.test(control.value) ? null : invalidResponse;
  };
}
