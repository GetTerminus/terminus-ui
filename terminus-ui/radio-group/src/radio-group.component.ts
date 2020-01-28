// NOTE: Our templates need to call a method to use the formatter functions
// tslint:disable: template-no-call-expression
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
import { MatRadioChange } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { isFunction } from '@terminus/ngx-tools/type-guards';
import {
  hasRequiredControl,
  untilComponentDestroyed,
} from '@terminus/ngx-tools/utilities';
import {
  ControlValueAccessorProviderFactory,
  TsReactiveFormBaseComponent,
  TsStyleThemeTypes,
} from '@terminus/ui/utilities';


/**
 * Define the allowed keys for an item passed to the {@link TsRadioComponent}
 */
export interface TsRadioOption {
  // tslint:disable-next-line no-any
  [key: string]: any;

  /**
   * Define if the item is disabled
   */
  disabled?: boolean;

  /**
   * Define the template for the content (used if type is visual)
   */
  template?: string;
}


/**
 * The change event as TsRadioChange. Used by {@link TsRadioGroupComponent}
 */
export class TsRadioChange {
  constructor(
    // The group that emit the change event
    public source: TsRadioGroupComponent,
    // The value of the TsRadioButton
    // tslint:disable-next-line:no-any
    public value: any,
  ) {}
}

/**
 * Expose the formatter function type used by {@link TsRadioGroupComponent}
 */
export type TsRadioFormatFn = (v: TsRadioOption) => string;


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * This is the radio UI Component
 *
 * @example
 * <ts-radio-group
 *              [ariaDescribedby]="Aria Describedby"
 *              [ariaLabel]="Aria Label"
 *              [ariaLabelledby]="Aria Labelledby"
 *              [centeredContent]="false"
 *              [formatUILabelFn]="myUIFormatter"
 *              [formatUISubLabelFn]="myUISubFormatter"
 *              [formatModelValueFn]="myModelFormatter"
 *              [formControl]="myForm.get('myRadioGroup')"
 *              [id]="uid"
 *              [isDisabled]="true"
 *              [isVisual]="false"
 *              [name]="myName"
 *              [options]="myItemsArray | $async"
 *              [small]=false
 *              [theme]="primary"
 *              (selectionChange)="doSomething($event)"
 * ></ts-radio-group>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/radio-group</example-url>
 */
@Component({
  selector: 'ts-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: { class: 'ts-radio-group' },
  providers: [ControlValueAccessorProviderFactory<TsRadioGroupComponent>(TsRadioGroupComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsRadioGroup',
})
export class TsRadioGroupComponent extends TsReactiveFormBaseComponent implements OnInit, OnDestroy {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-radio-group-${nextUniqueId++}`;

  /**
   * Define the ripple color.
   * TODO: abstract out to a service or utility function or set as a global default for ripples
   */
  public rippleColor = 'rgba(0, 83, 138, .1)';

  /**
   * Getter to determine if the group is required
   */
  public get isRequired(): boolean {
    return hasRequiredControl(this.formControl);
  }

  // NOTE: Since we are matching standard HTML attributes, we will rename for internal use.
  // tslint:disable: no-input-rename
  /**
   * Used to set the 'aria-label' attribute on the underlying input element.
   */
  @Input('aria-label')
  public ariaLabel: string | undefined;

  /**
   * The 'aria-labelledby' attribute takes precedence as the element's text alternative.
   */
  @Input('aria-labelledby')
  public ariaLabelledby: string | undefined;

  /**
   * The 'aria-describedby' attribute is read after the element's label and field type.
   */
  @Input('aria-describedby')
  public ariaDescribedby: string | undefined;
  // tslint:enable: no-input-rename

  /**
   * Define if the radio contents should be centered (used with the visual radio group layout)
   */
  @Input()
  public centeredContent = true;

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
    } else if (isDevMode()) {
      throw Error(`TsRadioGroupComponent: 'formatUILabelFn' must be passed a 'TsRadioFormatFn'.`);
    }
  }
  public get formatUILabelFn(): TsRadioFormatFn {
    return this._formatUILabelFn;
  }
  private _formatUILabelFn!: TsRadioFormatFn;

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
    } else if (isDevMode()) {
      throw Error(`TsRadioGroupComponent: 'formatUISubLabelFn' must be passed a 'TsRadioFormatFn'.`);
    }
  }
  public get formatUISubLabelFn(): TsRadioFormatFn {
    return this._formatUISubLabelFn;
  }
  private _formatUISubLabelFn!: TsRadioFormatFn;

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
    } else if (isDevMode()) {
      throw Error(`TsRadioGroupComponent: 'formatModelValueFn' must be passed a 'TsRadioFormatFn'.`);
    }
  }
  public get formatModelValueFn(): TsRadioFormatFn {
    return this._formatModelValueFn;
  }
  private _formatModelValueFn!: TsRadioFormatFn;

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
   * Define if the radio group is disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define if the radio group is visual (boxes) or standard (text)
   */
  @Input()
  public isVisual = false;

  /**
   * Define a label for the radio group
   */
  @Input()
  public label!: string;

  /**
   * The HTML name attribute applied to radio buttons in this group.
   */
  @Input()
  public set name(value: string) {
    this._name = value ? value : this._uid;
  }
  public get name(): string {
    return this._name;
  }
  private _name: string = this._uid;

  /**
   * Accept an array of radio options in the {@link TsRadioOption} format
   */
  @Input()
  public set options(value: TsRadioOption[]) {
    if (!value) {
      return;
    }

    this._options = value;
  }
  public get options(): TsRadioOption[] {
    return this._options;
  }
  private _options!: TsRadioOption[];

  /**
   * Define if the visual style should be large or small
   */
  @Input()
  public small = false;

  /**
   * Define the theme. {@link TsStyleThemeTypes}
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit event when a selection occurs. {@link TsRadioChange}
   */
  @Output()
  public readonly selectionChange: EventEmitter<TsRadioChange> = new EventEmitter();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public domSanitizer: DomSanitizer,
  ) {
    super();
  }


  /**
   * Update the change detector if the control value changes
   */
  public ngOnInit(): void {
    // istanbul ignore else
    if (this.formControl) {
      this.formControl.valueChanges
        .pipe(
          untilComponentDestroyed(this),
        )
        // tslint:disable-next-line no-any
        .subscribe((v: any) => {
          this.writeValue(v);
          this.changeDetectorRef.markForCheck();
        });
    }
  }


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}


  /**
   * Retrieve a value determined by the passed in formatter
   *
   * @param option - The radio option
   * @param formatter - The formatter function used to retrieve the value
   * @return The retrieved value
   */
  public retrieveValue(option: TsRadioOption, formatter?: TsRadioFormatFn): TsRadioOption | string {
    return (formatter && formatter(option)) ? formatter(option) : option;
  }

  /**
   * Handle changes
   *
   * @param option - The selected option
   */
  public radioGroupChange(option: MatRadioChange): void {
    const change = new TsRadioChange(this, option.value);
    this.selectionChange.emit(change);
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Handles changes for visual radio groups
   *
   * @param option - The selected option
   */
  public visualRadioGroupChange(option: TsRadioOption): void {
    const value = this.retrieveValue(option, this.formatModelValueFn);
    const change = new TsRadioChange(this, value);
    this.selectionChange.emit(change);
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Function for tracking for-loops changes
   *
   * @param index - The item index
   * @return The unique ID
   */
  public trackByFn(index): number {
    return index;
  }

}
