import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isAbstractControl } from './../../../utilities/type-coercion/is-abstract-control';


/**
 * Return a validator function to verify the value is equal to or above a minimum value
 *
 * @param base - The minimum value
 * @return The validator function
 */
export function greaterThanOrEqualValidator(base: number | AbstractControl = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (isAbstractControl(base)) {
      return getValidationResult(base.value, control);
    } else {
      return getValidationResult(base, control);
    }
  };
}


/**
 * Return the validation result
 *
 * @param base - The minimum value
 * @param control - The control containing the current value
 * @return The difference in time
 */
function getValidationResult(base: number | undefined, control: AbstractControl): ValidationErrors | null {
  base = coerceNumberProperty(base);
  const invalidResponse: ValidationErrors = {
    greaterThanOrEqual: {
      valid: false,
      greaterThanOrEqual: base,
      actual: control.value,
    },
  };

  return (control.value >= base) ? null : invalidResponse;
}
