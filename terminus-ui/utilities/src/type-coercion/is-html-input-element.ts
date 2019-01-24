/**
 * Coerce the type to HTMLInputElement
 *
 * @param x - The item to test
 * @return True if the value is a HTMLInputElement
 */
export function isHTMLInputElement(x: any): x is HTMLInputElement {
  return x.files !== undefined;
}
