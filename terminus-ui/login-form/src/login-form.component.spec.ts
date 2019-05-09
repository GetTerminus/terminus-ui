import {
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';
import { TsValidatorsServiceMock } from '@terminus/ui/validators/testing';
import { TsLoginFormComponent } from './login-form.component';


describe(`TsLoginFormComponent`, function() {
  let component: TsLoginFormComponent;

  beforeEach(() => {
    component = new TsLoginFormComponent(
      new FormBuilder(),
      new TsValidatorsServiceMock(),
      new ChangeDetectorRefMock(),
    );
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`inProgress`, () => {

    test(`should set and retrieve`, () => {
      component.inProgress = true;
      expect(component.inProgress).toEqual(true);
    });

  });


  describe(`isRedirecting`, () => {

    test(`should set and retrieve`, () => {
      component.isRedirecting = true;
      expect(component.isRedirecting).toEqual(true);
    });

  });


  describe(`triggerFormReset`, () => {

    test(`should set and retrieve`, () => {
      component.triggerFormReset = true;
      expect(component.triggerFormReset).toEqual(true);
    });

  });


  describe(`ngOnChanges()`, () => {

    test(`should reset the form if 'triggerFormReset' was the passed in change`, () => {
      component['resetForm'] = jest.fn();
      const changesMock: SimpleChanges = {triggerFormReset: new SimpleChange(true, false, false)};
      component.ngOnChanges(changesMock);

      expect(component['resetForm']).toHaveBeenCalled();
    });


    test(`should not reset the form if 'resetForm' was not passed in with changes`, () => {
      component['resetForm'] = jest.fn();
      const changesMock: SimpleChanges = {foo: new SimpleChange(true, false, false)};
      component.ngOnChanges(changesMock);

      expect(component['resetForm']).not.toHaveBeenCalled();
    });

  });


  describe(`resetForm()`, () => {

    test(`should reset all inputs to their initial value`, fakeAsync(() => {
      component['changeDetectorRef'].detectChanges = jest.fn();
      component.loginForm!.patchValue({
        email: 'foo',
        password: 'bar',
      });

      const emailValueBefore = component.loginForm!.get('email')!.value;
      expect(emailValueBefore).toEqual('foo');

      const passwordValueBefore = component.loginForm!.get('password')!.value;
      expect(passwordValueBefore).toEqual('bar');

      component['resetForm']();
      tick(100);

      const emailValueAfter = component.loginForm!.get('email')!.value;
      expect(emailValueAfter).toEqual(null);

      const passwordValueAfter = component.loginForm!.get('password')!.value;
      expect(passwordValueAfter).toEqual(null);

      expect(component.showForm).toEqual(true);
      expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
    }));

  });


  describe(`get emailControl`, function() {

    test(`should return the control`, function() {
      expect(component.emailControl!.statusChanges).toBeTruthy();
    });

    test(`should return null if the control doesn't exist`, function() {
      component.loginForm = void 0;
      expect(component.emailControl).toEqual(null);
    });

  });


  describe(`get passwordControl`, function() {

    test(`should return the control`, function() {
      expect(component.passwordControl!.statusChanges).toBeTruthy();
    });

    test(`should return null if the control doesn't exist`, function() {
      component.loginForm = void 0;
      expect(component.passwordControl).toEqual(null);
    });

  });


  describe(`get rememberMeControl`, function() {

    test(`should return the control`, function() {
      expect(component.rememberMeControl!.statusChanges).toBeTruthy();
    });

    test(`should return null if the control doesn't exist`, function() {
      component.loginForm = void 0;
      expect(component.rememberMeControl).toEqual(null);
    });

  });

});
