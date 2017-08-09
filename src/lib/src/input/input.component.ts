import {
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Custom control value accessor for our component
 *
 */
// FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
// a base class that others can extend? (Not sure how to pass in a named component like below)
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsInputComponent),
  multi: true
};


/**
 * A presentational component to render a text input.
 *
 * Why we are not masking passwords:
 *   - https://www.nngroup.com/articles/stop-password-masking/
 *   - https://www.lukew.com/ff/entry.asp?1653
 *
 * @example
 * <ts-input
 *              formControlName="email"
 *              [formControl]="yourHelperToGetFormControl('email')"
 *              hint="Fill this out!"
 *              required
 *              minlength="3"
 *              label="My Input"
 *              isDisabled="false"
 *              isRequired="false"
 *              hideRequiredMarker="false"
 *              prefixIcon="link"
 *              isClearable="true"
 *              isFocused="false"
 *              autocomplete="off"
 *              autocorrect="off"
 *              autocapitalize="off"
 *              spellcheck="false"
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
  @Input() autocapitalize: boolean = true;

  /**
   * Define if the input should autocomplete
   * (standard HTML5 property)
   */
  @Input() autocomplete: boolean = true;

  /**
   * Define a Material icon to include after the input
   */
  @Input() isClearable: boolean = false;

  /**
   * Define if the input should be focused
   */
  @Input() isFocused: boolean;

  /**
   * Define if the input is required
   */
  @Input() isRequired: boolean = false;

  /**
   * Define if a required marker should be included
   */
  @Input() hideRequiredMarker: boolean = false;

  /**
   * Define a hint for the input
   */
  // TODO: Fix potential overlap of hint and error messages
  @Input() hint: string;

  /**
   * Define the label
   */
  @Input() label: string;

  /**
   * Define a Material icon to include before the input
   */
  @Input() prefixIcon: string;

  /**
   * Define if the input should spellcheck
   * (standard HTML5 property)
   */
  @Input() spellcheck: boolean = true;


  /**
   * Clear the input's value
   */
  reset(): void {
    this.value = '';
  }

}
