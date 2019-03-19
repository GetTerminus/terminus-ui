import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TsTabBodyComponent } from './tab-body.component';


// Unique ID for each instance
let nextUniqueId = 0;


/**
 * The portal host directive for the contents of the tab.
 *
 * NOTE: Only used internally.
 */
@Directive({
  selector: '[tsTabBodyHost]',
  exportAs: 'tsTabBodyHost',
})
export class TsTabBodyHostDirective extends CdkPortalOutlet implements OnInit, OnDestroy {
  /**
   * A unique ID per instance
   */
  protected id: number = nextUniqueId++;

  /**
   * Subscription to events for when the tab body begins centering
   */
  private centeringSub = Subscription.EMPTY;

  /**
   * Subscription to events for when the tab body finishes leaving from center position
   */
  private leavingSub = Subscription.EMPTY;


  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => TsTabBodyComponent)) private host: TsTabBodyComponent,
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }


  /**
   * Set initial visibility or set up subscription for changing visibility
   */
  public ngOnInit(): void {
    super.ngOnInit();

    this.centeringSub = this.host.beforeCentering
      .pipe(
        startWith(this.host.isCenterPosition(this.host.positionState)),
        untilComponentDestroyed(this),
      )
      .subscribe((isCentering: boolean) => {
        if (isCentering && !this.hasAttached()) {
          this.attach(this.host.content);
        }
      });

    this.leavingSub = this.host.afterLeavingCenter.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.detach();
    });
  }


  /**
   * Trigger ngOnDestroy in the parent class
   */
  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
