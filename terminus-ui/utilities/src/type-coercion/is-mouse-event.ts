import { isSet } from '@terminus/ngx-tools/type-guards';


/**
 * Coerce the type to MouseEvent
 *
 * @param x - The item to test
 * @return True if the value is a MouseEvent
 */
// tslint:disable-next-line no-any
export function isMouseEvent(x: any): x is MouseEvent {
  return !!x && isSet(x.relatedTarget);
}
