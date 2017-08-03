/* tslint:disable:max-line-length */

/**
 * Define a regex to validate a credit card number
 *
 * Visa, MasterCard, American Express, Diners Club, Discover, JCB
 */
export const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

