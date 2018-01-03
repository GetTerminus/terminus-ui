import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';

import {
  TsButtonActionTypes,
  TsButtonFunctionTypes,
  TsButtonFormatTypes,
  TsStyleThemeTypes,
} from './../utilities/types';
import { TsWindowService } from './../services/window/window.service';


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
 *              isDisabled="false"
 *              showProgress="true"
 *              collapsed="false"
 *              collapseDelay="500"
 *              tabIndex="2"
 *              (clickEvent)="myMethod($event)"
 * >Click Me!</ts-button>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
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
})
export class TsButtonComponent implements OnInit, OnDestroy {
  /**
   * Define the default delay for collapsable buttons
   */
  private COLLAPSE_DEFAULT_DELAY: number = 4000;

  /**
   * Store a reference to the timeout needed for collapsable buttons
   */
  private collapseTimeoutId: number;

  /**
   * Define the delay before the rounded button automatically collapses
   */
  public collapseDelay: number;

  /**
   * The defined button format
   */
  public definedFormat: TsButtonFormatTypes = 'filled';

  /**
   * The flag that defines if the button is collapsed or expanded
   */
  public isCollapsed: boolean = false;

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
    this.isCollapsed = value;

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
    this.definedFormat = value;

    // If the button is collapsable
    if (this.definedFormat === 'collapsable') {
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
  }

  /**
   * Define a Material icon to include
   */
  @Input()
  public iconName: string;

  /**
   * Define if the button is disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the progress indicator should show
   */
  @Input()
  public showProgress: boolean = false;

  /**
   * Define the tabindex for the button
   */
  @Input()
  public tabIndex: number = 0;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Pass the click event through to the parent
   */
  @Output()
  public clickEvent: EventEmitter<MouseEvent> = new EventEmitter;


  /**
   * Inject services
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private windowService: TsWindowService,
  ) {}


  /**
   * Collapse after delay (if set)
   */
  public ngOnInit(): void {
    if (this.collapseDelay) {
      this.collapseTimeoutId = this.collapseWithDelay(this.collapseDelay);
    }

    // If the format is `collapsable`, verify an `iconName` is set
    if (this.definedFormat === 'collapsable' && !this.iconName) {
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

}
