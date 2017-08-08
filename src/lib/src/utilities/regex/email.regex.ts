/**
 * Define a regex to validate an email address
 */
/* tslint:disable:max-line-length */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* tslint-enable: max-line-length */

/**
 * Define the error message for an invalid email
 */
export const emailMessage = `Invalid email address.`;
