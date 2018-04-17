import { Injectable } from '@angular/core';
import { format } from 'date-fns';


/**
 * Define the error message for an invalid email
 */
const emailMessage = `Invalid email address.`;

/**
 * Define the error message for an invalid credit card
 */
const creditCardMessage = `Invalid credit card number.`;

/**
 * Define the error message for an invalid password
 */
const passwordMessage = `Password must be between 6 and 100 characters, and contain a number.`;


/*
 * TODO: The consuming app will need a way to pass in the error messages config object so that
 * localization is supported. See https://github.com/GetTerminus/terminus-ui/issues/403
 */


/**
 * Define a service that offers custom validators
 */
@Injectable()
export class TsValidationMessageService {

  /**
   * Return the correct error message for a validator
   *
   * @param validatorName - The name of the validator
   * @param validatorValue - The value of the validator
   * @return The error message
   */
  public getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config: {[key: string]: string} = {
      // Standard responses:
      required: `Required`,
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Maximum length ${validatorValue.requiredLength}`,
      // Custom responses:
      creditCard: creditCardMessage,
      email: emailMessage,
      password: passwordMessage,
      // TODO: Figure out how to abstract pattern messages out so they can be customized per
      // pattern. (showing a regex pattern to an end user isn't helpful) and we need the ability to
      // support multiple patterns
      pattern: `Must contain only letters, numbers or spaces`,
      maxDate: '',
      minDate: '',
      greaterThan: `${validatorValue.actual} is not greater than ${validatorValue.greaterThan}`,
      greaterThanOrEqual: `${validatorValue.actual} is not greater than or equal to ${validatorValue.greaterThanOrEqual}`,
      numbers: `Must contain at least ${validatorValue.numbers} numbers`,
      lessThan: `${validatorValue.actual} is not less than ${validatorValue.lessThan}`,
      lessThanOrEqual: `${validatorValue.actual} is not less than or equal to ${validatorValue.lessThanOrEqual}`,
      notUnique: `${validatorValue.actual} has already been selected.`,
      noResults: `No results found.`,
      url: `'${validatorValue.actual}' is not a valid URL.`,
      equalToControl: `'${validatorValue.actual}' is not equal to '${validatorValue.compareValue}'`,
      lowercase: `Must contain at least ${validatorValue.lowercase} lowercase letters`,
      uppercase: `Must contain at least ${validatorValue.uppercase} uppercase letters`,
    };

    if (validatorName === 'maxDate') {
      const message = `Date must be before`;
      config.maxDate = `${message} ${format(validatorValue.maxDate, 'M/D/YYYY')}`;
    }

    if (validatorName === 'minDate') {
      const message = `Date must be after`;
      config.minDate = `${message} ${format(validatorValue.minDate, 'M/D/YYYY')}`;
    }

    return config[validatorName];
  }

}
