import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  isAbstractControl,
  isString,
  isValidDate,
} from '@terminus/ngx-tools/type-guards';


/**
 * Return a validator function to verify the selected date is after a minimum date
 *
 * @param minDate - The minimum date
 * @return The validator function
 */
export function minDateValidator(minDate: string | AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value) {
      return null;
    }

    if (!isString(minDate) && isAbstractControl(minDate)) {
      return getValidationResult(minDate.value, control);
    }

    return getValidationResult(minDate, control);
  };
}


/**
 * Return the validation result
 *
 * @param minDate - The minimum allowed date
 * @param control - The control containing the current value
 * @return The difference in time
 */
function getValidationResult(minDate: string | undefined, control: AbstractControl): ValidationErrors | null {
  const invalidResponse: ValidationErrors = {
    minDate: {
      valid: false,
      minDate,
      actual: control.value,
    },
  };

  // Verify the dates are valid
  if (!isValidDate(control.value) || !minDate || !isValidDate(minDate)) {
    return invalidResponse;
  }

  const controlDateTime = new Date(control.value).getTime();
  const minDateTime = new Date(minDate).getTime();
  const dateIsAfterMin = minDateTime <= controlDateTime;

  return dateIsAfterMin ? null : invalidResponse;
}
