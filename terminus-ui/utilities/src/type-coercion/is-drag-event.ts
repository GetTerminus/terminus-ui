import { isSet } from '@terminus/ngx-tools';


/**
 * Coerce the type to DragEvent
 *
 * @param x - The item to test
 * @return True if the value is a DragEvent
 */
// tslint:disable-next-line no-any
export function isDragEvent(x: any): x is DragEvent {
  return isSet(x.dataTransfer);
}
