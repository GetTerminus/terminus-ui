import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { createContainsNumbersRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that number of digital numbers is satisfied
 *
 * @param numbersMin - the minumum numbers
 * @return The validator function
 */
export function numbersValidator(numbersMin?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
}
