import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  HostBinding,
  ViewContainerRef,
  ViewChild,
  Compiler,
  NgModule,
  Type,
} from '@angular/core';

import { TsWindowService } from './../services/window/window.service';
import { TsLoadingOverlayComponent } from './loading-overlay.component';
import { TsLoadingOverlayService } from './loading-overlay.service';

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
export class TsLoadingOverlayDirective implements OnInit {

  @Input('tsLoadingOverlay')
  public set tsLoadingOverlay(value: boolean) {
    console.log('in set: ', value);

    if (value) {
      this.loadingOverlayService.create(this.elementRef.nativeElement);
      this.loadingOverlayService.reveal();
    } else {
      this.loadingOverlayService.hide();
    }
  };

  @HostBinding('style.position')
  position: string;

  constructor(
    private elementRef: ElementRef,
    private windowService: TsWindowService,
    private loadingOverlayService: TsLoadingOverlayService,
  ) {
    console.log('in TsLoadingOverlayDirective! tsLoadingOverlay: ', this.tsLoadingOverlay);

  }


  ngOnInit(): void {
    // Determine the CSS position of the element
    const position =
      this.windowService.nativeWindow.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('position');
    console.log('position: ', position);

    // Set the position
    this.position = this.determinePosition(position);
  }


  /**
   * Return the correct position
   *
   * @param {String} position The current position value
   * @return {String} position The correct position value
   */
  determinePosition(position: string): string {
    return (position !== 'relative' && position !== 'absolute') ? 'relative' : position;
  }

}
