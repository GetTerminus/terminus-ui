import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { getControlValue } from './../../../utilities/get-control-value';


/**
 * Return a validator function to verify the value is above a minimum value
 *
 * @param greaterThan - The minimum value
 * @return The validator function
 */
export function greaterThanValidator(minimum: number | AbstractControl = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (typeof minimum === 'number') {
      return validate(minimum, control);
    } else {
      return validate(getControlValue(minimum), control);
    }
  };
}

function validate(minimum, control) {
  // Ensure a number
  minimum = coerceNumberProperty(minimum);

  const invalidResponse: ValidationErrors = {
    greaterThan: {
      valid: false,
      greaterThan: minimum,
      actual: control.value,
    },
  };
  const valueIsOverMinimum = control.value > minimum;

  return valueIsOverMinimum ? null : invalidResponse;
}
