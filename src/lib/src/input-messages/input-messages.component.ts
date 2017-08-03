import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ValidationService } from './../services/validation/validation.service';


/**
 * A presentational component to render input validation messages
 *
 * @example
 * <t-control-messages
 *             [control]="myForm.controls.email"
 * ></t-control-messages>
 */
@Component({
  selector: 'ts-control-messages',
  templateUrl: './input-messages.component.html',
  styleUrls: ['./input-messages.component.scss'],
})
export class TsInputMessagesComponent {
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
  get errorMessage() {
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
