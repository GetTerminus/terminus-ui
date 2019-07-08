import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsCheckboxComponent } from '@terminus/ui/checkbox';
import { TsInputComponent } from '@terminus/ui/input';
import { TsValidatorsService } from '@terminus/ui/validators';


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
 *              [triggerFormReset]="myBoolean"
 *              [loginCTA]=" 'Sign In' "
 *              [forgotPasswordText]=" 'Forget something?' "
 *              (submission)="myMethod($event)"
 * ></ts-login-form>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/login-form</example-url>
 */
@Component({
  selector: 'ts-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  host: {class: 'ts-login-form'},
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Initialize the login form
   */
  public loginForm: FormGroup | undefined = this.formBuilder.group(this.FORM_GROUP);

  /**
   * Define a flag to add/remove the form from the DOM
   */
  public showForm = true;

  /**
   * Access the email form control
   */
  public get emailControl(): AbstractControl | null {
    const form = this.loginForm;
    return form ? form.get('email') : null;
  }

  /**
   * Access the password form control
   */
  public get passwordControl(): AbstractControl | null {
    const form = this.loginForm;
    return form ? form.get('password') : null;
  }

  /**
   * Access the rememberMe form control
   */
  public get rememberMeControl(): AbstractControl | null {
    const form = this.loginForm;
    return form ? form.get('rememberMe') : null;
  }

  /**
   * Provide access to the text inputs
   */
  @ViewChildren(TsInputComponent)
  public inputComponents!: QueryList<TsInputComponent>;

  /**
   * Provide access to the checkbox inputs
   */
  @ViewChild(TsCheckboxComponent, {static: true})
  public checkbox!: TsCheckboxComponent;

  /**
   * Define the link to the 'forgot password' view
   */
  @Input()
  public forgotPasswordLink: string[] = ['/forgot'];

  /**
   * Define the text for the 'forgot password' link
   */
  @Input()
  public forgotPasswordText = 'Forgot your password?';

  /**
   * Define if the form button is showing progress
   */
  @Input()
  public inProgress = false;

  /**
   * Define if the user has successfully logged in and is being redirected
   */
  @Input()
  public isRedirecting = false;

  /**
   * Define the login call to action
   */
  @Input()
  public loginCTA = 'Log In';

  /**
   * Allow a consumer to reset the form via an input
   */
  @Input()
  public triggerFormReset = false;

  /**
   * Emit an event on form submission
   */
  // TODO: Rename to avoid conflict with native events: https://github.com/GetTerminus/terminus-ui/issues/1469
  /**
   * @deprecated Use 'submission' instead
   */
  // tslint:disable-next-line: no-output-native
  @Output()
  public readonly submit: EventEmitter<TsLoginFormResponse> = new EventEmitter();

  /**
   * Emit an event on form submission
   */
  // tslint:disable-next-line: no-output-native
  @Output()
  public readonly submission: EventEmitter<TsLoginFormResponse> = new EventEmitter();


  /**
   * Inject services
   */
  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
    private changeDetectorRef: ChangeDetectorRef,
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
   * HACK: This is a hack. Currently there doesn't seem to be a good way to reset the form value and
   * validations without simply re-initializing the form each time.
   */
  private resetForm(): void {
    // Destroy the form
    this.showForm = false;

    // Clear out the form
    // HACK: This is a hack around Angular to fully reset the form.
    this.loginForm = undefined;

    // Re-initialize the form
    this.loginForm = this.formBuilder.group(this.FORM_GROUP);

    // This timeout lets one change detection cycle pass so that the form is actually removed from
    // the DOM
    Promise.resolve().then(() => {
      // Add the form back to the DOM
      this.showForm = true;
      this.changeDetectorRef.detectChanges();
    });
  }

}
