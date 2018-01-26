import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';


/**
 * Return a validator function to verify the value is above a minimum number
 *
 * @param greaterThan - The minimum value
 * @return The validator function
 */
export function greaterThanValidator(minimum: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value) || !minimum) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      greaterThan: {
        valid: false,
        greaterThan: minimum,
        actual: control.value,
      },
    };
    const valueIsOverMinimum = control.value >= minimum;

    return valueIsOverMinimum ? null : invalidResponse;
  };
}
