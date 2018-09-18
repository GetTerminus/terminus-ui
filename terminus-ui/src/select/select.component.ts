import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  hasRequiredControl,
  isFunction,
  isObject,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';

import { ControlValueAccessorProviderFactory } from './../utilities/cva-provider-factory/cva-provider-factory';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Expose the formatter function type
 */
export type TsSelectFormatFn = (v: any) => string;


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
 *              (openedChange)="myMethod($event)"
 *              (selectionChange)="myMethod($event)"
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
  providers: [ControlValueAccessorProviderFactory(TsSelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelect',
})
export class TsSelectComponent extends TsReactiveFormBaseComponent implements OnInit, OnDestroy {
  /**
   * Define the content for a blank option (no content means no options will show)
   * NOTE: This is disabled if `multipleAllowed` is true
   */
  @Input()
  public blankChoice: string | undefined;

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
  private _formatUIFn!: TsSelectFormatFn;

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
  private _formatModelValueFn!: TsSelectFormatFn;

  /**
   * Define the field appearance.
   *
   * NOTE: Only needed for the TsPaginator select. It should _always_ be the same for all other
   * use-cases.
   */
  @Input()
  public formFieldAppearance: 'legacy' | 'outline' = 'outline';

  /**
   * Define the 'hint' for the select
   */
  @Input()
  public hint: string | undefined;

  /**
   * Define a list of select items
   */
  @Input()
  public set items(value: any[]) {
    if (!value) {
      return;
    }

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
  private _items!: any[];

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


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }


  /**
   * Trigger change detection when the underlying form changes
   */
  public ngOnInit(): void {
    // istanbul ignore else
    if (this.formControl) {
      this.formControl.valueChanges.pipe(
        untilComponentDestroyed(this),
      ).subscribe((v) => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }


  /**
   * Needed for `untilComponentDestroyed`
   */
  public ngOnDestroy() {}


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
