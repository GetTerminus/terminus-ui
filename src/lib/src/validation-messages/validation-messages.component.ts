import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationService } from './../services/validation/validation.service';


/**
 * A presentational component to render validation messages
 *
 * #### QA CSS CLASSES
 * - `qa-validation-message`: Placed on the error element used for this component
 *
 * @example
 * <ts-validation-messages
 *              [control]="myForm.get('controlName')"
 *              validateOnChange="true"
 * ></ts-validation-messages>
 */
@Component({
  selector: 'ts-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
})
export class TsValidationMessagesComponent {
  /**
   * Define the error message
   *
   * @return The error message or null if no error
   */
  public get validationMessage(): string | null {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        // Only show after 'touched' if we are NOT validating on every change
        if (this.validateOnChange || (!this.validateOnChange && this.control.touched)) {
          const errors = this.control.errors[propertyName];

          return this.validationService.getValidatorErrorMessage(propertyName, errors);
        }
      }
    }

    return null;
  }

  /**
   * Define the associated form control
   */
  @Input()
  public control: FormControl;

  /**
   * Define if validation should occur on blur or immediately
   */
  @Input()
  public validateOnChange: boolean = false;


  /**
   * Inject services
   */
  constructor(
    private validationService: ValidationService,
  ) {}

}
