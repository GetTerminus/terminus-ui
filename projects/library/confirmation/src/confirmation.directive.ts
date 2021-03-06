import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { TsButtonComponent } from '@terminus/ui/button';
import { merge } from 'rxjs';

import { TsConfirmationOverlayComponent } from './confirmation-overlay.component';


/**
 * Define the accepted string values for the {@link TsConfirmationOverlayComponent} position
 */
export type TsConfirmationOverlayPositionTypes
  = 'above'
  | 'below'
  | 'before'
  | 'after'
;

/**
 * Define the allowed tooltips Used by {@link TsConfirmationOverlayComponent} position
 */
export const allowedOverlayPositionTypes: TsConfirmationOverlayPositionTypes[] = [
  'above',
  'below',
  'before',
  'after',
];

/**
 * A directive to inject a confirmation step into any button
 *
 * @example
 *         <ts-button
 *           tsConfirmation
 *           cancelButtonText="Abort!"
 *           confirmationButtonText="Confirm!"
 *           explanationText="Are you sure you want to do this?"
 *           overlayPosition="before"
 *           (cancelled)="myFunction($event)"
 *         >
 *           Click me!
 *         </ts-button>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/confirmation</example-url>
 */
@Directive({
  selector: '[tsConfirmation]',
  host: { class: 'ts-confirmation' },
  exportAs: 'tsConfirmation',
})
export class TsConfirmationDirective implements OnDestroy, OnInit {
  /**
   * Store a reference to the created confirmation overlay
   */
  private overlayInstance!: TsConfirmationOverlayComponent;

  /**
   * Store a reference to the overlay overlay
   */
  private overlayRef!: OverlayRef | null;

  /**
   * Define the confirmation button text
   *
   * @param value
   */
  @Input()
  public set confirmationButtonText(value: string) {
    this._confirmationButtonText = value || 'Confirm';
  }
  public get confirmationButtonText(): string {
    return this._confirmationButtonText;
  }
  private _confirmationButtonText = 'Confirm';

  /**
   * Define the cancel button text
   *
   * @param value
   */
  @Input()
  public set cancelButtonText(value: string) {
    this._cancelButtonText = value || 'Cancel';
  }
  public get cancelButtonText(): string {
    return this._cancelButtonText;
  }
  private _cancelButtonText = 'Cancel';

  /**
   * Define the explanation text
   */
  @Input()
  public explanationText: string | undefined;

  /**
   * Define position of the overlay
   *
   * @param value
   */
  @Input()
  public set overlayPosition(value: TsConfirmationOverlayPositionTypes) {
    if (value && isDevMode() && (allowedOverlayPositionTypes.indexOf(value) < 0)) {
      // eslint-disable-next-line no-console
      console.warn(`TsConfirmationOverlay: "${value}" is not an allowed position.`
       + `Allowed positions are defined by "allowedOverlayPositionTypes".`);
    }
    this._overlayPosition = value;
  }
  public get overlayPosition(): TsConfirmationOverlayPositionTypes {
    return this._overlayPosition;
  }
  private _overlayPosition: TsConfirmationOverlayPositionTypes = 'below';


  /**
   * An event emitted when the confirmation is cancelled
   */
  @Output()
  public readonly cancelled = new EventEmitter<boolean>();


  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private host: TsButtonComponent,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Spawn the confirmation overlay on click
   *
   * NOTE: Even though the 'event' param is not used, the param must exist for AoT to pass.
   *
   * @param event
   */
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    this.createOverlay();
  }


  /**
   * Dismiss the confirmation overlay on pressing escape
   */
  @HostListener('document:keydown.escape')
  public onKeydownHandler(): void {
    this.dismissOverlay();
  }


  /**
   * Set a flag in the {@link TsButtonComponent} to intercept the click
   */
  public ngOnInit(): void {
    this.host.interceptClick = true;
  }


  /**
   * Dismiss the overlay and clean up observables
   */
  public ngOnDestroy(): void {
    this.dismissOverlay();
    this.host.interceptClick = false;
  }


  /**
   * Create and attach the confirmation overlay
   */
  private createOverlay(): void {
    const overlayConfig = this.generateOverlayConfig(this.overlayPosition);

    // Create the overlay
    this.overlayRef = this.overlay.create(overlayConfig);

    // Wire up listeners for keydown events and overlay clicks
    // eslint-disable-next-line deprecation/deprecation
    merge(
      // NOTE: Naming controlled by the CDK
      // eslint-disable-next-line no-underscore-dangle
      this.overlayRef._keydownEvents,
      this.overlayRef.backdropClick(),
    )
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.dismissOverlay();
        this.cancelled.emit(true);
      });

    // Create and attach the overlay
    const userProfilePortal = new ComponentPortal(TsConfirmationOverlayComponent);
    this.overlayInstance = this.overlayRef.attach(userProfilePortal).instance;
    this.overlayInstance.confirmationButtonText = this.confirmationButtonText;
    this.overlayInstance.cancelButtonText = this.cancelButtonText;
    this.overlayInstance.explanationText = this.explanationText;

    // Start the progress indicator of the TsButton
    this.host.showProgress = true;

    // Subscribe to the continue event
    this.overlayInstance.confirm.subscribe((shouldProceed: boolean) => {
      if (coerceBooleanProperty(shouldProceed)) {
        this.host.clicked.emit(this.host.originalClickEvent);
        this.dismissOverlay();
      } else {
        this.dismissOverlay();
        this.cancelled.emit(true);
      }
    });
  }

  /**
   * Configure the overlay
   *
   * @param value
   */
  private generateOverlayConfig(value: TsConfirmationOverlayPositionTypes = 'below') {
    let overlayPosOriginX: HorizontalConnectionPos = 'center';
    let overlayPosOriginY: VerticalConnectionPos = 'bottom';
    let overlayPosOverlayX: HorizontalConnectionPos = 'center';
    let overlayPosOverlayY: VerticalConnectionPos = 'top';
    let positionClass = 'ts-confirmation-overlay__panel-below';
    // Define custom offsets so that the full button is still visible after the overlay is opened
    const OFFSET_Y = 16;
    const OFFSET_X_BEFORE = -38;
    const OFFSET_X_AFTER = 38;
    let defaultOffsetY = 0;
    let defaultOffsetX = 0;

    switch (value) {
      case ('above'):
        overlayPosOriginY = 'top';
        overlayPosOverlayY = 'bottom';
        positionClass = 'ts-confirmation-overlay__panel-above';
        defaultOffsetY = -(OFFSET_Y);
        break;
      case ('below'):
        overlayPosOriginY = 'bottom';
        overlayPosOverlayY = 'top';
        positionClass = 'ts-confirmation-overlay__panel-below';
        defaultOffsetY = OFFSET_Y;
        break;
      case ('before'):
        overlayPosOriginX = 'start';
        overlayPosOriginY = 'center';
        overlayPosOverlayX = 'end';
        overlayPosOverlayY = 'center';
        positionClass = 'ts-confirmation-overlay__panel-before';
        defaultOffsetX = OFFSET_X_BEFORE;
        break;
      case ('after'):
        overlayPosOriginX = 'end';
        overlayPosOriginY = 'center';
        overlayPosOverlayX = 'start';
        overlayPosOverlayY = 'center';
        positionClass = 'ts-confirmation-overlay__panel-after';
        defaultOffsetX = OFFSET_X_AFTER;
        break;
      // skip default - unreachable
    }

    const positionStrategy: FlexibleConnectedPositionStrategy =
      this.overlay.position()
        .flexibleConnectedTo(this.elementRef)
        .withDefaultOffsetY(defaultOffsetY)
        .withDefaultOffsetX(defaultOffsetX)
        .withPositions([
          {
            originX: overlayPosOriginX,
            originY: overlayPosOriginY,
            overlayX: overlayPosOverlayX,
            overlayY: overlayPosOverlayY,
          },
        ]);

    return new OverlayConfig({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'ts-confirmation-overlay',
      panelClass: ['qa-confirmation', 'ts-confirmation-overlay__panel', `${positionClass}`],
    });
  }


  /**
   * Dismiss the overlay
   */
  private dismissOverlay(): void {
    // istanbul ignore else
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    // Stop the progress indicator of the TsButton
    this.host.showProgress = false;
    this.changeDetectorRef.markForCheck();
  }

}
