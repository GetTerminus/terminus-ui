import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';


/**
 * Return a validator function to verify the number is below a specific number
 *
 * @param base - The maximum value
 * @return The validator function
 */
export function lessThanOrEqualValidator(base: number = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    // Ensure a number
    base = coerceNumberProperty(base);

    const invalidResponse: ValidationErrors = {
      lessThanOrEqual: {
        valid: false,
        lessThanOrEqual: base,
        actual: control.value,
      },
    };
    const valueIsUnderMax = control.value <= base;

    return valueIsUnderMax ? null : invalidResponse;
  };
}
