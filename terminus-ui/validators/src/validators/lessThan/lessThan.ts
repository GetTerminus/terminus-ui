import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isAbstractControl } from '@terminus/ui/utilities';


/**
 * Return a validator function to verify the number is below a specific number
 *
 * @param max - The maximum value
 * @return The validator function
 */
export function lessThanValidator(max: number | AbstractControl = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (isAbstractControl(max)) {
      return getValidationResult(max.value, control);
    }
    return getValidationResult(max, control);

  };
}


/**
 * Return the validation result
 *
 * @param max - The minimum value
 * @param control - The control containing the current value
 * @return The difference in time
 */
function getValidationResult(max: number | undefined, control: AbstractControl): ValidationErrors | null {
  max = coerceNumberProperty(max);
  const invalidResponse: ValidationErrors = {
    lessThan: {
      valid: false,
      lessThan: max,
      actual: control.value,
    },
  };

  return (control.value < max) ? null : invalidResponse;
}
