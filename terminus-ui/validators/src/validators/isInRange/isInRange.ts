import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isAbstractControl } from '@terminus/ui/utilities';

import { isNumber } from '@terminus/ngx-tools';


/**
 * Return a validator function to verify the value is within range
 *
 * @param minimum - The minimum value
 * @param maximum - The minimum value
 * @return The validator function
 */
export function isInRangeValidator(
minimum: number | AbstractControl = 0,
maximum: number | AbstractControl = 0):
  ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control) {
      return null;
    }

    const value: number | null = isNumber(control.value) ? Number(control.value) : null;

    // Verify the value
    if (value === null) {
      return null;
    }

    if (isAbstractControl(minimum) && isAbstractControl(maximum)) {
      return getValidationResult(minimum.value, maximum.value, control);
    } else {
      return getValidationResult(coerceNumberProperty(minimum), coerceNumberProperty(maximum), control);
    }
  };
}


/**
 * Return the validation result
 *
 * @param minimum - The minimum value
 * @param maximum - The maximum value
 * @param control - The control containing the current value
 * @return The difference in time
 */
function getValidationResult(minimum: number | undefined, maximum: number | undefined, control: AbstractControl): ValidationErrors | null {
  minimum = coerceNumberProperty(minimum);
  maximum = coerceNumberProperty(maximum);
  const invalidResponse: ValidationErrors = {
    isInRange: {
    valid: false,
    minimum: minimum,
    maximum: maximum,
    actual: control.value,
    },
  };

  return (control.value >= minimum && control.value <= maximum) ? null : invalidResponse;
}
