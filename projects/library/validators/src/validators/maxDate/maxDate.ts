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
 * Return a validator function to verify the selected date is before a maximum date
 *
 * @param maxDate - The maximum date
 * @returns The validator function
 */
export const maxDateValidator = (maxDate: string | AbstractControl): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  if (!isString(maxDate) && isAbstractControl(maxDate)) {
    return getValidationResult(maxDate.value, control);
  }
  return getValidationResult(maxDate, control);
};


/**
 * Return the validation result
 *
 * @param maxDate - The latest valid date
 * @param control - The control containing the current value
 * @returns The difference in time
 */
function getValidationResult(maxDate: string | undefined, control: AbstractControl): ValidationErrors | null {
  const invalidResponse: ValidationErrors = {
    maxDate: {
      valid: false,
      maxDate,
      actual: control.value,
    },
  };

  // Verify the dates are valid
  if (!isValidDate(control.value) || !maxDate || !isValidDate(maxDate)) {
    return invalidResponse;
  }

  const controlDateTime: number = new Date(control.value).getTime();
  const maxDateTime: number = new Date(maxDate).getTime();
  return (maxDateTime >= controlDateTime) ? null : invalidResponse;
}
