// tslint:disable: no-non-null-assertion
import {
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TsValidatorsServiceMock } from '@terminus/ui/validators/testing';

import { TsLoginFormComponent } from './login-form.component';


describe(`TsLoginFormComponent`, function() {
  let component: TsLoginFormComponent;

  beforeEach(() => {
    component = new TsLoginFormComponent(
      new FormBuilder(),
      new TsValidatorsServiceMock(),
    );
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`inProgress`, () => {
    it(`should set and retrieve`, () => {
      component.inProgress = true;
      expect(component.inProgress).toEqual(true);
    });
  });

  describe(`isRedirecting`, () => {
    it(`should set and retrieve`, () => {
      component.isRedirecting = true;
      expect(component.isRedirecting).toEqual(true);
    });
  });

  describe(`triggerFormReset`, () => {
    it(`should set and retrieve`, () => {
      component.triggerFormReset = true;
      expect(component.triggerFormReset).toEqual(true);
    });
  });

  describe(`ngOnChanges()`, () => {

    it(`should reset the form if 'triggerFormReset' was the passed in change`, () => {
      component['resetForm'] = jest.fn();
      const changesMock: SimpleChanges = {
        triggerFormReset: new SimpleChange(true, false, false),
      };
      component.ngOnChanges(changesMock);

      expect(component['resetForm']).toHaveBeenCalled();
    });


    it(`should not reset the form if 'resetForm' was not passed in with changes`, () => {
      component['resetForm'] = jest.fn();
      const changesMock: SimpleChanges = {
        foo: new SimpleChange(true, false, false),
      };
      component.ngOnChanges(changesMock);

      expect(component['resetForm']).not.toHaveBeenCalled();
    });

  });


  describe(`resetForm()`, () => {

    it(`should reset all inputs to their initial value`, () => {
      jest.useFakeTimers();
      component.loginForm!.patchValue({
        email: 'foo',
        password: 'bar',
      });

      const emailValueBefore = component.loginForm!.get('email')!.value;
      expect(emailValueBefore).toEqual('foo');

      const passwordValueBefore = component.loginForm!.get('password')!.value;
      expect(passwordValueBefore).toEqual('bar');

      component['resetForm']();
      jest.runAllTimers();

      const emailValueAfter = component.loginForm!.get('email')!.value;
      expect(emailValueAfter).toEqual(null);

      const passwordValueAfter = component.loginForm!.get('password')!.value;
      expect(passwordValueAfter).toEqual(null);
    });

  });

});