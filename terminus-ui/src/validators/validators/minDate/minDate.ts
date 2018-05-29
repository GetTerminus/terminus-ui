import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { isValid } from 'date-fns';
import { getControlValue } from './../../../utilities/get-control-value';


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

    if (typeof minDate === 'string') {
      return !isValid(minDate) ? null : validate(minDate, control);
    } else {
      return validate(getControlValue(minDate), control);
    }
  };
}

function validate(minDate, control) {
  const invalidResponse: ValidationErrors = {
    minDate: {
      valid: false,
      minDate: minDate,
      actual: control.value,
    },
  };

  // Verify the control value is a valid date
  if (!isValid(control.value)) {
    return invalidResponse;
  }

  const controlDateTime = new Date(control.value).getTime();
  const minDateTime = new Date(minDate).getTime();
  const dateIsAfterMin = minDateTime <= controlDateTime;

  return dateIsAfterMin ? null : invalidResponse;
}
