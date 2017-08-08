import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { emailMessage } from './../../utilities/regex/email.regex';
import { creditCardMessage } from './../../utilities/regex/credit-card.regex';
import { passwordMessage } from './../../utilities/regex/password.regex';


/**
 * Define a service that offers custom validators
 *
 * TODO: The consuming app will need a way to pass in the error messages config object so that
 * localization is supported.
 */
@Injectable()
export class ValidationService {

  /**
   * Return the correct error message for a validator
   *
   * @param {String} validatorName The name of the validator
   * @param {Object} validatorValue The value of the validator
   * @return {String} errorMessage The error message
   */
  public getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config = {
      // Standard responses:
      required: `Required`,
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      // Custom responses:
      invalidCreditCard: creditCardMessage,
      invalidEmail: emailMessage,
      invalidPassword: passwordMessage,
    };

    return config[validatorName];
  }

}
