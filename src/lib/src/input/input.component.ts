import {
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsInputTypes, TsInputAutocompleteTypes } from './../utilities/types/input.types';


/**
 * @private Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via our base class
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsInputComponent),
  multi: true
};


/**
 * A presentational component to render a text input.
 *
 * #### QA CSS CLASSES
 * - `qa-input`: Placed on the div element which contains this component
 * - `qa-input-text`: Placed on the input element
 * - `qa-input-prefix-icon`: Placed on the icon element for the prefix icon, if one is set
 * - `qa-input-suffix-icon`: Placed on the icon element for the clickable "clear" icon, if this
 * control is clearable
 * - `qa-input-hint`: Placed on the hint element, if hint content is provided
 * - `qa-input-validation-messages`: Placed on the {@link TsValidationMessagesComponent} which will
 * contain any validation messages
 *
 * @example
 * <ts-input
 *              formControlName="email"
 *              [formControl]="yourHelperToGetFormControl('email')"
 *              required
 *              minlength="3"
 *              [hint]="'Fill this out!'"
 *              [label]="'My Input'"
 *              [name]="'password'"
 *              [prefixIcon]="'icon_name'"
 *              [type]="'text'"
 *              [isDisabled]="false"
 *              [isRequired]="false"
 *              [hideRequiredMarker]="false"
 *              [isClearable]="true"
 *              [isFocused]="false"
 *              [autocomplete]="false"
 *              [autocorrect]="false"
 *              [autocapitalize]="false"
 *              [spellcheck]="false"
 * ></ts-input>
 */
@Component({
  selector: 'ts-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class TsInputComponent extends TsReactiveFormBaseComponent {
  /**
   * Define if the input should autocapitalize
   * (standard HTML5 property)
   */
  @Input()
  public autocapitalize: boolean = true;

  /**
   * Define if the input should autocomplete
   */
  @Input()
  public autocomplete: TsInputAutocompleteTypes = 'on';

  /**
   * Define if the input should surface the ability to clear it's value
   */
  @Input()
  public isClearable: boolean = false;

  /**
   * Define if the input should be focused
   */
  @Input()
  public isFocused: boolean;

  /**
   * Define if the input is required
   */
  @Input()
  public isRequired: boolean = false;

  /**
   * Define if a required marker should be included
   */
  @Input()
  public hideRequiredMarker: boolean = false;

  /**
   * Define a hint for the input
   */
  // FIXME: Fix potential overlap of hint and error messages
  @Input()
  public hint: string;

  /**
   * Define the label
   */
  @Input()
  public label: string;

  /**
   * Define the name attribute value
   */
  @Input('name')
  public name: string;

  /**
   * Define a Material icon to include before the input
   */
  @Input()
  public prefixIcon: string;

  /**
   * Define if the input should spellcheck
   * (standard HTML5 property)
   */
  @Input()
  public spellcheck: boolean = true;

  /**
   * Define the input type (text, password etc.) See {@link TsInputTypes}
   */
  @Input('type')
  public type: TsInputTypes = 'text';


  /**
   * Clear the input's value
   */
  public reset(): void {
    this.value = '';
  }

}
