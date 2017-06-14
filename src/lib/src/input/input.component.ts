import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ElementBase } from './../utilities/element-base';

/**
 * A presentational component to render a text input. Extends {@link ElementBase}.
 *
 * @example
 * <ts-input
 *   [(ngModel)]="myModel"
 *   hint="Fill this out!"
 *   required
 *   minlength="3"
 *   label="My Input"
 *   isDisabled="false"
 *   prefixIcon="link"
 *   canClear="true"
 *   initialValue="initial value"
 *   isFocused="false"
 *   hideRequiredMarker="false"
 *   hint="Only letters and numbers"
 * ></ts-input>
 */
@Component({
  selector: 'ts-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TsInputComponent,
      multi: true,
    },
  ],
})
export class TsInputComponent extends ElementBase<string> {
  /**
   * Provide access to the model
   */
  @ViewChild(NgModel) model: NgModel;

  /**
   * Validation messages are hidden until the blur event
   */
  public validationEnabled: boolean = false;

  /**
   * Store validation error messages
   */
  public failures: Observable<Array<string>>;

  /**
   * Define the label
   */
  @Input() label: string;

  /**
   * Define if the input is disabled
   */
  @Input() isDisabled: boolean = false;

  /**
   * Define a Material icon to include before the input
   */
  @Input() prefixIcon: string;

  /**
   * Define a Material icon to include after the input
   */
  @Input() canClear: boolean = false;

  /**
   * Define an initial value for the input
   */
  @Input() initialValue: string;

  /**
   * Define if the input should be focused
   */
  @Input() isFocused: boolean;

  /**
   * Define if a required marker should be included
   */
  @Input() hideRequiredMarker: boolean = true;

  /**
   * Define a hint for the input
   */
  @Input() hint: string;


  /**
   * @hidden
   */
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }


  /**
   * Clear the input's value
   */
  clearInput(): void {
    this.value = '';
  }


  /**
   * Enable the validation messages for the input
   */
  enableValidation(): void {
    this.validationEnabled = true;
  }

}
