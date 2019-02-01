import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { merge } from 'rxjs/operators';
import { TsButtonComponent } from '@terminus/ui/button';

import { TsConfirmationModalComponent } from './confirmation-modal.component';


/**
 * A directive to inject a confirmation step into any button
 *
 * @example
 *         <tsButton
 *           tsConfirmation
 *           explanationText="Are you sure you want to delete this?"
 *           confirmationButtonText="Confirm!"
 *           cancelButtonText="Abort!"
 *         >
 *           Click me!
 *         </ts-button>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/confirmation</example-url>
 */
@Directive({
  selector: '[tsConfirmation]',
  host: {
    class: 'ts-confirmation',
  },
  exportAs: 'tsConfirmation',
})
export class TsConfirmationDirective implements OnDestroy, OnInit {
  /**
   * Store a reference to the created confirmation modal
   */
  private modalInstance!: TsConfirmationModalComponent;

  /**
   * Store a reference to the modal overlay
   */
  private overlayRef!: OverlayRef | null;


  /**
   * INPUTS
   */

  /**
   * Define the Confirmation Button Text
   */
  @Input()
  public set confirmationButtonText(value: string) {
    if (!value) {
      return;
    }
    this._confirmationButtonText = value;
  }
  public get confirmationButtonText(): string {
    return this._confirmationButtonText;
  }
  private _confirmationButtonText = 'Confirm';

  /**
   * Define the Cancel Button Text
   */
  @Input()
  public set cancelButtonText(value: string) {
    if (!value) {
      return;
    }
    this._cancelButtonText = value;
  }
  public get cancelButtonText(): string {
    return this._cancelButtonText;
  }
  private _cancelButtonText = 'Cancel';

  /**
   * Define the Explanation Text
   */
  @Input()
  public set explanationText(value: string | undefined) {
    this._explanationText = value;
  }
  public get explanationText(): string | undefined {
    return this._explanationText;
  }
  private _explanationText: string | undefined;

  /**
   * An event emitted when the confirmation is cancelled
   */
  @Output()
  public cancelled: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private host: TsButtonComponent,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


  /**
   * Spawn the confirmation overlay on click
   *
   * @param event - The MouseEvent
   */
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    this.createOverlay();
  }


  /**
   * Dismiss the confirmation overlay on pressing escape
   *
   * @param event - The Keyboard Event
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
    const positionStrategy: ConnectedPositionStrategy = this.overlay.position().connectedTo(
      this.elementRef,
      {
        originX: 'center',
        originY: 'bottom',
      },
      {
        overlayX: 'center',
        overlayY: 'top',
      },
    );


    const overlayConfig: OverlayConfig = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'ts-confirmation-overlay',
      panelClass: ['qa-confirmation', 'ts-confirmation-overlay__panel'],
    });

    // Create the overlay
    this.overlayRef = this.overlay.create(overlayConfig);

    // Wire up listeners for overlay clicks
    this.overlayRef._keydownEvents.pipe(
      merge(this.overlayRef.backdropClick()),
      untilComponentDestroyed(this),
    ).subscribe(() => {
      this.dismissOverlay();
      this.cancelled.emit(true);
    });

    // Create and attach the modal
    const userProfilePortal = new ComponentPortal(TsConfirmationModalComponent);
    this.modalInstance = this.overlayRef.attach(userProfilePortal).instance;
    this.modalInstance.confirmationButtonTxt = this.confirmationButtonText;
    this.modalInstance.cancelButtonTxt = this.cancelButtonText;
    this.modalInstance.explanationTxt = this.explanationText;

    // Start the progress indicator of the TsButton
    this.host.showProgress = true;

    // Subscribe to the continue event
    this.modalInstance.confirm.subscribe((shouldProceed: boolean) => {
      if (coerceBooleanProperty(shouldProceed)) {
        this.host.clickEvent.emit(this.host.originalClickEvent);
        this.dismissOverlay();
      } else {
        this.dismissOverlay();
        this.cancelled.emit(true);
      }
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
