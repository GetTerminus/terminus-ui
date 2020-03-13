import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { createContainsNumbersRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that number of digital numbers is satisfied
 *
 * @param numbersMin - The minimum amount of numbers
 * @returns The validator function
 */
export const numbersValidator = (numbersMin?: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  numbersMin = numbersMin ? numbersMin : 1;
  const invalidResponse: ValidationErrors = {
    numbers: {
      valid: false,
      actual: control.value,
      numbers: numbersMin,
    },
  };
  const regex = createContainsNumbersRegex(numbersMin);
  return regex.test(control.value) ? null : invalidResponse;
};
