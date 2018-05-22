// tslint:disable: no-non-null-assertion
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  dispatchKeyboardEvent,
  expectNativeEl,
} from '@terminus/ngx-tools/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { ESCAPE } from '@terminus/ngx-tools/keycodes';

import { TsButtonComponent } from './../button/button.component';
import { TsConfirmationDirective } from './confirmation.directive';
import { TsConfirmationModalComponent } from './confirmation-modal.component';




/*******************************************
 * TsButtonComponentMock
 *******************************************/
// tslint:disable: component-class-suffix
@Component({
  selector: 'ts-button',
  template: `
    <button (click)="clicked($event)">
      <ng-content></ng-content>
    </button>
  `,
  host: {
    class: 'ts-button',
  },
  exportAs: 'tsButton',
})
class TsButtonComponentMock {
  public interceptClick: boolean = false;
  public originalClickEvent!: MouseEvent;
  @Input()
  public showProgress: boolean = false;
  @Output()
  public clickEvent: EventEmitter<MouseEvent> = new EventEmitter;

  public clicked(event: MouseEvent): void {
    // Allow the click to propagate
    if (!this.interceptClick) {
      this.clickEvent.emit(event);
    } else {
      // Save the original event but don't emit the clickEvent
      this.originalClickEvent = event;
    }
  }
}
// tslint:enable: component-class-suffix


/*******************************************
 * TsButtonModuleMock
 *******************************************/
@NgModule({
  declarations: [
    TsButtonComponentMock,
  ],
  exports: [
    TsButtonComponentMock,
  ],
})
export class TsButtonModuleMock {}


/*******************************************
 * TestHostComponent
 *******************************************/
@Component({
  template: `
    <ts-button tsConfirmation #confirmation="tsConfirmation">
      Foo
    </ts-button>
  `,
})
class TestHostComponent {
  @ViewChild(TsConfirmationDirective)
  directive!: TsConfirmationDirective;
}


describe(`TsConfirmationDirective`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  let directive: TsConfirmationDirective;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        FlexLayoutModule,
        TsButtonModuleMock,
      ],
      declarations: [
        TsConfirmationDirective,
        TsConfirmationModalComponent,
        TestHostComponent,
      ],
      providers: [
        {
          provide: TsButtonComponent,
          useClass: TsButtonComponentMock,
        },
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TsConfirmationModalComponent],
      },
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
    directive = testComponent.directive;
    button = fixture.debugElement.nativeElement.querySelector('button');

    fixture.detectChanges();
  });


  describe(`tsConfirmation`, () => {

    test(`should exist`, () => {
      expectNativeEl(fixture).toBeTruthy();
    });

  });


  describe(`onClick`, () => {

    test(`should create an overlay`, () => {
      button.click();

      expect(document.querySelector('.cdk-overlay-container')).not.toBeNull();
      expect(directive['host'].showProgress).toEqual(true);
    });

  });


  describe(`ESCAPE key`, () => {

    test(`should dismiss the modal`, () => {
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);

      expect(directive['overlayRef']!.hasAttached()).toEqual(false);
    });

  });


  describe(`modal content`, () => {

    test(`should dismiss the modal and emit event on confirm`, () => {
      directive['host'].clickEvent.emit = jest.fn();
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      directive['modalInstance'].confirm.next(true);

      expect(directive['overlayRef']!.hasAttached()).toEqual(false);
      expect(directive['host'].clickEvent.emit).toHaveBeenCalled();
    });


    test(`should dismiss the modal and emit event on cancel`, () => {
      directive.cancelled.emit = jest.fn();
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      directive['modalInstance'].confirm.next(false);

      expect(directive['overlayRef']!.hasAttached()).toEqual(false);
      expect(directive.cancelled.emit).toHaveBeenCalledWith(true);
    });
  });

});

