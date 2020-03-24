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



// describe(`TsLoginFormComponent`, function() {
//   let component: TsLoginFormComponent;
//
//   beforeEach(() => {
//     component = new TsLoginFormComponent(
//       new FormBuilder(),
//       // FIXME: Not sure why this is needed??
//       // @ts-ignore
//       new TsValidatorsServiceMock(),
//       new ChangeDetectorRefMock(),
//     );
//   });
//
//   test(`should exist`, () => {
//     expect(component).toBeTruthy();
//   });
//
//   describe(`inProgress`, () => {
//     test(`should set and retrieve`, () => {
//       component.inProgress = true;
//       expect(component.inProgress).toEqual(true);
//     });
//   });
//
//   describe(`isRedirecting`, () => {
//     test(`should set and retrieve`, () => {
//       component.isRedirecting = true;
//       expect(component.isRedirecting).toEqual(true);
//     });
//   });
//
//   describe(`triggerFormReset`, () => {
//     test(`should set and retrieve`, () => {
//       component.triggerFormReset = true;
//       expect(component.triggerFormReset).toEqual(true);
//     });
//   });
//
//   describe(`ngOnChanges()`, () => {
//     test(`should reset the form if 'triggerFormReset' was the passed in change`, () => {
//       component['resetForm'] = jest.fn();
//       const changesMock: SimpleChanges = { triggerFormReset: new SimpleChange(true, false, false) };
//       component.ngOnChanges(changesMock);
//
//       expect(component['resetForm']).toHaveBeenCalled();
//     });
//
//     test(`should not reset the form if 'resetForm' was not passed in with changes`, () => {
//       component['resetForm'] = jest.fn();
//       const changesMock: SimpleChanges = { foo: new SimpleChange(true, false, false) };
//       component.ngOnChanges(changesMock);
//
//       expect(component['resetForm']).not.toHaveBeenCalled();
//     });
//   });
//
//   describe(`resetForm()`, () => {
//     test(`should reset all inputs to their initial value`, fakeAsync(() => {
//       component['changeDetectorRef'].detectChanges = jest.fn();
//       component.loginForm!.patchValue({
//         email: 'foo',
//         password: 'bar',
//       });
//
//       const emailValueBefore = component.loginForm!.get('email')!.value;
//       expect(emailValueBefore).toEqual('foo');
//
//       const passwordValueBefore = component.loginForm!.get('password')!.value;
//       expect(passwordValueBefore).toEqual('bar');
//
//       component['resetForm']();
//       tick(100);
//
//       const emailValueAfter = component.loginForm!.get('email')!.value;
//       expect(emailValueAfter).toEqual(null);
//
//       const passwordValueAfter = component.loginForm!.get('password')!.value;
//       expect(passwordValueAfter).toEqual(null);
//
//       expect(component.showForm).toEqual(true);
//       expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
//     }));
//   });
//
//   describe(`get emailControl`, function() {
//     test(`should return the control`, function() {
//       expect(component.emailControl!.statusChanges).toBeTruthy();
//     });
//
//     test(`should return null if the control doesn't exist`, function() {
//       component.loginForm = void 0;
//       expect(component.emailControl).toEqual(null);
//     });
//   });
//
//   describe(`get passwordControl`, function() {
//     test(`should return the control`, function() {
//       expect(component.passwordControl!.statusChanges).toBeTruthy();
//     });
//
//     test(`should return null if the control doesn't exist`, function() {
//       component.loginForm = void 0;
//       expect(component.passwordControl).toEqual(null);
//     });
//   });
//
//   describe(`get rememberMeControl`, function() {
//     test(`should return the control`, function() {
//       expect(component.rememberMeControl!.statusChanges).toBeTruthy();
//     });
//
//     test(`should return null if the control doesn't exist`, function() {
//       component.loginForm = void 0;
//       expect(component.rememberMeControl).toEqual(null);
//     });
//   });
//
// });
