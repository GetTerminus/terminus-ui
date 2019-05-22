// tslint:disable: no-non-null-assertion
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {
  createComponent,
  expectNativeEl,
} from '@terminus/ngx-tools/testing';
import { TsButtonModule } from '@terminus/ui';

import { TsConfirmationDirective } from './confirmation.directive';
import { TsConfirmationModule } from './confirmation.module';


/** *****************************************
 * TestHostComponent
 *******************************************/
@Component({
  template: `
    <ts-button
      tsConfirmation
      #confirmation="tsConfirmation"
      [confirmationButtonText]="confirmText"
      [cancelButtonText]="cancelText"
      [explanationText]="explanation"
    >Foo</ts-button>
  `,
})
class TestHostComponent {
  @ViewChild(TsConfirmationDirective)
  public directive!: TsConfirmationDirective;
  public confirmText;
  public cancelText;
  public explanation;
}


describe(`TsConfirmationDirective`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  let directive: TsConfirmationDirective;
  let button: HTMLElement;


  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [TsConfirmationModule, TsButtonModule]);
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

  describe(`Positioning`, () => {
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

