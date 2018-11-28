import { Injectable, isDevMode } from '@angular/core';
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
 * NOTE: minlength, maxlength, greaterThanOrEqual and lessThanOrEqual are being deprecated in 11.x
 * replace with: minLength, maxLength, min, and max respectively
 * more reading in https://github.com/GetTerminus/terminus-ui/issues/1049
 */
 export type TsValidatorNames =
  'compose' |
  'composeAsync' |
  'creditCard' |
  'email' |
  'equalToControl' |
  'fileSize' |
  'fileType' |
  'greaterThan' |
  'greaterThanOrEqual' |
  'imageDimensions' |
  'imageRatio' |
  'lessThan' |
  'lessThanOrEqual' |
  'lowercase' |
  'max' |
  'maxDate' |
  'maxlength' |
  'maxLength' |
  'min' |
  'minDate' |
  'minlength' |
  'minLength' |
  'noResults' |
  'notUnique' |
  'nullValidator' |
  'numbers' |
  'password' |
  'pattern' |
  'required' |
  'requiredTrue' |
  'uppercase' |
  'url'
  ;

 const allowedValidatorNames: TsValidatorNames[] = [
  'compose' ,
  'composeAsync' ,
  'creditCard' ,
  'email' ,
  'equalToControl',
  'fileSize',
  'fileType',
  'greaterThan',
  'imageDimensions',
  'imageRatio',
  'lessThan',
  'lowercase',
  'max',
  'maxDate',
  'maxLength',
  'min',
  'minDate',
  'minLength',
  'noResults',
  'notUnique',
  'nullValidator',
  'numbers',
  'password',
  'pattern',
  'required',
  'requiredTrue',
  'uppercase',
  'url',
 ];

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
   *
   * @deprecated target 11.x
   *
   */
  public getValidatorErrorMessage(validatorName: TsValidatorNames, validatorValue?: any): string {

    if (validatorName && isDevMode() && (allowedValidatorNames.indexOf(validatorName) < 0)) {
      let subValidator = '';
      switch (validatorName) {
        case 'greaterThanOrEqual':
          subValidator = 'min';
          break;
        case 'lessThanOrEqual':
          subValidator = 'max';
          break;
        case 'maxlength':
          subValidator = 'maxLength';
          break;
        case 'minlength':
          subValidator = 'minLength';
          break;
      }
      console.warn(`TsValidationMessageService: "${validatorName}" is not an allowed validator. Use ${subValidator} instead.`);
    }

    const config: {[key: string]: string} = {
      // Standard responses:
      required: `Required`,
      requiredTrue: `${validatorName} must be checked.`,
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      minLength: `Minimum length ${validatorValue.requiredLength}.`,
      maxlength: `Maximum length ${validatorValue.requiredLength}`,
      maxLength: `Maximum length ${validatorValue.requiredLength}.`,
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
      min: `${validatorValue.actual} is less than ${validatorValue.min}.`,
      greaterThan: `${validatorValue.actual} is not greater than ${validatorValue.greaterThan}`,
      greaterThanOrEqual: `${validatorValue.actual} is not greater than or equal to ${validatorValue.greaterThanOrEqual}`,
      numbers: `Must contain at least ${validatorValue.numbers} numbers`,
      max: `${validatorValue.actual} is greater than ${validatorValue.max}.`,
      lessThan: `${validatorValue.actual} is not less than ${validatorValue.lessThan}.`,
      lessThanOrEqual: `${validatorValue.actual} is not less than or equal to ${validatorValue.lessThanOrEqual}.`,
      notUnique: `${validatorValue.actual} has already been selected.`,
      noResults: `No results found.`,
      url: `'${validatorValue.actual}' must be a valid URL.`,
      equalToControl: `'${validatorValue.actual}' must be equal to '${validatorValue.compareValue}'`,
      lowercase: `Must contain at least ${validatorValue.lowercase} lowercase letters`,
      uppercase: `Must contain at least ${validatorValue.uppercase} uppercase letters`,
      fileSize: `Must be smaller than ${validatorValue.max}kb`,
      fileType: `${validatorValue.actual} is not an accepted MIME type.`,
      imageDimensions: ``,
      imageRatio: ``,
      nullValidator: 'Unknown error.',
      compose: 'Unknown error.',
      composeAsync: 'Unknown error.',
    };

    if (validatorName === 'maxDate') {
      const message = `Date must be before`;
      config.maxDate = `${message} ${format(validatorValue.maxDate, 'M/D/YYYY')}`;
    }

    if (validatorName === 'minDate') {
      const message = `Date must be after`;
      config.minDate = `${message} ${format(validatorValue.minDate, 'M/D/YYYY')}`;
    }

    if (validatorName === 'imageDimensions') {
      config.imageDimensions = `${validatorValue.actual.width}x${validatorValue.actual.height} is not an allowed image dimension.`;
    }

    if (validatorName === 'imageRatio') {
      config.imageRatio = `${validatorValue.actual} is not an allowed image ratio.`;
    }

    return config[validatorName];
  }

}
