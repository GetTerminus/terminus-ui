import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';

import { Portal, ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/overlay';


import { TsLoadingOverlayComponent } from './loading-overlay.component';


@Injectable()
export class TsLoadingOverlayService {
  // 1. Reference to our Portal.
  //    This is the portal we'll use to attach our TsLoadingOverlayComponent.
  private loadingSpinnerPortal: ComponentPortal<TsLoadingOverlayComponent>;

  // 2. Reference to our Portal Host.
  //    We use DOMPortalHost as we'll be using document.body as our anchor.
  private bodyPortalHost: DomPortalHost;

  // 3. Inject the dependencies needed by the DOMPortalHost constructor
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
      // 4. Create a Portal based on the TsLoadingOverlayComponent
      this.loadingSpinnerPortal = new ComponentPortal(TsLoadingOverlayComponent);

  }


  create(element: any) {
    if (!this.bodyPortalHost) {
      // 5. Create a PortalHost with document.body as its anchor element
      this.bodyPortalHost = new DomPortalHost(
        element || document.body,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
    }
  }


  destroy() {
    if (this.bodyPortalHost) {
      this.bodyPortalHost.dispose();
    }
  }


  reveal() {
    // 6. Attach the Portal to the PortalHost.
    this.bodyPortalHost.attach(this.loadingSpinnerPortal);
  }


  hide() {
    // 7. Detach the Portal from the PortalHost
    this.bodyPortalHost.detach();
  }
}
