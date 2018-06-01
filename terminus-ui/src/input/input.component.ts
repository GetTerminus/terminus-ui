import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import {
  hasRequiredControl,
  inputHasChanged,
} from '@terminus/ngx-tools';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Define the allowed {@link TsInputComponent} input types
 */
export type TsInputTypes =
  'text'
  | 'password'
  | 'email'
  | 'hidden'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
;

/**
 * Define the allowed autocomplete variations for {@link TsInputComponent}
 *
 * NOTE: This is not all valid types; only the ones this library supports.
 */
export type TsInputAutocompleteTypes =
  'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'tel'
;


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
 *              autocapitalize="false"
 *              autocomplete="false"
 *              autocorrect="false"
 *              [formControl]="myForm.get('myControl')"
 *              hideRequiredMarker="false"
 *              hint="Fill this out!"
 *              isClearable="true"
 *              isDisabled="false"
 *              isFocused="false"
 *              isRequired="false"
 *              label="My Input"
 *              maxlength="8"
 *              minlength="3"
 *              name="'password'"
 *              prefixIcon="icon_name"
 *              spellcheck="false"
 *              tabIndex="2"
 *              type="text"
 *              validateOnChange="false"
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
export class TsInputComponent extends TsReactiveFormBaseComponent implements OnChanges {
  /**
   * Determine the correct required attribute content
   *
   * @return The required attribute value
   */
  get requiredAttribute(): string | null {
    const requiredFormControl = (this.formControl && hasRequiredControl(this.formControl));
    return (requiredFormControl || this.isRequired) ? 'required' : null;
  }

  /**
   * Access the underlying MatInput instance
   */
  @ViewChild(MatInput)
  matInput!: MatInput;

  /**
   * Define if the input should autocapitalize
   * (standard HTML5 property)
   */
  @Input()
  public autocapitalize: boolean = true;

  /**
   * Define if the input should autocomplete. See {@link TsInputAutocompleteTypes}.
   */
  @Input()
  public autocomplete: TsInputAutocompleteTypes = 'on';

  /**
   * Define if the input should surface the ability to clear it's value
   */
  @Input()
  public isClearable: boolean = false;

  /**
   * Define if the input should be disabled
   */
  @Input()
  public set isDisabled(v: boolean) {
    v = coerceBooleanProperty(v);
    const action: string = v ? 'disable' : 'enable';

    this._isDisabled = v;

    // istanbul ignore else
    if (this.matInput && this.matInput.ngControl && this.matInput.ngControl.control) {
      this.matInput.ngControl.control[action]();
    }
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled: boolean = false;

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
  public hint: string | undefined;

  /**
   * Define the label
   */
  @Input()
  public label: string | undefined;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string | undefined;

  /**
   * Define a Material icon to include before the input
   */
  @Input()
  public prefixIcon: string | undefined;

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
  public set type(value: TsInputTypes) {
    if (!value) {
      return;
    }

    this._type = value;

    if (value === 'email') {
      this.autocomplete = 'email';
    }
  }
  public get type(): TsInputTypes {
    return this._type;
  }
  private _type: TsInputTypes = 'text';

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
   * Update the inner value when the formControl value is updated
   *
   * @param value - The value to set
   */
  public updateInnerValue = (value: string): void => {
    this.value = value;
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Register our change function any time the formControl is changed
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // istanbul ignore else
    if (inputHasChanged(changes, 'formControl')) {
      this.registerOnChangeFn(this.updateInnerValue);
    }
  }


  /**
   * Clear the input's value
   */
  public reset(): void {
    this.value = null;
    this.cleared.emit(true);
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Register our custom onChange function
   *
   * @param fn - The onChange function
   */
  private registerOnChangeFn(fn: Function): void {
    // istanbul ignore else
    if (this.formControl) {
      this.formControl.registerOnChange(fn);
    }
  }

}
