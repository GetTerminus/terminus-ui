import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isAbstractControl } from './../../../utilities/type-coercion/is-abstract-control';


/**
 * Return a validator function to verify the value is present in the collection
 *
 * @param collection - The collection to check for the value
 * @return The validator function
 */
export function inCollectionValidator(collection: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Allow optional controls by not validating empty values
    if (!control || !control.value || !collection || collection.length < 1) {
      return null;
    }

    const invalidResponse: ValidationErrors = {
      inCollection: {
        valid: false,
        actual: control.value,
        collection: collection,
      },
    };

    const found = collection.some((v) => {
      return v === control.value;
    });

    return found ? null : invalidResponse;
  };
}

