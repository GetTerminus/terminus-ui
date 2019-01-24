// tslint:disable: no-non-null-assertion
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Provider,
  Type,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { expectNativeEl } from '@terminus/ngx-tools/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TsButtonComponent } from '@terminus/ui/button';

import { TsConfirmationDirective } from './confirmation.directive';
import { TsConfirmationModule } from './confirmation.module';




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
  public showProgress = false;
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
    <ts-button tsConfirmation #confirmation="tsConfirmation"
      [confirmationButtonText]="confirmText"
      [cancelButtonText]="cancelText"
      [explanationText]="explanation"
      >
      Foo
    </ts-button>
  `,
})
class TestHostComponent {
  @ViewChild(TsConfirmationDirective)
  directive!: TsConfirmationDirective;
  confirmText;
  cancelText;
  explanation;
}


describe(`TsConfirmationDirective`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  let directive: TsConfirmationDirective;
  let button: HTMLElement;


  beforeEach(() => {
    fixture = createComponent(TestHostComponent);
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

      directive['overlayRef']['_backdropClick'].next(new Event('click'));
      fixture.detectChanges();

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


  describe(`Custom Button Text`, () => {

    describe(`confirmation button`, () => {

      test(`should accept custom text`, () => {
        expect(directive['confirmationButtonText']).toEqual('Confirm');

        testComponent.confirmText = 'hello';
        fixture.detectChanges();
        button.click();
        expect(directive['confirmationButtonText']).toEqual('hello');
      });
    });


    describe(`cancel button`, () => {

      test(`should accept custom text`, () => {
        expect(directive['cancelButtonText']).toEqual('Cancel');

        testComponent.cancelText = 'goodbye';
        fixture.detectChanges();
        button.click();
        expect(directive['cancelButtonText']).toEqual('goodbye');
      });

    });

  });


  describe(`Custom Explanation Text`, () => {

    test(`should be null by default`, () => {
      jest.useFakeTimers();
      button.click();

      jest.advanceTimersByTime(1000);
      expect(directive['explanationText']).toBeUndefined();
      // TODO: Blocked until v11 https://github.com/GetTerminus/terminus-ui/issues/1234
      /*
       *expect(document.querySelector('.ts-confirmation-overlay__explanation')).toBeNull();
       */
      jest.runAllTimers();
    });


    test(`should accept custom text`, () => {
      jest.useFakeTimers();
      testComponent.explanation = 'Explanation';
      fixture.detectChanges();
      button.click();

      jest.advanceTimersByTime(1000);
      expect(directive['explanationText']).toEqual('Explanation');
      // TODO: Blocked until v11 https://github.com/GetTerminus/terminus-ui/issues/1234
      /*
       *expect(document.querySelector('.ts-confirmation-overlay__explanation')).not.toBeNull();
       */
      jest.runAllTimers();
    });

  });

});




/**
 * HELPERS
 */

// TODO: Move to ngx-tools (and all other instances of this utility)
export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      CommonModule,
      OverlayModule,
      PortalModule,
      FlexLayoutModule,
      TsButtonModuleMock,
      TsConfirmationModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      {
        provide: TsButtonComponent,
        useClass: TsButtonComponentMock,
      },
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
