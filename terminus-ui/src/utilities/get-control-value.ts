import {
  AbstractControl,
} from '@angular/forms';

export function getControlValue(control: AbstractControl) {
  if (!control || !control.value) {
    return null;
  }
  return control.value;
}
