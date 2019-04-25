import { AbstractControl } from '@angular/forms';
import { isSet } from '@terminus/ngx-tools';


/**
 * Coerce the type to AbstractControl
 *
 * @param x - The item to test
 * @return True if the value is a control
 */
// tslint:disable-next-line no-any
export function isAbstractControl(x: any): x is AbstractControl {
  return isSet(x.pristine);
}
