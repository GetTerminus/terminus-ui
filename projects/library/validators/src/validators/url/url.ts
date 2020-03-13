import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { urlRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that a url is valid
 *
 * @returns The validator function
 */
export const urlValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidResponse: ValidationErrors = {
    url: {
      valid: false,
      actual: control.value,
    },
  };
  return urlRegex.test(control.value) ? null : invalidResponse;
};
