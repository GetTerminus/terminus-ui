import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { createContainsUppercaseRegex } from '@terminus/ngx-tools/regex';


/**
 * Return a validator function to verify that number of uppercase letters is satisfied
 * @param uppercaseMin - the minimum uppercase letters
 * @return The validator function
 */
export function uppercaseValidator(uppercaseMin?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value) {
      return null;
    }

    uppercaseMin = uppercaseMin ? uppercaseMin : 1;
    const invalidResponse: ValidationErrors = {
      uppercase: {
        valid: false,
        actual: control.value,
        uppercase: uppercaseMin,
      },
    };

    const regex = createContainsUppercaseRegex(uppercaseMin);
    return regex.test(control.value) ? null : invalidResponse;
  };
}
