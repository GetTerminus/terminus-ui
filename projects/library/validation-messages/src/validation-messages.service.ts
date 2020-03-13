import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TsDatePipe } from '@terminus/ui/pipes';


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
export class TsValidationMessagesService {

  constructor(private datePipe: TsDatePipe) {}

  /**
   * Return the correct error message for a validator
   *
   * @param validatorName - The name of the validator
   * @param validatorValue - The value of the validator
   * @returns The error message
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getValidatorErrorMessage(validatorName: string, validatorValue?: ValidationErrors): string {
    const config: { [key: string]: string } = {
      // Standard responses:
      required: `Required`,
      requiredTrue: `${validatorName} must be checked.`,
      minLength: `Must be at least ${validatorValue?.requiredLength} characters.`,
      maxLength: `Must be less than ${validatorValue?.requiredLength} characters.`,
      // Custom responses:
      creditCard: creditCardMessage,
      email: emailMessage,
      isInRange: `Must be between ${validatorValue?.minimum} and ${validatorValue?.maximum}`,
      password: passwordMessage,
      // TODO: Figure out how to abstract pattern messages out so they can be customized per
      // pattern. (showing a regex pattern to an end user isn't helpful) and we need the ability to
      // support multiple patterns
      pattern: `Must contain only letters, numbers or spaces`,
      maxDate: '',
      minDate: '',
      min: `${validatorValue?.actual} must be greater than ${validatorValue?.min}.`,
      greaterThan: `${validatorValue?.actual} must be less than ${validatorValue?.greaterThan}`,
      numbers: `Must contain at least ${validatorValue?.numbers} numbers`,
      max: `${validatorValue?.actual} must be less than ${validatorValue?.max}.`,
      lessThan: `${validatorValue?.actual} must be less than ${validatorValue?.lessThan}.`,
      notUnique: `${validatorValue?.actual} has already been selected.`,
      noResults: `No results found.`,
      url: `'${validatorValue?.actual}' must be a valid URL.`,
      domain: `'${validatorValue?.actual}' must be a valid domain`,
      equalToControl: `'${validatorValue?.actual}' must be equal to '${validatorValue?.compareValue}'`,
      lowercase: `Must contain at least ${validatorValue?.lowercase} lowercase letters`,
      uppercase: `Must contain at least ${validatorValue?.uppercase} uppercase letters`,
      fileSize: `Must be smaller than ${validatorValue?.max}kb`,
      fileType: `${validatorValue?.actual} is not an accepted MIME type.`,
      imageDimensions: ``,
      imageRatio: ``,
      nullValidator: 'Unknown error.',
      compose: 'Unknown error.',
      composeAsync: 'Unknown error.',
      inCollection: `${validatorValue?.actual} is not an accepted item.`,
    };

    if (validatorName === 'maxDate') {
      config.maxDate = `Date must be before ${this.datePipe.transform(validatorValue?.maxDate, 'short') as string}`;
    }

    if (validatorName === 'minDate') {
      config.minDate = `Date must be after ${this.datePipe.transform(validatorValue?.minDate, 'short') as string}`;
    }

    if (validatorName === 'imageDimensions') {
      config.imageDimensions = `${validatorValue?.actual.width}x${validatorValue?.actual.height} is not an allowed image dimension.`;
    }

    if (validatorName === 'imageRatio') {
      config.imageRatio = `${validatorValue?.actual} is not an allowed image ratio.`;
    }

    return config[validatorName];
  }
}
