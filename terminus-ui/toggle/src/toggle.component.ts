import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { isBoolean } from '@terminus/ngx-tools';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  ControlValueAccessorProviderFactory,
  TsReactiveFormBaseComponent,
  TsStyleThemeTypes,
} from '@terminus/ui/utilities';


/**
 * Expose the MatSlideToggleChange event as TsSlideToggleChange. Used by {@link TsToggleComponent}
 */
export class TsSlideToggleChange extends MatSlideToggleChange {}


/**
 * The is a toggle component
 *
 * #### QA CSS CLASSES
 * - `qa-toggle`: The toggle element
 *
 * @example
 * <ts-toggle
 *              [formControl]="yourHelperToGetFormControl('thingIsDisabled')"
 *              arialLabel="Disable my thing"
 *              [isDisabled]="true"
 *              [isRequired]="true"
 *              labelPosition="before"
 *              name="My toggle"
 *              theme="accent"
 *              (change)="myMethod($event)"
 * >My Toggle!</ts-toggle>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/toggle</example-url>
 */
@Component({
  selector: 'ts-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  host: {
    class: 'ts-toggle',
  },
  providers: [ControlValueAccessorProviderFactory(TsToggleComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsToggleComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the aria label
   */
  @Input()
  public ariaLabel: string | undefined;

  /**
   * Allow the checked state to be set
   */
  @Input()
  public set isChecked(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsToggleComponent: "isChecked" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isChecked = coerceBooleanProperty(value);
    this.value = this._isChecked;
  }
  public get isChecked(): boolean {
    return this._isChecked;
  }
  private _isChecked = false;

  /**
   * Define if the toggle should be disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsToggleComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define if the toggle is required
   */
  @Input()
  public set isRequired(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsToggleComponent: "isRequired" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isRequired = coerceBooleanProperty(value);
  }
  public get isRequired(): boolean {
    return this._isRequired;
  }
  private _isRequired = false;

  /**
   * Define the position of the label
   */
  @Input()
  public labelPosition: 'before' | 'after' = 'after';

  /**
   * Define the input name for the toggle
   */
  @Input()
  public name = 'toggle';

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event each time the toggle value changes
   */
  @Output()
  public change: EventEmitter<TsSlideToggleChange> = new EventEmitter();
}
