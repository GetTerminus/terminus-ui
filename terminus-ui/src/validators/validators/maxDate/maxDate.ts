import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { isValid } from 'date-fns';
import { getControlValue } from './../../../utilities/get-control-value';


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

    if (typeof maxDate === 'string') {
      return !isValid(maxDate) ? null : validate(maxDate, control);
    } else {
      return validate(getControlValue(maxDate), control);
    }
  };
}

function validate(maxDate, control) {
  const invalidResponse: ValidationErrors = {
    maxDate: {
      valid: false,
      maxDate: maxDate,
      actual: control.value,
    },
  };

  // Verify the control value is a valid date
  if (!isValid(control.value)) {
    return invalidResponse;
  }

  const controlDateTime = new Date(control.value).getTime();
  const maxDateTime = new Date(maxDate).getTime();
  const dateIsBeforeMax = maxDateTime >= controlDateTime;

  return dateIsBeforeMax ? null : invalidResponse;
}
