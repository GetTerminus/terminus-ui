import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';


/**
 * Return a validator function to verify the selected date is after a minimum date
 *
 * @param compareControl - The control to compare the value with
 * @returns The validator function
 */
export const equalToControlValidator =
  (compareControl: AbstractControl): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value || !compareControl.value) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      equalToControl: {
        valid: false,
        compareValue: compareControl.value,
        actual: control.value,
      },
    };


    return (control.value === compareControl.value) ? null : invalidResponse;
  };

