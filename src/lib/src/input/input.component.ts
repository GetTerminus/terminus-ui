import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { controlHasRequiredField } from '@terminus/ngx-tools';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsInputTypes, TsInputAutocompleteTypes } from './../utilities/types/input.types';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsInputComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * A presentational component to render a text input.
 *
 * #### QA CSS CLASSES
 * - `qa-input`: The container element
 * - `qa-input-text`: The input element
 * - `qa-input-prefix-icon`: The icon element for the prefix icon, if one is set
 * - `qa-input-suffix-icon`: The icon element for the clickable "clear" icon, if this control is
 * clearable
 * - `qa-input-hint`: The hint element, if hint content is provided
 * - `qa-input-validation-messages`: The {@link TsValidationMessagesComponent} which will contain
 * any validation messages
 *
 * @example
 * <ts-input
 *              [formControl]="myForm.get('myControl')"
 *              required
 *              minlength="3"
 *              maxlength="8"
 *              hint="Fill this out!"
 *              label="My Input"
 *              name="'password'"
 *              prefixIcon="'icon_name'"
 *              type="text"
 *              isDisabled="false"
 *              isRequired="false"
 *              hideRequiredMarker="false"
 *              isClearable="true"
 *              isFocused="false"
 *              autocomplete="false"
 *              autocorrect="false"
 *              autocapitalize="false"
 *              spellcheck="false"
 *              validateOnChange="false"
 *              tabIndex="2"
 *              (cleared)="doSomething($event)"
 * ></ts-input>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'ts-input',
  },
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsInput',
})
export class TsInputComponent extends TsReactiveFormBaseComponent {
  /**
   * Determine the correct required attribute content
   *
   * @return The required attribute value
   */
  get requiredAttribute(): string | null {
    const requiredFormControl = (this.formControl && controlHasRequiredField(this.formControl));
    return (requiredFormControl || this.isRequired) ? 'required' : null;
  }

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
  public isFocused: boolean = false;

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
  @Input()
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
   * Define the tabindex for the input
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the input type (text, password etc.) See {@link TsInputTypes}
   */
  @Input()
  public type: TsInputTypes = 'text';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange: boolean = false;

  /**
   * The event to emit when the input value is cleared
   */
  @Output()
  cleared: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }


  /**
   * Clear the input's value
   */
  public reset(): void {
    this.value = null;
    this.cleared.emit(true);
    this.changeDetectorRef.markForCheck();
  }

}
