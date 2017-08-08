import { FormControl } from '@angular/forms';

import { emailRegex } from './../regex/email.regex';
import { ValidationResponse } from './../validators/validator-return.interface';


/**
 * A custom email validator for use in a reactive form. (See {@link TsLoginFormComponent})
 *
 * @param {FormControl} control The form control
 * @return {null|ValidationResponse} response The validation object or null
 */
export function validateEmail(control: FormControl): null | ValidationResponse {
  return emailRegex.test(control.value) ? null : {
    invalidEmail: {
      valid: false
    }
  };
}
