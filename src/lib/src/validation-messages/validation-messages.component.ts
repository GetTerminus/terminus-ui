import {
  Component,
  Input,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
} from '@angular/forms';

import { ValidationService } from './../services/validation/validation.service';


/**
 * A presentational component to render validation messages
 *
 * @example
 * <ts-validation-messages
 *              [control]="myForm.controls.email"
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
  @Input() control: FormControl;


  constructor(
    private validationService: ValidationService,
  ) { }


  /**
   * Define the error message
   */
  get validationMessage() {
    // tslint:disable-next-line
    for (const propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        const errors = this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);

        return errors;
      }
    }

    return null;
  }

}
