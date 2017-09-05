import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewContainerRef,
  ViewChild,
  Compiler,
  NgModule,
  Type,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { Portal, ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/overlay';

import { TsWindowService } from './../services/window/window.service';
import { TsLoadingOverlayComponent } from './loading-overlay.component';


/**
 * TODO: Fill this section out
 * This is the tsLoadingOverlay UI Directive
 *
 * @example
 * <div [tsLoadingOverlay]="true"></div>
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
  @Input('tsLoadingOverlay')
  public set tsLoadingOverlay(value: boolean) {
    if (value) {
      this.bodyPortalHost.attach(this.loadingOverlayPortal);
    } else {
      this.bodyPortalHost.detach();
    }
  };

  /**
   * Alias the position back as a style attribute
   */
  @HostBinding('style.position')
  position: string;


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
  ngOnInit(): void {
    // Determine the CSS position of the element
    const position = this.windowService.nativeWindow
      .getComputedStyle(this.elementRef.nativeElement).getPropertyValue('position');

    // Set the position
    this.position = this.determinePosition(position);
  }


  /**
   * Destroy the portal host if it exists
   */
  ngOnDestroy(): void {
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
  determinePosition(position: string): string {
    return (position === 'relative' || position === 'absolute') ? position : 'relative';
  }

}
