import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { TsValidationMessageService } from './validation-message.service';


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
  host: {
    class: 'ts-validation-messages',
  },
  encapsulation: ViewEncapsulation.None,
})
export class TsValidationMessagesComponent {
  /**
   * Define the error message
   *
   * @return The error message or null if no error
   */
  public get validationMessage(): string | null | undefined {
    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {

        // istanbul ignore else
        if (propertyName) {
          // Only show after 'touched' if we are NOT validating on every change
          const immediatelyOrOnChange = this.validateImmediately || this.validateOnChange;
          if (immediatelyOrOnChange || (!this.validateOnChange && this.control.touched)) {
            const errors = this.control.errors[propertyName];

            return this.validationMessageService.getValidatorErrorMessage(propertyName, errors);
          }
        }

      }
    }

    return null;
  }

  /**
   * Define the associated form control
   */
  @Input()
  public control!: FormControl;

  /**
   * Define if validation should occur on blur or immediately
   */
  @Input()
  public validateOnChange: boolean = false;

  /**
   * Define if the validation should be immediate
   */
  @Input()
  public validateImmediately: boolean = false;


  /**
   * Inject services
   */
  constructor(
    private validationMessageService: TsValidationMessageService,
  ) {}

}
