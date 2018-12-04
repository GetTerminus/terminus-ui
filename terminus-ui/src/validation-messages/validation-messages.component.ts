import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsValidationMessageService } from './validation-message.service';


// Unique ID for each instance
let nextUniqueId = 0;


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
  exportAs: 'tsValidationMessages',
})
export class TsValidationMessagesComponent {
  /**
   * Define the default component ID
   */
  protected uid = `ts-validation-messages-${nextUniqueId++}`;

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
  public control: FormControl | undefined;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if validation should occur on blur or immediately
   */
  @Input()
  public set validateOnChange(value: boolean) {
    this._validateOnChange = coerceBooleanProperty(value);
  }
  public get validateOnChange(): boolean {
    return this._validateOnChange;
  }
  private _validateOnChange = false;

  /**
   * Define if the validation should be immediate
   */
  @Input()
  public set validateImmediately(value: boolean) {
    this._validateImmediately = coerceBooleanProperty(value);
  }
  public get validateImmediately(): boolean {
    return this._validateImmediately;
  }
  private _validateImmediately = false;


  constructor(
    private validationMessageService: TsValidationMessageService,
  ) {
    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }

}
