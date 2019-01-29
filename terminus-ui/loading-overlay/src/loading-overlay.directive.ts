import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  isBoolean,
  TsWindowService,
} from '@terminus/ngx-tools';

import { TsLoadingOverlayComponent } from './loading-overlay.component';


/**
 * The tsLoadingOverlay UI Directive.
 * Provides a spinner overlay to demonstrate loading for async data.
 *
 * @example
 * <div [tsLoadingOverlay]="true"></div>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
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
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsLoadingOverlayDirective: "tsLoadingOverlay" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    const shouldSet = coerceBooleanProperty(value);
    if (shouldSet) {
      this.bodyPortalHost.attach(this.loadingOverlayPortal);
    } else {
      this.bodyPortalHost.detach();
    }
  }

  /**
   * Alias the position back onto the component as a style attribute
   */
  @HostBinding('style.position')
  public position!: string;


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
      this.injector,
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
   * @param position The current position value
   * @return The correct position value
   */
  private determinePosition(position: string): string {
    return (position === 'relative' || position === 'absolute') ? position : 'relative';
  }

}
