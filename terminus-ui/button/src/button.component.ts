import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  isBoolean,
  TsWindowService,
} from '@terminus/ngx-tools';
import {
  TsStyleThemeTypes,
  tsStyleThemeTypesArray,
} from '@terminus/ui/utilities';


/**
 * Define the allowed {@link TsButtonComponent} action types
 */
export type TsButtonActionTypes
  = 'Button'
  | 'Submit'
  | 'Menu'
  | 'Reset'
;


/**
 * Define the allowed {@link TsButtonComponent} action types
 */
export type TsButtonFunctionTypes
  = 'button'
  | 'search'
  | 'submit'
;


/**
 * Define the allowed {@link TsButtonComponent} format types
 */
export type TsButtonFormatTypes
  = 'filled'
  | 'hollow'
  | 'collapsable'
;

export const tsButtonFormatTypesArray = ['filled', 'hollow', 'collapsable'];


/**
 * A presentational component to render a button
 *
 * #### QA CSS CLASSES
 * - `qa-button`: Placed on the button element used for this component
 *
 * @example
 * <ts-button
 *              actionName="Submit"
 *              theme="primary"
 *              format="filled"
 *              buttonType="search"
 *              iconName="search"
 *              [isDisabled]="false"
 *              [showProgress]="true"
 *              [collapsed]="false"
 *              collapseDelay="500"
 *              tabIndex="2"
 *              (clickEvent)="myMethod($event)"
 * >Click Me!</ts-button>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/button</example-url>
 */
@Component({
  selector: 'ts-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'ts-button',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsButton',
})
export class TsButtonComponent implements OnInit, OnDestroy {
  /**
   * Define the default delay for collapsable buttons
   */
  private COLLAPSE_DEFAULT_DELAY = 4000;

  /**
   * Store a reference to the timeout needed for collapsable buttons
   */
  private collapseTimeoutId!: number;

  /**
   * Define the delay before the rounded button automatically collapses
   */
  public collapseDelay: number | undefined;

  /**
   * The flag that defines if the button is collapsed or expanded
   */
  public isCollapsed = false;

  /**
   * A flag to determine if click events should be intercepted.
   * Set by {@link TsConfirmationDirective}
   */
  public interceptClick = false;

  /**
   * Store the original event from a click (used when `interceptClick` is true)
   * Used by {@link TsConfirmationDirective}
   */
  public originalClickEvent!: MouseEvent;

  /**
   * Define the action for the aria-label. {@link TsButtonActionTypes}
   */
  @Input()
  public actionName: TsButtonActionTypes = 'Button';

  /**
   * Define the button type. {@link TsButtonFunctionTypes}
   */
  @Input()
  public buttonType: TsButtonFunctionTypes = 'button';

  /**
   * Define the collapsed value and trigger the delay if needed
   */
  @Input()
  public set collapsed(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsButtonComponent: "collapsed" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }

    this.isCollapsed = coerceBooleanProperty(value);

    // If the value is `false` and a collapse delay is set
    if (!value && this.collapseDelay) {
      // Trigger the delayed close
      this.collapseWithDelay(this.collapseDelay);
    }
  }

  /**
   * Define the button format. {@link TsButtonFormatTypes}
   */
  @Input()
  public set format(value: TsButtonFormatTypes) {
    if (!value) {
      return;
    }

    // Verify the value is allowed
    if (tsButtonFormatTypesArray.indexOf(value) < 0 && isDevMode()) {
      console.warn(`TsButtonComponent: "${value}" is not an allowed format. ` +
      `See TsButtonFormatTypes for available options.`);
      return;
    }

    this._format = value;

    // If the button is collapsable
    if (this._format === 'collapsable') {
      // Set the collapse delay
      if (!this.collapseDelay) {
        this.collapseDelay = this.COLLAPSE_DEFAULT_DELAY;
      }
    } else {
      // If the format is NOT collapsable, remove the delay
      if (this.collapseDelay) {
        this.collapseDelay = undefined;
      }
    }

    this.changeDetectorRef.detectChanges();
    this.updateClasses(value);
  }
  public get format(): TsButtonFormatTypes {
    return this._format;
  }
  private _format!: TsButtonFormatTypes;

  /**
   * Define a Material icon to include
   */
  @Input()
  public iconName: string | undefined;

  /**
   * Define if the button is disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsButtonComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define if the progress indicator should show
   */
  @Input()
  public set showProgress(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsButtonComponent: "showProgress" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._showProgress = coerceBooleanProperty(value);
  }
  public get showProgress(): boolean {
    return this._showProgress;
  }
  private _showProgress = false;

  /**
   * Define the tabindex for the button
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define the theme
   */
  @Input()
  public set theme(value: TsStyleThemeTypes) {
    if (!value) {
      return;
    }

    // Verify the value is allowed
    if (tsStyleThemeTypesArray.indexOf(value) < 0 && isDevMode()) {
      console.warn(`TsButtonComponent: "${value}" is not an allowed theme. ` +
      `See TsStyleThemeTypes for available options.`);
      return;
    }

    this._theme = value;
    this.updateClasses(value);
  }
  public get theme(): TsStyleThemeTypes {
    return this._theme;
  }
  private _theme!: TsStyleThemeTypes;

  /**
   * Pass the click event through to the parent
   */
  @Output()
  public clickEvent: EventEmitter<MouseEvent> = new EventEmitter;

  /**
   * Provide access to the inner button element
   */
  @ViewChild('button')
  public button!: ElementRef;


  /**
   * Inject services
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private windowService: TsWindowService,
    private renderer: Renderer2,
  ) {}


  /**
   * Collapse after delay (if set)
   */
  public ngOnInit(): void {
    if (this.collapseDelay) {
      this.collapseTimeoutId = this.collapseWithDelay(this.collapseDelay);
    }

    // Set a default theme if one wasn't set
    if (!this.theme) {
      this.theme = 'primary';
    }

    // Set a default format if one wasn't set
    if (!this.format) {
      this.format = 'filled';
    }

    // If the format is `collapsable`, verify an `iconName` is set
    if (this.format === 'collapsable' && !this.iconName && isDevMode()) {
      throw new Error('`iconName` must be defined for collapsable buttons.');
    }
  }


  /**
   * Clear any existing timeout
   */
  public ngOnDestroy(): void {
    // istanbul ignore else
    if (this.collapseTimeoutId) {
      this.windowService.nativeWindow.clearTimeout(this.collapseTimeoutId);
    }
  }


  /**
   * Do something when clicked
   *
   * @param event - The MouseEvent
   */
  public clicked(event: MouseEvent): void {
    // Allow the click to propagate
    if (!this.interceptClick) {
      this.clickEvent.emit(event);
    } else {
      // Save the original event but don't emit the clickEvent
      this.originalClickEvent = event;
    }
  }


  /**
   * Collapse the button after a delay
   *
   * NOTE: I'm not entirely sure why this `detectChanges` is needed. Supposedly zone.js should be
   * patching setTimeout automatically.
   *
   * @param delay - The time to delay before collapsing the button
   * @return The ID of the timeout
   */
  private collapseWithDelay(delay: number): number {
    return this.windowService.nativeWindow.setTimeout(() => {
      this.isCollapsed = true;
      this.changeDetectorRef.detectChanges();
    }, delay);
  }

  /**
   * Getter returning a boolean based on both the component `isDisabled` flag and the FormControl's disabled status
   */
  public get shouldBeDisabled(): boolean {
    return this.isDisabled || this.showProgress;
  }


  /**
   * Update button classes (theme|format)
   *
   * @param classname - The classname to add to the button
   */
  private updateClasses(classname: string): void {
    const themeOptions = ['primary', 'accent', 'warn'];
    const formatOptions = ['filled', 'hollow', 'collapsable'];
    const isTheme = themeOptions.indexOf(classname) >= 0;
    const isFormat = formatOptions.indexOf(classname) >= 0;
    // This 'any' is needed since the `mat-raised-button` directive overwrites elementRef
    const buttonEl = (this.button as any)._elementRef.nativeElement;
    const themeClasses = ['c-button--primary', 'c-button--accent', 'c-button--warn'];
    const formatClasses = ['c-button--filled', 'c-button--hollow', 'c-button--collapsable'];

    // If dealing with a theme class
    // istanbul ignore else
    if (isTheme) {
      for (const themeClass of themeClasses) {
        this.renderer.removeClass(buttonEl, themeClass);
      }
      this.renderer.addClass(buttonEl, `c-button--${classname}`);
    }

    // istanbul ignore else
    if (isFormat) {
      for (const formatClass of formatClasses) {
        this.renderer.removeClass(buttonEl, formatClass);
      }
      this.renderer.addClass(buttonEl, `c-button--${classname}`);
    }
  }

}
