/**
 * Strip any control characters from a string
 *
 * @param time - The time chosen
 * @return The difference in time
 */
export function stripControlCharacters(str: string): string {
  return str.split('').filter((x) => {
    const n = x.charCodeAt(0);
    return n > 31 && n < 127;
  }).join('');
}
