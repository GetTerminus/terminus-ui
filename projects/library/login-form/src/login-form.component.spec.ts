import {
  Component,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponent } from '@terminus/ngx-tools/testing';
import {
  getInputElement,
  sendInput,
} from '@terminus/ui/input/testing';

import {
  TsLoginFormComponent,
  TsLoginFormModule,
} from './login-form.module';

@Component({
  template: `
    <ts-login-form
      [triggerFormReset]="triggerReset"
      (submission)="submission($event)"
    ></ts-login-form>
  `,
})
class TestHostComponent {
  submission = jest.fn();
  triggerReset = false;

  @ViewChild(TsLoginFormComponent, { static: true })
  loginFormComponent!: TsLoginFormComponent;
}

describe(`TsLoginFormComponent`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let submitEl: HTMLElement;
  let logInFormInstance: TsLoginFormComponent;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [RouterTestingModule.withRoutes([]), TsLoginFormModule]);
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('.c-button')).nativeElement as HTMLElement;
    logInFormInstance = fixture.componentInstance.loginFormComponent;
  });

  test(`should emit submission on click`, () => {
    fixture.componentInstance.submission = jest.fn();
    sendInput(fixture, 'foo@bar.com', 0);
    sendInput(fixture, 'p@$$w0rd', 1);
    submitEl.click();

    expect(fixture.componentInstance.submission).toHaveBeenCalled();
  });

  describe(`resetForm()`, () => {
    test(`should reset the form state`, () => {
      sendInput(fixture, 'p@$$w0rd', 1);
      const input1 = getInputElement(fixture, 0);
      input1.focus();
      input1.blur();
      expect(logInFormInstance.loginForm.valid).toEqual(false);

      logInFormInstance.resetForm();
      fixture.detectChanges();
      expect(logInFormInstance.loginForm.pristine).toEqual(true);
      expect(input1.value).toEqual('');
      expect.assertions(3);
    });
  });

  describe(`triggerFormReset`, () => {
    test(`should trigger form reset via flag`, () => {
      sendInput(fixture, 'p@$$w0rd', 1);
      const input1 = getInputElement(fixture, 0);
      input1.focus();
      input1.blur();
      expect(logInFormInstance.loginForm.valid).toEqual(false);

      fixture.componentInstance.triggerReset = true;
      fixture.detectChanges();
      expect(logInFormInstance.loginForm.pristine).toEqual(true);
      expect(input1.value).toEqual('');
      expect.assertions(3);
    });
  });
});
