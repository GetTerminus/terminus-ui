import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { emailMessage } from './../../utilities/regex/email.regex';
import { creditCardMessage } from './../../utilities/regex/credit-card.regex';
import { passwordMessage } from './../../utilities/regex/password.regex';


// TODO: The consuming app will need a way to pass in the error messages config object so that
// localization is supported.

/**
 * Define a service that offers custom validators
 */
@Injectable()
export class ValidationService {

  /**
   * Return the correct error message for a validator
   *
   * @param validatorName - The name of the validator
   * @param validatorValue - The value of the validator
   * @return The error message
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
      // TODO: Figure out how to abstract pattern messages out so they can be customized per
      // pattern. (showing a regex pattern to an end user isn't helpful)
      pattern: `Must contain only letters, numbers or spaces`,
    };

    return config[validatorName];
  }

}
