import { FormControl } from '@angular/forms';

import { creditCardRegex } from './../regex/credit-card.regex';
import { ValidationResponse } from './../validators/validator-return.interface';


/**
 * A custom credit card validator for use in a reactive form.
 *
 * @param {FormControl} control The form control
 * @return {null|ValidationResponse} response The validation object or null
 */
export function validateCreditCard(control: FormControl): null | ValidationResponse {
  return creditCardRegex.test(control.value) ? null : {
    invalidCreditCard: {
      valid: false
    }
  };
}
