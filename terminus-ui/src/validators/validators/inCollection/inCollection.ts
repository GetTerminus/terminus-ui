import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';


/**
 * Return a validator function to verify the value is present in the collection
 *
 * @param collection - The collection to check for the value
 * @param valueFn - A function that pulls the value to compare from the collection objects
 * @return The validator function
 */
export function inCollectionValidator(collection: any[], valueFn?: (a: any) => string): ValidatorFn {
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
      // Determine the correct value to compare
      const collectionValue = valueFn ? valueFn(v) : v;

      return collectionValue === control.value;
    });

    return found ? null : invalidResponse;
  };
}
