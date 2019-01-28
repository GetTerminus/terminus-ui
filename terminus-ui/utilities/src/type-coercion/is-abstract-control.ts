import { AbstractControl } from '@angular/forms';


/**
 * Coerce the type to AbstractControl
 *
 * @param x - The item to test
 * @return True if the value is a control
 */
export function isAbstractControl(x: any): x is AbstractControl {
  return x.pristine !== undefined;
}
