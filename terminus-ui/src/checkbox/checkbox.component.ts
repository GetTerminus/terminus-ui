import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatCheckbox,
  MatCheckboxChange,
} from '@angular/material/checkbox';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { ControlValueAccessorProviderFactory } from './../utilities/cva-provider-factory/cva-provider-factory';
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
  providers: [ControlValueAccessorProviderFactory(TsCheckboxComponent)],
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
  public set id(value: string) {
    this._id = value || this._uid;
  }
  public get id(): string {
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
  private _isChecked = false;

  /**
   * Define if the checkbox is disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define if the checkbox should be indeterminate
   */
  @Input()
  public set isIndeterminate(value: boolean) {
    this._isIndeterminate = coerceBooleanProperty(value);
  }
  public get isIndeterminate(): boolean {
    return this._isIndeterminate;
  }
  private _isIndeterminate = false;

  /**
   * Define if the checkbox is required
   */
  @Input()
  public set isRequired(value: boolean) {
    this._isRequired = coerceBooleanProperty(value);
  }
  public get isRequired(): boolean {
    return this._isRequired;
  }
  private _isRequired = false;

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
  public tabIndex = 0;

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

    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }

}
