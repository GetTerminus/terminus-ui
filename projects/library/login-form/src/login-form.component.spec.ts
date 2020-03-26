import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createComponent,
} from '@terminus/ngx-tools/testing';
import { sendInput } from '@terminus/ui/input/testing';
import { TsValidatorsServiceMock } from '@terminus/ui/validators/testing';

import { TsLoginFormComponent } from './login-form.component';
import { TsLoginFormModule } from './login-form.module';


@Component({
  template: `
  <ts-login-form
    (submission)="submission($event)"
    ></ts-login-form>
  `,
})
class TestHostComponent {
  @ViewChild(TsLoginFormComponent, { static: true })
  public submission = jest.fn();

  @ViewChild(TsLoginFormComponent, { static: true })
  public tsLoginFormComponent!: TsLoginFormComponent;
}

describe(`TsLoginFormComponent INT test`, function() {

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TsLoginFormComponent;
  let submitEl: HTMLElement;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [RouterTestingModule.withRoutes([]), TsLoginFormModule]);
    component = fixture.componentInstance.tsLoginFormComponent;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('.c-button')).nativeElement as HTMLElement;
  });

  test(`should emit submission on click`, () => {
    fixture.componentInstance.submission = jest.fn();

    sendInput(fixture, 'foo@bar.com', 0);
    sendInput(fixture, 'p@$$w0rd', 1);
    submitEl.click();

    expect(fixture.componentInstance.submission).toHaveBeenCalled();
  });

  describe(`resetForm()`, () => {

    test(`should reset all inputs to their initial value`, () => {
      component.loginForm!.patchValue({
        email: 'foo',
        password: 'bar',
      });

      const emailValueBefore = component.loginForm!.get('email')!.value;
      expect(emailValueBefore).toEqual('foo');

      const passwordValueBefore = component.loginForm!.get('password')!.value;
      expect(passwordValueBefore).toEqual('bar');

      component.resetForm();

      fixture.whenStable().then(() => {
        const emailValueAfter = component.loginForm!.get('email')!.value;
        expect(emailValueAfter).toEqual(null);

        const passwordValueAfter = component.loginForm!.get('password')!.value;
        expect(passwordValueAfter).toEqual(null);
      });

      expect(component.showForm).toEqual(true);
    });

  });
});


describe(`TsLoginFormComponent`, function() {
  let component: TsLoginFormComponent;

  beforeEach(() => {
    component = new TsLoginFormComponent(
      new FormBuilder(),
      new TsValidatorsServiceMock(),
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
