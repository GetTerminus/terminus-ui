import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { createPopper, Instance as Popper } from '@popperjs/core';
import { TsUILibraryError } from '@terminus/ui/utilities';
// NOTE: This path is to enforce Jest to import correct popper exports.

import {
  TsPopoverOptions,
  TsPopoverPositions,
  TsTriggers,
} from './popover-options';


/**
 * A popover component that supports rich HTML
 *
 * @example
 * <ts-popover
 *              #myPopper
 *              (onHidden)="myFunction($event)"
 *              (onUpdate)="myFunction($event)"
 *              (popoverHidden)="myFunction($event)"
 *              (popoverShown)="myFunction($event)"
 * >
 *              My popover content
 * </ts-popover>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/popover</example-url>
 */
@Component({
  selector: 'ts-popover',
  styleUrls: ['./popover.component.scss'],
  templateUrl: './popover.component.html',
  host: { class: 'ts-popover' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsPopoverComponent',
})
export class TsPopoverComponent implements OnDestroy, OnInit {
  /**
   * The element that passed to popper.js
   */
  public referenceObject!: HTMLElement;

  /**
   * An instance of popper
   */
  public popoverInstance!: Popper;

  /**
   * The display type of the popover element
   */
  public displayType = 'none';

  /**
   * The opacity of popover element
   */
  public opacity = 0;

  /**
   * aria hidden attribute - it requires a string value.
   */
  public ariaHidden = 'true';

  /**
   * Whether the element is visible
   */
  public visibility = false;

  /**
   * ID set by trigger and pass to popover element
   */
  public id = '';

  /**
   * Options needed for popper.js
   */
  public popoverOptions: TsPopoverOptions = {
    placement: TsPopoverPositions.Bottom,
    trigger: TsTriggers.CLICK,
  };

  /**
   * A reference to the popover view
   */
  @ViewChild('popoverViewRef', { static: true })
  public popoverViewRef!: ElementRef;

  /**
   * Event emitted when the popover is hidden
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output()
  public readonly onHidden = new EventEmitter<Popper>();

  /**
   * Event emitted when the popover is updated
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output()
  public readonly onUpdate = new EventEmitter<Popper>();

  /**
   * Event emitted when the popover is hidden
   */
  @Output()
  public readonly popoverHidden = new EventEmitter<Popper>();

  /**
   * Event emitted when the popover is shown
   */
  @Output()
  public readonly popoverShown = new EventEmitter<Popper>();

  constructor(
    private CDR: ChangeDetectorRef,
  ) {}

  /**
   * Check whether popper.js has been properly imported.
   */
  public ngOnInit(): void {
    if (!createPopper) {
      throw new TsUILibraryError('TsPopoverComponent: popper.js is not available to reference.');
    }
  }

  /**
   * Destroy the instance when component is destroyed.
   */
  public ngOnDestroy(): void {
    if (this.popoverInstance) {
      this.popoverInstance.destroy();
    }
  }

  /**
   * When popover is hidden, destroy the instance, toggle visibility to false and emit onHidden event.
   */
  public hide(): void {
    // istanbul ignore else
    if (this.popoverInstance) {
      this.popoverInstance.destroy();
    }
    this.toggleVisibility(false);
    this.onHidden.emit();
  }

  /**
   * When popover is shown, instantiate popper instance, does update and toggle visibility.
   *
   * @param options - PopoverOptions
   */
  public show(options: TsPopoverOptions): void {
    if (!this.referenceObject) {
      return;
    }

    this.onUpdate.emit(this.popoverInstance);

    this.popoverInstance = createPopper(
      this.referenceObject,
      this.popoverViewRef.nativeElement,
      options,
    );
    this.scheduleUpdate();
    this.toggleVisibility(true);
  }

  /**
   * When popover is scheduled to be updated, call popper.js update
   */
  public scheduleUpdate(): void {
    this.popoverInstance && this.popoverInstance.update();
  }

  /**
   * Based on visibility, adjust visual settings
   *
   * @param visibility - boolean
   */
  public toggleVisibility(visibility: boolean): void {
    if (visibility) {
      this.opacity = 1;
      this.displayType = 'block';
      this.ariaHidden = 'false';
      this.visibility = true;
    } else {
      this.opacity = 0;
      this.displayType = 'none';
      this.ariaHidden = 'true';
      this.visibility = false;
    }
    // istanbul ignore else
    // eslint-disable-next-line dot-notation
    if (!this.CDR['destroyed']) {
      this.CDR.detectChanges();
    }
  }
}
