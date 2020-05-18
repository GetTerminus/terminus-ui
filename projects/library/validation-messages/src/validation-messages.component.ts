import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl, ValidationErrors,
} from '@angular/forms';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';

import { TsValidationMessagesService } from './validation-messages.service';

/**
 * A function that returns an error message based on params
 */
export type TsValidationMessageFactory = (controlName: string, errors: ValidationErrors) => string | null;

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A presentational component to render validation messages
 * NOTE: ChangeDetectionStrategy.OnPush is disabled here because it affects control getting to this service on the first change cycle.
 *
 * @example
 * <ts-validation-messages
 *              [control]="myForm.get('controlName')"
 *              id="my-id"
 *              [validateOnChange]="true"
 *              [validateImmediately]="false"
 * ></ts-validation-messages>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/validation</example-url>
 */
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'ts-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  host: { class: 'ts-validation-messages' },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsValidationMessages',
})
export class TsValidationMessagesComponent implements OnDestroy {
  /**
   * Define the default component ID
   */
  protected uid = `ts-validation-messages-${nextUniqueId++}`;

  /**
   * Define the error message
   *
   * @returns The error message or null if no error
   */
  public get validationMessage(): string | null | undefined {
    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {
        // istanbul ignore else
        if (propertyName) {
          // Only show after 'touched' if we are NOT validating on every change
          const immediatelyOrOnChange = this.validateImmediately || this.validateOnChange;
          // istanbul ignore else
          if (immediatelyOrOnChange || (!this.validateOnChange && this.control.touched)) {
            const errors = this.control.errors[propertyName] as ValidationErrors;

            if (this.messagesFactory) {
              return this.messagesFactory(propertyName, errors);
            }
            return this.validationMessageService.getValidatorErrorMessage(propertyName, errors);
          }
        }
      }
    }
    return null;
  }

  /**
   * Define the associated form control
   *
   * @param value
   */
  @Input()
  public set control(value: FormControl | undefined) {
    this._control = value;

    // Trigger change detection if the underlying control's status changes
    // istanbul ignore else
    if (this.control && this.control.statusChanges) {
      this.control.statusChanges.pipe(untilComponentDestroyed(this)).subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }
  public get control(): FormControl | undefined {
    return this._control;
  }
  private _control: FormControl | undefined;

  /**
   * Define an ID for the component
   *
   * @param value
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
   * Define an optional message factory
   */
  @Input()
  public messagesFactory: TsValidationMessageFactory | undefined;

  /**
   * Define if validation should occur on blur or immediately
   */
  @Input()
  public validateOnChange = false;

  /**
   * Define if the validation should be immediate
   */
  @Input()
  public validateImmediately = false;


  constructor(
    private validationMessageService: TsValidationMessagesService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}
}
