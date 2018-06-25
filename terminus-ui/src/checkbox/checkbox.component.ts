import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  MatCheckbox,
  MatCheckboxChange,
} from '@angular/material/checkbox';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';


/**
 * Expose the MatCheckboxChange event as TsCheckboxChange. Used by {@link TsCheckboxComponent}
 */
export class TsCheckboxChange extends MatCheckboxChange {}


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via the base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsCheckboxComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * This is the checkbox UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-checkbox`: The checkbox input element
 *
 * @example
 * <ts-checkbox
 *              [formControl]="yourHelperToGetFormControl('rememberMe')"
 *              isChecked="true"
 *              isDisabled="false"
 *              isIndeterminate="false"
 *              isRequired="false"
 *              (inputChange)="myMethod($event)"
 *              (indeterminateChange)="myMethod($event)"
 * ></ts-checkbox>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'ts-checkbox',
  },
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCheckbox',
})
export class TsCheckboxComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-checkbox-${nextUniqueId++}`;

  /**
   * Provide access to the MatCheckboxComponent
   */
  @ViewChild(MatCheckbox)
  checkbox!: MatCheckbox;

  /**
   * Define an ID for the component
   */
  @Input()
  set id(value: string) {
    this._id = value || this._uid;
  }
  get id(): string {
    return this._id;
  }
  protected _id: string = this._uid;

  /**
   * Toggle the underlying checkbox if the isChecked property changes
   */
  @Input()
  public set isChecked(v: boolean) {
    this._isChecked = coerceBooleanProperty(v);
    this.value = this._isChecked;
    this.checkbox.checked = this._isChecked;
    this.changeDetectorRef.detectChanges();
  }
  public get isChecked(): boolean {
    return this._isChecked;
  }
  private _isChecked: boolean = false;

  /**
   * Define if the checkbox is disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the checkbox should be indeterminate
   */
  @Input()
  public isIndeterminate: boolean = false;

  /**
   * Define if the checkbox is required
   */
  @Input()
  public isRequired: boolean = false;

  /**
   * Toggle the underlying checkbox if the ngModel changes
   */
  @Input()
  public set ngModel(v: boolean) {
    this._isChecked = v;
  }

  /**
   * Define the tabindex
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event on input change
   */
  @Output()
  public inputChange: EventEmitter<boolean> = new EventEmitter;

  /**
   * Emit a change when moving from the indeterminate state
   */
  @Output()
  public indeterminateChange: EventEmitter<TsCheckboxChange> = new EventEmitter;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

}
