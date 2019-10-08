import { isSet } from '@terminus/ngx-tools/type-guards';


/**
 * Coerce the type to HTMLInputElement
 *
 * @param x - The item to test
 * @return True if the value is a HTMLInputElement
 */
// tslint:disable-next-line no-any
export function isHTMLInputElement(x: any): x is HTMLInputElement {
  return isSet(x.files);
}
