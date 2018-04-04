import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  isDevMode,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  coerceBooleanProperty,
  coerceArray,
} from '@terminus/ngx-tools/coercion';
import {
  isFunction,
  isObject,
  hasRequiredControl,
} from '@terminus/ngx-tools';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Expose the formatter function type
 */
export type TsSelectFormatFn = (v: any) => string;


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsSelectComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * A component to create a select menu
 *
 * #### QA CSS CLASSES
 * - `qa-select`: Placed on the select element which contains this component
 * - `qa-select-option`: Placed on the option element which represents each option in the select box
 *
 * @example
 * <ts-select
 *              [formControl]="myForm.get('email')"
 *              blankChoice="Please choose one."
 *              label="Please select one: "
 *              items="[{[key]: value},{},{}]"
 *              multipleAllowed="true"
 *              theme="primary"
 *              isDisabled="true"
 *              [formatUIFn]="myUIFormatter"
 *              [formatModelValueFn]="myModelFormatter"
 *              (open)="myMethod($event)"
 *              (close)="myMethod($event)"
 *              (change)="myMethod($event)"
 * ></ts-select>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'ts-select',
  },
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelect',
})
export class TsSelectComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the content for a blank option (no content means no options will show)
   * NOTE: This is disabled if `multipleAllowed` is true
   */
  @Input()
  public blankChoice: string;

  /**
   * Define a function to retrieve the UI value for an option {@link TsSelectFormatFn}
   */
  @Input()
  public set formatUIFn(value: TsSelectFormatFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._formatUIFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsSelectComponent: 'formatUIFn' must be passed a 'TsSelectFormatFn'.`);
      }
    }
  }
  public get formatUIFn(): TsSelectFormatFn {
    return this._formatUIFn;
  }
  private _formatUIFn: TsSelectFormatFn;

  /**
   * Define a function to retrieve the UI value for an option {@link TsSelectFormatFn}
   */
  @Input()
  public set formatModelValueFn(value: TsSelectFormatFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._formatModelValueFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsSelectComponent: 'formatModelValueFn' must be passed a 'TsSelectFormatFn'.`);
      }
    }
  }
  public get formatModelValueFn(): TsSelectFormatFn {
    return this._formatModelValueFn;
  }
  private _formatModelValueFn: TsSelectFormatFn;

  /**
   * Define the 'hint' for the select
   */
  @Input()
  public hint: string;

  /**
   * Define a list of select items
   */
  @Input()
  public set items(value: any[]) {
    value = coerceArray(value);

    this._items = value;

    // If the array contains objects but no formatter function was passed in:
    // istanbul ignore else
    if (value[0] && isObject(value[0]) && !isFunction(this.formatModelValueFn) && isDevMode()) {
      throw Error(`TsSelectComponent: 'formatModelValueFn' must be passed a 'TsSelectFormatFn'
                   if 'items' is an array of objects.`);
    }
  }
  public get items(): any[] {
    return this._items;
  }
  private _items: any[];

  /**
   * Define if the select should be disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define the label for the menu
   */
  @Input()
  public label: string = '';

  /**
   * Define if multiple selections are allowed
   */
  @Input()
  public multipleAllowed: boolean = false;

  /**
   * Define the color theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit event when the select has been opened
   */
  @Output()
  public openedChange: EventEmitter<boolean> = new EventEmitter();

  /**
   * Emit event when the select value is changed
   */
  @Output()
  public selectionChange: EventEmitter<any[]> = new EventEmitter();


  /**
   * Mark the form control as touched when closed without a selection
   *
   * @param open - The value representing if the select is open or closed
   */
  public checkOpenChange(open: boolean): void {
    const isOpen = coerceBooleanProperty(open);

    // If the panel has been closed and only allows a single selection
    if (!isOpen) {
      // And we have a form control
      // istanbul ignore else
      if (this.formControl && this.formControl.markAsTouched) {
        this.formControl.markAsTouched();
      }
    }

    // Alert consumers
    this.openedChange.emit(isOpen);
  }


  /**
   * Retrieve a value determined by the passed in formatter
   *
   * @param option - The select option
   * @param formatter - The formatter function used to retrieve the value
   * @return The retrieved value
   */
  public retrieveValue(option: any, formatter?: TsSelectFormatFn): any {
    return (formatter && formatter(option)) ? formatter(option) : option;
  }


  /**
   * Getter to determine if the group is required
   *
   * @return A boolean representing if the form control is required
   */
  get isRequired(): boolean {
    return hasRequiredControl(this.formControl);
  }

}
