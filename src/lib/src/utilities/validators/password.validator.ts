import { FormControl } from '@angular/forms';

import { passwordRegex } from './../regex/password.regex';
import { ValidationResponse } from './../validators/validator-return.interface';


/**
 * A custom email validator for use in a reactive form. (See {@link TsLoginFormComponent})
 *
 * @param {FormControl} control The form control
 * @return {null|ValidationResponse} response The validation object or null
 */
export function validatePassword(control: FormControl): null | ValidationResponse {
  return passwordRegex.test(control.value) ? null : {
    invalidPassword: {
      valid: false
    }
  };
}
