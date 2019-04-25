import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TsDocumentService } from '@terminus/ngx-tools';
import { TS_SPACING } from '@terminus/ui/spacing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import {
  EMPTY,
  fromEvent,
  merge,
} from 'rxjs';
import {
  startWith,
  take,
} from 'rxjs/operators';

import { TsFormFieldControl } from './form-field-control';
import { TsPrefixDirective } from './prefix.directive';
import { TsSuffixDirective } from './suffix.directive';


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;
const FLOATING_LABEL_SCALE = .75;
const OUTLINE_GAP_PADDING = 5;


/**
 * The form-field UI Component.
 *
 * Used to wrap input components with form field functionality (hints, errors, labels etc)
 *
 * #### QA CSS CLASSES
 * - `qa-form-field`: Placed on the primary container
 * - `qa-form-field-container`: Placed on the click-container
 * - `qa-form-field-outline`: Placed on the field outline
 * - `qa-form-field-prefix`: Placed on the control prefix
 * - `qa-form-field-control-container`: Placed on the control container
 * - `qa-form-field-label`: Placed on the label
 * - `qa-form-field-required-marker`: Placed on the required marker if it exists
 * - `qa-form-field-suffix`: Placed on the control suffix
 * - `qa-form-field-hint`: Placed on the hint
 *
 * @example
 * <ts-form-field
 *              [control]="myControlInstance"
 *              floatLabel="always"
 *              [hideRequiredMarker]="true"
 *              hint="My hint"
 *              id="my-id"
 *              theme="primary"
 *              [validateOnChange]="true"
 * ></ts-form-field>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    'class': 'ts-form-field',
    '[class.ts-form-field--invalid]': 'controlIsInErrorState',
    '[class.ts-form-field--float]': 'shouldLabelFloat()',
    '[class.ts-form-field--disabled]': 'control.isDisabled',
    '[class.ts-form-field--focused]': 'control.focused',
    '[class.ts-form-field--accent]': 'theme == "accent"',
    '[class.ts-form-field--warn]': 'theme == "warn"',
    '[class.ng-untouched]': 'shouldForward("untouched")',
    '[class.ng-touched]': 'shouldForward("touched")',
    '[class.ng-pristine]': 'shouldForward("pristine")',
    '[class.ng-dirty]': 'shouldForward("dirty")',
    '[class.ng-valid]': 'shouldForward("valid")',
    '[class.ng-invalid]': 'shouldForward("invalid")',
    '[class.ng-pending]': 'shouldForward("pending")',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsFormField',
})
export class TsFormFieldComponent implements AfterContentInit, AfterContentChecked, AfterViewInit {
  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Define the flex layout gap. Needed because hints/errors can appear at the same time
   */
  public flexGap = TS_SPACING.small[0];

  /*
   * Unique id for the hint label
   */
  public hintLabelId = `ts-hint-${nextUniqueId++}`;

  /**
   * Unique id for the internal form field label
   */
  public labelId = `ts-form-field-label-${nextUniqueId++}`;

  /**
   * A flag to track when the outline gap should be recalculated
   */
  public outlineGapCalculationNeeded = false;

  /**
   * Override for the logic that disables the label animation in certain cases
   */
  private showAlwaysAnimate = false;

  /**
   * Define the default component ID
   */
  protected uid = `ts-form-field-${nextUniqueId++}`;

  /**
   * Return if the ngControl is currently in an errored state and has been touched
   */
  public get controlIsInErrorState(): boolean {
    const ctrl = this.control.ngControl && this.control.ngControl.control;
    if (!ctrl) {
      return false;
    }

    if ((this.validateOnChange && ctrl.dirty) || (!this.validateOnChange && ctrl.touched)) {
      return ctrl.invalid;
    }

    return false;
  }


  /**
   * VIEW ACCESS
   */

  /**
   * Access the container element
   */
  @ViewChild('containerElement')
  public containerElement!: ElementRef;

  /**
   * Access the label container
   */
  @ViewChild('labelElement')
  public labelElement!: ElementRef;

  /**
   * Access any prefix children
   */
  @ContentChildren(TsPrefixDirective)
  public prefixChildren!: QueryList<TsPrefixDirective>;

  /**
   * Access any suffix children
   */
  @ContentChildren(TsSuffixDirective)
  public suffixChildren!: QueryList<TsSuffixDirective>;


  /**
   * INPUTS
   */

  /**
   * Let implementers pass the control in
   *
   * NOTE: Material uses injection for this, but it was not working and I had to move on.
   * NOTE: Using non-null-assertion as since the existence is verified by `confirmControlExists()`
   */
  @Input()
  // tslint:disable-next-line no-any
  public control!: TsFormFieldControl<any>;

  /**
   * Whether the label should always float or float as the user types
   */
  @Input()
  public set floatLabel(value: 'always' | 'auto') {
    // istanbul ignore else
    if (value !== this._floatLabel) {
      this._floatLabel = value || 'auto';
      this.changeDetectorRef.markForCheck();
    }
  }
  public get floatLabel(): 'always' | 'auto' {
    return this._floatLabel;
  }
  private _floatLabel: 'always' | 'auto' = 'auto';

  /**
   * Define if a required marker should be hidden
   */
  @Input()
  public hideRequiredMarker = false;

  /**
   * Define a hint for the input
   */
  @Input()
  public set hint(value: string | undefined) {
    this._hint = value;
  }
  public get hint(): string | undefined {
    return this._hint;
  }
  private _hint: string | undefined;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange = false;


  constructor(
    public elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
    private ngZone: NgZone,
  ) {
    this.document = this.documentService.document;
  }


  /**
   * Verify control existence and set up subscriptions
   */
  public ngAfterContentInit(): void {
    this.confirmControlExists();

    // Subscribe to changes in the child control state in order to update the form field UI.
    // NOTE: non-null-assertion needed to pass `null` to `startWith`
    // tslint:disable: no-non-null-assertion
    this.control.stateChanges.pipe(startWith<void>(null!)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
    // tslint:enable: no-non-null-assertion

    // Subscribe to changes in the child control state in order to update the form field UI.
    // istanbul ignore else
    if (this.control.labelChanges) {
      // NOTE: non-null-assertion needed to pass `null` to `startWith`
      // tslint:disable: no-non-null-assertion
      this.control.labelChanges.pipe(startWith<void>(null!)).subscribe(() => {
        this.updateOutlineGap();
      });
      // tslint:enable: no-non-null-assertion
    }

    // Run change detection if the value, prefix, or suffix changes.
    const valueChanges = (this.control.ngControl && this.control.ngControl.valueChanges) || EMPTY;
    merge(valueChanges, this.prefixChildren.changes, this.suffixChildren.changes).subscribe(() => this.changeDetectorRef.markForCheck());

    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.ngZone.runOutsideAngular(() => this.updateOutlineGap());
    });
  }


  /**
   * Verify control existence and trigger outline gap update if needed
   */
  public ngAfterContentChecked(): void {
    this.confirmControlExists();

    if (this.outlineGapCalculationNeeded) {
      this.updateOutlineGap();
    }
  }


  /**
   * Enable animations
   */
  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }



  /**
   * Throw an error if the form field's control is missing
   */
  protected confirmControlExists() {
    // istanbul ignore else
    if (!this.control) {
      throw Error(`TsFormFieldComponent: <ts-form-field> must contain a TsFormFieldControl.`);
    }
  }


  /**
   * Whether the floating label should always float or not
   */
  public get shouldAlwaysFloat(): boolean {
    return this.floatLabel === 'always' && !this.showAlwaysAnimate;
  }


  /**
   * Gets an ElementRef for the element that a overlay attached to the form-field should be
   * positioned relative to.
   *
   * NOTE: Used by the autocomplete functionality.
   */
  public getConnectedOverlayOrigin(): ElementRef {
    return this.containerElement || this.elementRef;
  }


  /**
   * Determines whether a class from the NgControl should be forwarded to the host element
   */
  public shouldForward(prop: string): boolean {
    const ngControl = this.control ? this.control.ngControl /* istanbul ignore next - Unreachable */ : null;
    return ngControl && ngControl[prop];
  }


  /**
   * Determine if the label should float from the control's setting
   */
  public shouldLabelFloat(): boolean {
    return this.control.shouldLabelFloat;
  }


  /**
   * Animate the placeholder up and lock it in position
   *
   * NOTE: Used by autocomplete functionality
   */
  public animateAndLockLabel(): void {
    this.showAlwaysAnimate = true;

    fromEvent(this.labelElement.nativeElement, 'transitionend').pipe(take(1)).subscribe(() => {
      this.showAlwaysAnimate = false;
    });

    this.floatLabel = 'always';
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Updates the width and position of the gap in the outline
   */
  private updateOutlineGap(): void {
    const labelEl = this.labelElement ? this.labelElement.nativeElement : null;
    if (!labelEl) {
      return;
    }

    if (this.document.documentElement && !this.document.documentElement.contains(this.elementRef.nativeElement)) {
      this.outlineGapCalculationNeeded = true;
      return;
    }

    let startWidth = 0;
    let gapWidth = 0;
    const startEls: NodeListOf<HTMLDivElement> = this.containerElement.nativeElement.querySelectorAll('.js-outline-start');
    const gapEls: NodeListOf<HTMLDivElement> = this.containerElement.nativeElement.querySelectorAll('.js-outline-gap');

    // istanbul ignore else
    if (labelEl.children.length) {
      const containerStart: number = this.containerElement.nativeElement.getBoundingClientRect().left;
      const labelStart: number = labelEl.children[0].getBoundingClientRect().left;
      let labelWidth = 0;

      for (const child of labelEl.children) {
        labelWidth += child.offsetWidth;
      }

      startWidth = labelStart - containerStart - OUTLINE_GAP_PADDING;
      const TWO = 2;
      gapWidth = (labelWidth > 0) ? (labelWidth * FLOATING_LABEL_SCALE) + (OUTLINE_GAP_PADDING * TWO) : 0;
    }

    for (let i = 0; i < startEls.length; i++) {
      startEls.item(i).style.width = `${startWidth}px`;
    }

    for (let i = 0; i < gapEls.length; i++) {
      gapEls.item(i).style.width = `${gapWidth}px`;
    }

    this.outlineGapCalculationNeeded = false;
  }

}
