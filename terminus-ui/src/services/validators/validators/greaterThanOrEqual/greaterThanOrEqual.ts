import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';


/**
 * Return a validator function to verify the value is equal to or above a minimum value
 *
 * @param base - The minimum value
 * @return The validator function
 */
export function greaterThanOrEqualValidator(base: number = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    // Ensure a number
    base = coerceNumberProperty(base);

    const invalidResponse: ValidationErrors = {
      greaterThanOrEqual: {
        valid: false,
        greaterThanOrEqual: base,
        actual: control.value,
      },
    };
    const valueIsValid = control.value >= base;

    return valueIsValid ? null : invalidResponse;
  };
}
