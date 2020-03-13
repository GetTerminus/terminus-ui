import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { urlOptionalProtocolRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that a domain is valid
 *
 * @returns The validator function
 */
export const domainValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidResponse: ValidationErrors = {
    domain: {
      valid: false,
      actual: control.value,
    },
  };

  return urlOptionalProtocolRegex.test(control.value) ? null : invalidResponse;
};
