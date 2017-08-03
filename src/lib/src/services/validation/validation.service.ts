import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { emailRegex, emailMessage } from './../../utilities/regex/email.regex';
import { creditCardRegex, creditCardMessage } from './../../utilities/regex/credit-card.regex';
import { passwordRegex, passwordMessage } from './../../utilities/regex/password.regex';


@Injectable()
export class ValidationService {

  constructor() { }

  public getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {

    // TODO: We will need a way for the consuming app to seed these values so that localization is
    // supported.
    const config = {
      required: `Required`,
      invalidCreditCard: creditCardMessage,
      validateEmail: emailMessage,
      invalidPassword: passwordMessage,
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }


  /**
   * Credit card validator
   *
   * @param {Object} control The control to check for validation
   * @return {Null|Object} result The validation result
   */
  public creditCardValidator(control: AbstractControl): any {
    if (control.value.match(creditCardRegex)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }


  /**
   * Email validator
   *
   * @param {Object} control The control to check for validation
   * @return {Null|Object} result The validation result
   */
  public emailValidator(control: AbstractControl): any {
    if (control.value.match(emailRegex)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }


  /**
   * Password validator
   *
   * @param {Object} control The control to check for validation
   * @return {Null|Object} result The validation result
   */
  public passwordValidator(control: AbstractControl): any {
    if (control.value.match(passwordRegex)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

}
