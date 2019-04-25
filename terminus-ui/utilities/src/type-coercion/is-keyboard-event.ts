import { isSet } from '@terminus/ngx-tools';


/**
 * Coerce the type to KeyboardEvent
 *
 * @param x - The item to test
 * @return True if the value is a KeyboardEvent
 */
// tslint:disable-next-line no-any
export function isKeyboardEvent(x: any): x is KeyboardEvent {
  return isSet(x.code);
}
