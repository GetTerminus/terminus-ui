import {
  CdkScrollable,
  ScrollDispatcher,
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'ts-drawer-content',
  template: '<ng-content></ng-content>',
  host: { class: 'ts-drawer-content' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsDrawerContentComponent extends CdkScrollable {
  public leftMargin: number | null = null;
  public rightMargin: number | null = null;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
  ) {
    super(elementRef, scrollDispatcher, ngZone);
  }

}
