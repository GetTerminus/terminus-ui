import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { TsInputComponent } from './../input/input.component';
import { validateEmail } from './../utilities/validators/email.validator';


/**
 * This is the login-form UI Component
 *
 * @example
 * <ts-login-form
 *              [inProgress]="true"
 *              forgotPasswordLink="reset/password/path"
 *              (submit)="myMethod($event)"
 * ></ts-login-form>
 */
@Component({
  selector: 'ts-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class TsLoginFormComponent {
  /**
   * Define the text for the 'forgot password' link
   */
  public forgotPasswordText: string = 'Forgot your password?';

  /**
   * Define the login call to action
   */
  public loginCta: string = `Log In`;

  /**
   * Define the login form
   */
  public loginForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        validateEmail,
      ],
    ],
    password: [
      null,
      [
        Validators.required,
      ],
    ],
    rememberMe: [
      false,
    ],
  });

  /**
   * Define the link to the 'forgot password' view
   */
  @Input() forgotPasswordLink: string = '/forgot';

  /**
   * Define if the form button is showing progress
   */
  @Input() inProgress: Boolean = false;

  /**
   * Emit an event on form submission
   */
  @Output() submit: EventEmitter<any> = new EventEmitter;

  /**
   * Provide access to the inputs
   */
  @ViewChildren(TsInputComponent) inputComponents: QueryList<TsInputComponent>;

  /**
   * @private
   */
  constructor(
    private formBuilder: FormBuilder,
  ) {}


  /**
   * Helper method to get a form control
   *
   * @param {String} name The name of the form control
   * @param {FormGroup} form The primary form group
   * @return {AbstractControl} control The requested form control
   */
  public getControl(name: string, form: FormGroup = this.loginForm): AbstractControl {
    return form.controls[name];
  }


  /**
   * Reset the form to it's initial state
   */
  public resetForm(): void {
    // Loop over all inputs and call their reset method
    for (const input of this.inputComponents.toArray()) {
      input.reset();
    }
  }

}
