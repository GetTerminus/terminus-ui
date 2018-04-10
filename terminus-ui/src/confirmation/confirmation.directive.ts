import {
  Directive,
  ElementRef,
  Output,
  HostListener,
  OnDestroy,
  OnInit,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  ConnectedPositionStrategy,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE } from '@terminus/ngx-tools/keycodes';
import { merge } from 'rxjs/operators/merge';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';

import { TsConfirmationModalComponent } from './confirmation-modal.component';
import { TsButtonComponent } from './../button/button.component';


/**
 * A directive to inject a confirmation step into any button
 *
 * @example
 *         <tsButton tsConfirmation>
 *           Click me!
 *         </ts-button>
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
  private modalInstance: TsConfirmationModalComponent;

  /**
   * Store a reference to the modal overlay
   */
  private overlayRef: OverlayRef | null;

  /**
   * A subject used to unsubscribe during the destroy lifecycle hook
   */
  private unsubscribe: Subject<void> = new Subject<void>();

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
  public onClick(event): void {
    this.createOverlay();
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
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

    // Wire up listeners for overlay clicks and ESC key
    this.overlayRef._keydownEvents.pipe(
      filter((event) => event.keyCode === ESCAPE),
      merge(this.overlayRef.backdropClick()),
      takeUntil(this.unsubscribe),
    ).subscribe(() => {
      this.dismissOverlay();
      this.cancelled.emit(true);
    });

    // Create and attach the modal
    const userProfilePortal = new ComponentPortal(TsConfirmationModalComponent);
    this.modalInstance = this.overlayRef.attach(userProfilePortal).instance;

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
