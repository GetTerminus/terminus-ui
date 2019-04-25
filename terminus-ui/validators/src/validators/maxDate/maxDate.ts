import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { isAbstractControl } from '@terminus/ui/utilities';
import { isValid } from 'date-fns';


/**
 * Return a validator function to verify the selected date is before a maximum date
 *
 * @param maxDate - The maximum date
 * @return The validator function
 */
export function maxDateValidator(maxDate: string | AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value) {
      return null;
    }

    if (isAbstractControl(maxDate)) {
      return getValidationResult(maxDate.value, control);
    }

    return getValidationResult(maxDate, control);
  };
}


/**
 * Return the validation result
 *
 * @param maxDate - The latest valid date
 * @param control - The control containing the current value
 * @return The difference in time
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
  if (!isValid(control.value) || !maxDate || !isValid(maxDate)) {
    return invalidResponse;
  }

  const controlDateTime: number = new Date(control.value).getTime();
  const maxDateTime: number = new Date(maxDate).getTime();

  return (maxDateTime >= controlDateTime) ? null : invalidResponse;
}
