/**
 * Strip any control characters from a string
 *
 * @param str - The string to strip
 * @return The string without control characters
 */
export function stripControlCharacters(str: string): string {
  return str.split('').filter((x) => {
    const n = x.charCodeAt(0);
    return n > 31 && n < 127;
  }).join('');
}
