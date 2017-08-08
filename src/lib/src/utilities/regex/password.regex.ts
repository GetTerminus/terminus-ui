/**
 * Define a regex to validate an email address
 *
 * TODO: Not in use. Currently the only password requirement is a minlength of 8 characters
 *
 * {6,100}     - Assert password is between 6 and 100 characters
 * (?=.*[0-9]) - Assert a string has at least one number
 */
export const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/;

/**
 * Define the error message for an invalid password
 */
export const passwordMessage = `Password must be at least 6 characters long, and contain a number.`;
