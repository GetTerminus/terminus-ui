/**
 * Strip any control characters from a string (eg backspace or carriage return)
 *
 * @param str - The string to strip
 * @returns The string without control characters
 */
export const stripControlCharacters = (str: string): string => str.split('').filter(x => {
  const controlLowerLimit = 31;
  const controlUpperLimit = 127;
  const n = x.charCodeAt(0);
  return n > controlLowerLimit && n < controlUpperLimit;
}).join('');
