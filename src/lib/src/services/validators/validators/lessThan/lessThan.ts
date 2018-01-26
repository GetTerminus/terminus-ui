import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';


/**
 * Return a validator function to verify the number is below a specific number
 *
 * @param lessThan - The maximum value
 * @return The validator function
 */
export function lessThanValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || isNaN(control.value) || !max) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      lessThan: {
        valid: false,
        lessThan: max,
        actual: control.value,
      },
    };
    const valueIsUnderMax = control.value <= max;

    return valueIsUnderMax ? null : invalidResponse;
  };
}
