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
 * @param max - The maximum value
 * @return The validator function
 */
export function lessThanValidator(max: number | AbstractControl = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value)) {
      return null;
    }

    if (typeof max === 'number') {
      return validate(max, control);
    } else {
      return validate(getControlValue(max), control);
    }
  };
}

function validate(max, control) {
    // Ensure a number
    max = coerceNumberProperty(max);

    const invalidResponse: ValidationErrors = {
      lessThan: {
        valid: false,
        lessThan: max,
        actual: control.value,
      },
    };
    const valueIsUnderMax = control.value < max;

    return valueIsUnderMax ? null : invalidResponse;
}
