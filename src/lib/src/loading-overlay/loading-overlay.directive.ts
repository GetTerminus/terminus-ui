import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  HostBinding,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { Portal, ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

import { TsWindowService } from './../services/window/window.service';
import { TsLoadingOverlayComponent } from './loading-overlay.component';


/**
 * The tsLoadingOverlay UI Directive.
 * Provides a spinner overlay to demonstrate loading for async data.
 *
 * @example
 * <div [tsLoadingOverlay]="true"></div>
 *
 * <example-url>https://embed.plnkr.co/plunk/yvuP3SojN6Juvnnb?show=preview</example-url>
 */
@Directive({
  selector: '[tsLoadingOverlay]',
})
export class TsLoadingOverlayDirective implements OnInit, OnDestroy {
  /**
   * A reference to the portal
   */
  private loadingOverlayPortal: ComponentPortal<TsLoadingOverlayComponent>;

  /**
   * Reference to our portal host
   */
  private bodyPortalHost: DomPortalHost;

  /**
   * Define a setter to show/hide the loading overlay
   */
  @Input()
  public set tsLoadingOverlay(value: boolean) {
    if (value) {
      this.bodyPortalHost.attach(this.loadingOverlayPortal);
    } else {
      this.bodyPortalHost.detach();
    }
  };

  /**
   * Alias the position back onto the component as a style attribute
   */
  @HostBinding('style.position')
  public position: string;


  /**
   * Inject services
   */
  constructor(
    private elementRef: ElementRef,
    private windowService: TsWindowService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
    // Create the body portal host
    this.bodyPortalHost = new DomPortalHost(
      this.elementRef.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    // Create the component portal
    this.loadingOverlayPortal = new ComponentPortal(TsLoadingOverlayComponent);
  }


  /**
   * Determine and set the needed position
   */
  public ngOnInit(): void {
    // Determine the CSS position of the element
    const position = this.windowService.nativeWindow
      .getComputedStyle(this.elementRef.nativeElement).getPropertyValue('position');

    // Set the position
    this.position = this.determinePosition(position);
  }


  /**
   * Destroy the portal host if it exists
   */
  public ngOnDestroy(): void {
    if (this.bodyPortalHost) {
      this.bodyPortalHost.dispose();
    }
  }


  /**
   * Return the correct position
   *
   * @param {String} position The current position value
   * @return {String} position The correct position value
   */
  private determinePosition(position: string): string {
    return (position === 'relative' || position === 'absolute') ? position : 'relative';
  }

}
