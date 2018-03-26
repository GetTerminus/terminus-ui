import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnInit,
  isDevMode,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { isFunction } from '@terminus/ngx-tools';

import { TsStyleThemeTypes } from './../utilities/types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Define the allowed keys for an item passed to the {@link TsRadioComponent}
 */
export interface TsRadioOption {
  [key: string]: any;

  /**
   * Define if the item is selected by default
   */
  // TODO: can this be done with formControl value?
  checked?: boolean;

  /**
   * Define if the item is disabled
   */
  disabled?: boolean;

  /**
   * Define if the item is required
   */
  // TODO: can this be done with formControl has required field?
  required?: boolean;
}


/**
 * Expose the MatRadioChange event as TsRadioChange
 */
export class TsRadioChange extends MatRadioChange {}

// TODO
export type TsRadioFormatFn = (v: any) => string;



/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via the base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsRadioGroupComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * This is the radio UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-radio-group`: The primary container
 * - `qa-radio-control`: An individual radio control
 * - `qa-radio-validation-messages`: The validation messages container
 *
 * @example
 * <ts-radio-group
 *              options="myItemsArray | $async"
 *              theme="primary"
 *              [formControl]="myForm.get('myRadioGroup')"
 *              (change)="doSomething($event)"
 * ></ts-radio-group>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: {
    class: 'ts-radio-group',
  },
  exportAs: 'tsRadioGroup',
  providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsRadioGroupComponent extends TsReactiveFormBaseComponent implements OnInit {
  /**
   * Define a function to retrieve the UI value for an option
   */
  @Input()
  public set formatUILabelFn(value: TsRadioFormatFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._formatUILabelFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsRadioGroupComponent: 'formatUILabelFn' must be passed a 'TsRadioFormatFn'.`);
      }
    }
  }
  public get formatUILabelFn(): TsRadioFormatFn {
    return this._formatUILabelFn;
  }
  private _formatUILabelFn: TsRadioFormatFn;

  /**
   * Define a function to retrieve the UI value for an option
   */
  @Input()
  public set formatUISubLabelFn(value: TsRadioFormatFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._formatUISubLabelFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsRadioGroupComponent: 'formatUISubLabelFn' must be passed a 'TsRadioFormatFn'.`);
      }
    }
  }
  public get formatUISubLabelFn(): TsRadioFormatFn {
    return this._formatUISubLabelFn;
  }
  private _formatUISubLabelFn: TsRadioFormatFn;

  /**
   * Define a function to retrieve the UI value for an option
   */
  @Input()
  public set formatModelValueFn(value: TsRadioFormatFn) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this._formatModelValueFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsRadioGroupComponent: 'formatModelValueFn' must be passed a 'TsRadioFormatFn'.`);
      }
    }
  }
  public get formatModelValueFn(): TsRadioFormatFn {
    return this._formatModelValueFn;
  }
  private _formatModelValueFn: TsRadioFormatFn;

  /**
   * Accept an array of radio options in the {@link TsRadioOption} format
   */
  @Input()
  public options: TsRadioOption[];

  /**
   * Define the theme. {@link TsStyleThemeTypes}
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit event when a selection occurs. {@link TsRadioChange}
   */
  @Output()
  public change: EventEmitter<TsRadioChange> = new EventEmitter();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }


  /**
   * Seed the initial value with the first checked option found
   */
  public ngOnInit(): void {
    const initialSelection = this.defaultSelection(this.options);

    if (initialSelection) {
      this.value = initialSelection;

      // istanbul ignore else
      if (this.formControl) {
        this.formControl.setValue(initialSelection);
      }

      // Tell Angular that we have updated the component internally
      this.changeDetectorRef.markForCheck();
    }
  }


  /**
   * Retrieve a value determined by the passed in formatter
   *
   * @param option - The radio option
   * @param formatter - The formatter function used to retrieve the value
   * @return The retrieved value
   */
  public retrieveValue(option: any, formatter: TsRadioFormatFn): any {
    return (formatter && formatter(option)) ? formatter(option) : option;
  }


  /**
   * Return an option that should be checked by default
   *
   * If multiple items are marked as 'checked' by default, the first on found will win.
   *
   * @param options - The array of options
   * @return The selected value
   */
  private defaultSelection(options: TsRadioOption[]): string | null {
    const found = options.filter((v: TsRadioOption) => {
      return v.checked;
    });

    return (found && found[0] && found[0].value) ? found[0].value : null;
  }

}
