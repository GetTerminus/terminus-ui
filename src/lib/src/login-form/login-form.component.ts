import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  QueryList,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { TsInputComponent } from './../input/input.component';
import { TsCheckboxComponent } from './../checkbox/checkbox.component';
import { validateEmail } from './../utilities/validators/email.validator';


/**
 * Define the form group for re-use
 */
const FORM_GROUP = {
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
};


/**
 * This is the login-form UI Component
 *
 * @example
 * <ts-login-form
 *              [inProgress]="true"
 *              forgotPasswordLink="path/to/password/reset"
 *              [resetForm]="myBoolean"
 *              (submit)="myMethod($event)"
 * ></ts-login-form>
 */
@Component({
  selector: 'ts-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class TsLoginFormComponent implements OnChanges {
  /**
   * Define the minimum length for a password
   */
  public PASSWORD_MINLENGTH: number = 8;

  /**
   * Define the text for the 'forgot password' link
   */
  public forgotPasswordText: string = 'Forgot your password?';

  /**
   * Define the login call to action
   */
  public loginCta: string = `Log In`;

  /**
   * Initialize the login form
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
   * Define a flag to add/remove the form from the DOM
   */
  public showForm: boolean = true;

  /**
   * Provide access to the text inputs
   */
  @ViewChildren(TsInputComponent)
  private inputComponents: QueryList<TsInputComponent>;

  /**
   * Provide access to the checkbox inputs
   */
  @ViewChild(TsCheckboxComponent)
  private checkbox: TsCheckboxComponent;

  /**
   * Define the link to the 'forgot password' view
   */
  @Input()
  public forgotPasswordLink: string = '/forgot';

  /**
   * Define if the form button is showing progress
   */
  @Input()
  public inProgress: Boolean = false;

  /**
   * Allow a consumer to reset the form via an input
   */
  @Input()
  private resetForm: boolean = false;

  /**
   * Emit an event on form submission
   */
  @Output()
  public submit: EventEmitter<any> = new EventEmitter;


  /**
   * @private
   */
  constructor(
    private formBuilder: FormBuilder,
  ) {}


  /**
   * Trigger a form reset if `resetForm` is changed to TRUE
   * (explanation at `_resetForm` method)
   *
   * @param {Object} changes The inputs that have changed
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('resetForm') && changes.resetForm.currentValue) {
      this._resetForm();
    }
  }

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
   * Reset the form
   *
   * This is a hack. Currently there doesn't seem to be a good way to reset the form value and
   * validations without simply re-initializing the form each time.
   *
   * NOTE: The `showForm` value is a 'hack' to reset the input validation styles by removing the
   * form from the dom and re-adding it. This method won't break if the Material team changes any
   * validation classes but it may be more performant to simply remove the classes.
   */
  private _resetForm() {
    // Destroy the form
    this.showForm = false;

    // Clear out the form
    this.loginForm = null;

    // Re-initialize the form
    this.loginForm = this.formBuilder.group(FORM_GROUP);

    // This timeout let's one change detection cycle pass so that the form is actually removed from
    // the DOM
    setTimeout(() => {
      // Add the form back to the DOM
      this.showForm = true;
    });
  }

}
