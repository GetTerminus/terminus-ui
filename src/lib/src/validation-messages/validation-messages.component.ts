import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationService } from './../services/validation/validation.service';


/**
 * A presentational component to render validation messages
 *
 * -- QA CSS CLASSES
 *
 * qa-validation-message : Placed on the md-error element used for this component
 *
 * @example
 * <ts-validation-messages
 *              [control]="myForm.get('controlName')"
 * ></ts-validation-messages>
 */
@Component({
  selector: 'ts-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
})
export class TsValidationMessagesComponent {
  /**
   * Define the associated form control
   */
  @Input()
  public control: FormControl;


  constructor(
    private validationService: ValidationService,
  ) { }


  /**
   * Define the error message
   *
   * @return {String|Null} errorMessage The error message or null if no error
   */
  public get validationMessage(): string | null {
    // tslint:disable-next-line
    for (const propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        const errors = this.control.errors[propertyName];

        return this.validationService.getValidatorErrorMessage(propertyName, errors);
      }
    }

    return null;
  }

}
