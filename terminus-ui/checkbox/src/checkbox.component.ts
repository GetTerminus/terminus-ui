import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatCheckbox,
  MatCheckboxChange,
} from '@angular/material/checkbox';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  ControlValueAccessorProviderFactory,
  TsReactiveFormBaseComponent,
  TsStyleThemeTypes,
} from '@terminus/ui/utilities';
import { isBoolean } from '@terminus/ngx-tools';


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
 *              [formControl]="myControl"
 *              [(ngModel]="myModel"
 *              id="my-id"
 *              [isChecked]="true"
 *              [isDisabled]="false"
 *              [isIndeterminate]="false"
 *              [isRequired]="false"
 *              tabIndex="4"
 *              theme="accent"
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
    '[attr.id]': 'id',
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
  public set isChecked(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsCheckboxComponent: "isChecked" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isChecked = coerceBooleanProperty(value);
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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsCheckboxComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsCheckboxComponent: "isIndeterminate" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsCheckboxComponent: "isRequired" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
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
    this.value = v;
    this.changeDetectorRef.detectChanges();
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
  readonly inputChange: EventEmitter<boolean> = new EventEmitter;

  /**
   * Emit a change when moving from the indeterminate state
   */
  @Output()
  readonly indeterminateChange: EventEmitter<TsCheckboxChange> = new EventEmitter;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

}
