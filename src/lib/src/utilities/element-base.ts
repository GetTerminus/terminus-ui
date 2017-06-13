import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ValueAccessorBase } from './value-accessor';

import {
  AsyncValidatorArray,
  ValidatorArray,
  IValidationResult,
  message,
  validate,
} from './validate';

/**
 * Base class for input components that is responsible for supplying validity state and methods to
 * the derived component. Extends {@link ValueAccessorBase}.
 *
 * - Provides observable values to its parent about its validity state.
 * - Provides a validate method which can also be used in the control and which works off of
 *   validators injected through hierarchical dependency injection (eg. a required or minlength
 *   directive).
 *
 * Reference: http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
 */
export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  /**
   * @protected store the model
   */
  protected abstract model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
  ) {
    super();
  }

  /**
   * @protected Return the validation result
   */
  protected validate(): Observable<IValidationResult> {
    return validate
    (this.validators, this.asyncValidators)
    (this.model.control);
  }

  /**
   * @protected Get any invalid validations
   */
  protected get invalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length > 0);
  }

  /**
   * @protected Get all validation failures
   */
  protected get failures(): Observable<Array<string>> {
    return this.validate().map((v) => {
      // V will be null if no more failures are found
      if (v) {
        return Object.keys(v).map(k => message(v, k));
      } else {
        return null;
      }
    });
  }
}
