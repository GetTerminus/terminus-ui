import {
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsInputComponent } from '@terminus/ui/input';
import { TsCheckboxComponent } from '@terminus/ui/checkbox';
import { TsValidatorsService } from '@terminus/ui/validators';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { isBoolean } from '@terminus/ngx-tools';


/**
 * Define the structure of the login form response
 */
export interface TsLoginFormResponse {
  /**
   * User's email
   */
  email: string;

  /**
   * User's password
   */
  password: string;

  /**
   * Flag determining if a cookie should be set
   */
  rememberMe: boolean;
}


/**
 * This is the login-form UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-login-form`: Placed on the form element which contains this component
 * - `qa-login-form-email`: Placed on the {@link TsInputComponent} used for the "email" field
 * - `qa-login-form-password`: Placed on the {@link TsInputComponent} used for the "password" field
 * - `qa-login-form-remember-me`: Placed on the {@link TsCheckboxComponent} used for the "remember
 * me" checkbox
 * - `qa-login-form-forgot-password`: Placed on the {@link TsLinkComponent} used for the "forgot
 * password" link
 * - `qa-login-form-submit`: Placed on the {@link TsButtonComponent} used for the submit button
 *
 * @example
 * <ts-login-form
 *              [inProgress]="true"
 *              [forgotPasswordLink]="['my/', 'path']"
 *              [resetForm]="myBoolean"
 *              [loginCTA]=" 'Sign In' "
 *              [forgotPasswordText]=" 'Forget something?' "
 *              (submit)="myMethod($event)"
 * ></ts-login-form>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/login-form</example-url>
 */
@Component({
  selector: 'ts-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  host: {
    class: 'ts-login-form',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsLoginForm',
})
export class TsLoginFormComponent implements OnChanges {
  /**
   * Define the form group for re-use
   */
  private FORM_GROUP = {
    email: [
      null,
      [
        Validators.required,
        this.validatorsService.email(),
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
   * Define the minimum length for a password
   */
  public PASSWORD_MINLENGTH: number = 8;

  /**
   * Initialize the login form
   */
  public loginForm: FormGroup = this.formBuilder.group(this.FORM_GROUP);

  /**
   * Define a flag to add/remove the form from the DOM
   */
  public showForm = true;

  /**
   * Provide access to the text inputs
   */
  @ViewChildren(TsInputComponent)
  inputComponents!: QueryList<TsInputComponent>;

  /**
   * Provide access to the checkbox inputs
   */
  @ViewChild(TsCheckboxComponent)
  checkbox!: TsCheckboxComponent;

  /**
   * Define the link to the 'forgot password' view
   */
  @Input()
  public forgotPasswordLink: string[] = ['/forgot'];

  /**
   * Define the text for the 'forgot password' link
   */
  @Input()
  public forgotPasswordText: string = 'Forgot your password?';

  /**
   * Define if the form button is showing progress
   */
  @Input()
  public set inProgress(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsLoginFormComponent: "inProgress" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._inProgress = coerceBooleanProperty(value);
  }
  public get inProgress(): boolean {
    return this._inProgress;
  }
  private _inProgress = false;

  /**
   * Define if the user has successfully logged in and is being redirected
   */
  @Input()
  public set isRedirecting(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsLoginFormComponent: "isRedirecting" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isRedirecting = coerceBooleanProperty(value);
  }
  public get isRedirecting(): boolean {
    return this._isRedirecting;
  }
  private _isRedirecting = false;

  /**
   * Define the login call to action
   */
  @Input()
  public loginCTA: string = 'Log In';

  /**
   * Allow a consumer to reset the form via an input
   */
  @Input()
  public set triggerFormReset(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsLoginFormComponent: "triggerFormReset" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._triggerFormReset = coerceBooleanProperty(value);
  }
  public get triggerFormReset(): boolean {
    return this._triggerFormReset;
  }
  private _triggerFormReset = false;

  /**
   * Emit an event on form submission
   */
  @Output()
  public submit: EventEmitter<TsLoginFormResponse> = new EventEmitter;


  /**
   * Inject services
   */
  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  /**
   * Trigger a form reset if `triggerFormReset` is changed to TRUE
   * (explanation at `resetForm` method)
   *
   * @param changes - The inputs that have changed
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('triggerFormReset')) {
      this.resetForm();
    }
  }


  /**
   * Reset the form
   *
   * This is a hack. Currently there doesn't seem to be a good way to reset the form value and
   * validations without simply re-initializing the form each time.
   *
   * HACK: The `showForm` value is a 'hack' to reset the input validation styles by removing the
   * form from the dom and re-adding it. This method won't break if the Material team changes any
   * validation classes but it may be more performant to simply remove the classes.
   */
  private resetForm(): void {
    // Destroy the form
    this.showForm = false;

    // Clear out the form
    // HACK: This is a hack around Angular to fully reset the form.
    this.loginForm = undefined as any;

    // Re-initialize the form
    this.loginForm = this.formBuilder.group(this.FORM_GROUP);

    // This timeout lets one change detection cycle pass so that the form is actually removed from
    // the DOM
    setTimeout(() => {
      // Add the form back to the DOM
      this.showForm = true;
    });
  }

}
