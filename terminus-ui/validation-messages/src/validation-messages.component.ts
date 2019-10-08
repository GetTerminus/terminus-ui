import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';

import { TsValidationMessagesService } from './validation-messages.service';


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
 *              [validateOnChange]="true"
 * ></ts-validation-messages>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/validation</example-url>
 */
@Component({
  selector: 'ts-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  host: { class: 'ts-validation-messages' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
