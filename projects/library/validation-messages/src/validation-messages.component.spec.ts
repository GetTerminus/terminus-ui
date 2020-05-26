import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createComponent } from '@terminus/ngx-tools/testing';
import { TsValidationMessagesComponent } from '@terminus/ui/validation-messages';
import * as testComponents from '@terminus/ui/validation-messages/testing';

import { TsValidationMessagesModule } from './validation-messages.module';

describe(`TsValidationMessagesComponent`, function() {
  describe(`basics and defaults`, function() {
    let component: testComponents.Basic;
    let fixture: ComponentFixture<testComponents.Basic>;
    let validationMessage: TsValidationMessagesComponent;
    let validationMessageEl: HTMLElement;

    beforeEach(() => {
      fixture = createComponent(testComponents.Basic, [], [TsValidationMessagesModule]);
      component = fixture.componentInstance;
      fixture.detectChanges();
      validationMessage = component.validationMessagesComponent;
      validationMessageEl = fixture.debugElement.query(By.css('.c-validation-message')).nativeElement as HTMLElement;

      validationMessage['validationMessageService'].getValidatorErrorMessage = jest.fn();
    });

    test(`should exist`, () => {
      expect(validationMessage).toBeTruthy();
      expect(validationMessageEl).toBeTruthy();
    });

    test(`should set default uid`, () => {
      expect(validationMessage.id).toContain('ts-validation-messages-');
    });

    describe(`get validation messages`, () => {
      test(`should return null if no control was passed in`, () => {
        expect(validationMessage.validationMessage).toBeNull();
      });

      test(`should return error if control is touched`, () => {
        const ERROR = { valid: false };
        const control = {
          touched: true,
          errors: { invalidEmail: ERROR },
        } as any;
        component.controlForm = control;
        fixture.detectChanges();

        expect(validationMessage.control).toBeTruthy();
        expect(validationMessage['validationMessageService'].getValidatorErrorMessage)
          .toHaveBeenCalledWith('invalidEmail', ERROR);
      });

      test(`should not return error if validateOnChange is true and there is no error`, () => {
        component.validateOnChange = true;
        const control = {
          touched: false,
          errors: {},
        } as any;
        component.controlForm = control;
        fixture.detectChanges();

        expect(validationMessage.control).toBeTruthy();
        expect(validationMessage['validationMessageService'].getValidatorErrorMessage)
          .not.toHaveBeenCalled();
        expect(validationMessage.validationMessage).toBeNull();
      });

      test(`should return error if validateOnChange is true, error is present, and control is not touched`, () => {
        component.validateOnChange = true;
        const ERROR = { valid: false };
        const control = {
          touched: false,
          errors: { invalidEmail: ERROR },
        } as any;
        component.controlForm = control;
        fixture.detectChanges();

        expect(validationMessage.control).toBeTruthy();
        expect(validationMessage['validationMessageService'].getValidatorErrorMessage)
          .toHaveBeenCalledWith('invalidEmail', ERROR);
      });
    });
  });

  describe(`customizations`, () => {
    let component: testComponents.TestHostComponent;
    let fixture: ComponentFixture<testComponents.TestHostComponent>;
    let validationMessage: TsValidationMessagesComponent;
    let validationMessageEl: HTMLElement;

    beforeEach(() => {
      fixture = createComponent(testComponents.TestHostComponent, [], [TsValidationMessagesModule]);
      component = fixture.componentInstance;
      fixture.detectChanges();
      validationMessage = component.validationMessagesComponent;
      validationMessageEl = fixture.debugElement.query(By.css('.c-validation-message')).nativeElement as HTMLElement;
    });

    test(`should set validateImmediately`, () => {
      component.validateImmediately = true;
      fixture.detectChanges();

      expect(validationMessage.validateImmediately).toEqual(true);

      component.validateImmediately = false;
      fixture.detectChanges();

      expect(validationMessage.validateImmediately).toEqual(false);
    });

    test(`should set id`, () => {
      component.id = 'foo';
      fixture.detectChanges();

      expect(validationMessage.id).toEqual('foo');
      expect(validationMessageEl.id).toEqual('foo');
    });
  });

  describe(`messageFactory`, () => {
    let component: testComponents.TestHostComponent;
    let fixture: ComponentFixture<testComponents.TestHostComponent>;
    let validationMessageEl: HTMLElement;

    beforeEach(() => {
      fixture = createComponent(testComponents.MessageFactory, [], [TsValidationMessagesModule]);
      component = fixture.componentInstance;
      const ERROR = { valid: false };
      const control = {
        touched: true,
        errors: { invalidEmail: ERROR },
      } as any;
      component.controlForm = control;
      fixture.detectChanges();
      validationMessageEl = fixture.debugElement.query(By.css('.c-validation-message')).nativeElement as HTMLElement;
    });

    test(`should be used if it is passed in`, () => {
      expect(validationMessageEl.textContent?.trim()).toEqual('My message.');
    });
  });

  describe(`change detection`, () => {
    let component: testComponents.Basic;
    let fixture: ComponentFixture<testComponents.Basic>;
    let validationMessageInstance: TsValidationMessagesComponent;

    beforeEach(() => {
      fixture = createComponent(testComponents.Basic, [], [TsValidationMessagesModule]);
      component = fixture.componentInstance;
    });

    test.todo('test change detector should be triggered');
    // change detector isn't being triggered by this spec
    // test(`should call change detection detect on control status changes`, () => {
    //   validationMessageInstance = component.validationMessagesComponent;
    //   validationMessageInstance['changeDetectorRef'].detectChanges = jest.fn();
    //   component.controlForm = new FormControl();
    //   console.log('component: ', Object.keys(component));
    //
    //   component.setFactory();
    //   (<EventEmitter<any>> component.controlForm.statusChanges).emit('INVALID');
    //   fixture.detectChanges();
    //   validationMessageInstance.control?.markAsDirty();
    //   fixture.detectChanges();
    //   expect(validationMessageInstance['changeDetectorRef'].detectChanges).toHaveBeenCalled();
    // });
  });
});
