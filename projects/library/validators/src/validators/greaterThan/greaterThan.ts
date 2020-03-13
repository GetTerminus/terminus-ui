import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import {
  isAbstractControl,
  isNumber,
} from '@terminus/ngx-tools/type-guards';


/**
 * Return a validator function to verify the value is above a minimum value
 *
 * @param minimum
 * @returns The validator function
 */
export const greaterThanValidator =
  (minimum: number | AbstractControl = 0): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (!isNumber(minimum) && isAbstractControl(minimum)) {
      return getValidationResult(minimum.value, control);
    }
    return getValidationResult(minimum, control);
  };

/**
 * Return the validation result
 *
 * @param minimum - The minimum value
 * @param control - The control containing the current value
 * @returns The difference in time
 */
function getValidationResult(minimum: number | undefined, control: AbstractControl): ValidationErrors | null {
  minimum = coerceNumberProperty(minimum);
  const invalidResponse: ValidationErrors = {
    greaterThan: {
      valid: false,
      greaterThan: minimum,
      actual: control.value,
    },
  };

  return (control.value > minimum) ? null : invalidResponse;
}
