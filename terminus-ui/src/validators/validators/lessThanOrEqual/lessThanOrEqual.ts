import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { getControlValue } from './../../../utilities/get-control-value';


/**
 * Return a validator function to verify the number is below a specific number
 *
 * @param base - The maximum value
 * @return The validator function
 */
export function lessThanOrEqualValidator(base: number | AbstractControl = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (typeof base === 'number') {
      return validate(base, control);
    } else {
      return validate(getControlValue(base), control);
    }
  };
}

function validate(base, control) {
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
}
