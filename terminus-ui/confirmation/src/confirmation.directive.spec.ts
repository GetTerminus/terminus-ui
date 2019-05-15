// tslint:disable: no-non-null-assertion
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { expectNativeEl } from '@terminus/ngx-tools/testing';
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
    <button (click)="clickedButton($event)">
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
  public clicked: EventEmitter<MouseEvent> = new EventEmitter();

  public clickedButton(event: MouseEvent): void {
    // Allow the click to propagate
    if (!this.interceptClick) {
      this.clicked.emit(event);
    } else {
      // Save the original event but don't emit the originalClickEvent
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

    test(`should dismiss the overlay`, () => {
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      directive['overlayRef']['_backdropClick'].next(new Event('click'));
      fixture.detectChanges();

      expect(directive['overlayRef']!.hasAttached()).toEqual(false);
    });

  });


  describe(`overlay content`, () => {

    test(`should dismiss the overlay and emit event on confirm`, () => {
      directive['host'].clicked.emit = jest.fn();
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      directive['overlayInstance'].confirm.next(true);

      expect(directive['overlayRef']!.hasAttached()).toEqual(false);
      expect(directive['host'].clicked.emit).toHaveBeenCalled();
    });


    test(`should dismiss the overlay and emit event on cancel`, () => {
      directive.cancelled.emit = jest.fn();
      expect(directive['overlayRef']).toBeFalsy();
      button.click();
      expect(directive['overlayRef']).toBeTruthy();

      directive['overlayInstance'].confirm.next(false);

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
      fixture.detectChanges();
      expect(directive['explanationText']).toBeUndefined();
      expect(document.querySelector('.ts-confirmation-overlay__explanation')).toBeNull();

      jest.runAllTimers();
    });


    test(`should accept custom text`, () => {
      jest.useFakeTimers();
      testComponent.explanation = 'Explanation';
      fixture.detectChanges();
      button.click();

      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(directive['explanationText']).toEqual('Explanation');
      expect(directive['explanationText']).toBeTruthy();

      expect(document.querySelector('.ts-confirmation-overlay__explanation')).not.toBeNull();

      jest.runAllTimers();
    });

  });

  describe(`Positioning` , () => {
    test(`should default to 'below'`, () => {
      jest.useFakeTimers();
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(directive['overlayPosition']).toEqual('below');
      expect(document.querySelector('.ts-confirmation-overlay__panel-below')).not.toBeNull();
    });

    test(`should accept 'above' position type and set class`, () => {
      jest.useFakeTimers();
      directive.overlayPosition = 'above';
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(document.querySelector('.ts-confirmation-overlay__panel-above')).not.toBeNull();
    });

    test(`should accept 'below' position type and set class`, () => {
      jest.useFakeTimers();
      directive.overlayPosition = 'below';
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(document.querySelector('.ts-confirmation-overlay__panel-below')).not.toBeNull();
    });

    test(`should accept 'before' position type and set class`, () => {
      jest.useFakeTimers();
      directive.overlayPosition = 'before';
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(document.querySelector('.ts-confirmation-overlay__panel-before')).not.toBeNull();
    });

    test(`should accept 'after' position type and set class`, () => {
      jest.useFakeTimers();
      directive.overlayPosition = 'after';
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(document.querySelector('.ts-confirmation-overlay__panel-after')).not.toBeNull();
    });

    test(`should throw error if invalid position is set`, () => {
      jest.useFakeTimers();
      window.console.warn = jest.fn();
      directive.overlayPosition = 'left' as any;
      button.click();
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
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
