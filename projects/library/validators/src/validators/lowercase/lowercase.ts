import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { createContainsLowercaseRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that number of lowercase letters is satisfied
 *
 * @returns The validator function
 * @param lowercaseMin
 */
export const lowercaseValidator = (lowercaseMin?: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  lowercaseMin = lowercaseMin ? lowercaseMin : 1;
  const invalidResponse: ValidationErrors = {
    lowercase: {
      valid: false,
      actual: control.value,
      lowercase: lowercaseMin,
    },
  };
  const regex = createContainsLowercaseRegex(lowercaseMin);
  return regex.test(control.value) ? null : invalidResponse;
};
