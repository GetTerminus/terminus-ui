import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationResponse } from '@interfaces/validator-response.interface';
import { creditCardRegex } from '@utilities/regex/credit-card.regex';
import { emailRegex } from '@utilities/regex/email.regex';
import { passwordRegex } from '@utilities/regex/password.regex';


/**
 * Define a service that exposes custom form validators for use with reactive forms.
 *
 * See {@link TsLoginFormComponent} for an example
 */
@Injectable()
export class TsValidatorsService {

  /**
   * A custom credit card validator.
   *
   * @param control - The form control
   * @return The validation object or null
   */
  validateCreditCard(control: FormControl): null | ValidationResponse {
    return creditCardRegex.test(control.value) ? null : {
      invalidCreditCard: {
        valid: false,
      },
    };
  }


  /**
   * A custom email validator
   *
   * @param control - The form control
   * @return The validation object or null
   */
  validateEmail(control: FormControl): null | ValidationResponse {
    return emailRegex.test(control.value) ? null : {
      invalidEmail: {
        valid: false,
      },
    };
  }


  /**
   * A custom password validator.
   *
   * @param control - The form control
   * @return The validation object or null
   */
  validatePassword(control: FormControl): null | ValidationResponse {
    return passwordRegex.test(control.value) ? null : {
      invalidPassword: {
        valid: false,
      },
    };
  }

}
