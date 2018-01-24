import { FormBuilder } from '@angular/forms';

import { TsLoginFormComponent } from './login-form.component';
import { TsValidatorsServiceMock } from './../services/validators/validators.service.mock';


describe(`TsLoginFormComponent`, () => {

  beforeEach(() => {
    this.component = new TsLoginFormComponent(
      new FormBuilder(),
      new TsValidatorsServiceMock(),
    );
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`ngOnChanges()`, () => {

    it(`should reset the form if 'triggerFormReset' was the passed in change`, () => {
      this.component.resetForm = jasmine.createSpy('resetForm');
      this.component.ngOnChanges({
        triggerFormReset: {
          currentValue: {},
        },
      });

      expect(this.component.resetForm).toHaveBeenCalled();
    });


    it(`should not reset the form if 'resetForm' was not passed in with changes`, () => {
      this.component.resetForm = jasmine.createSpy('resetForm');
      this.component.ngOnChanges({
        foo: 'bar',
      });

      expect(this.component.resetForm).not.toHaveBeenCalled();
    });

  });


  describe(`resetForm()`, () => {

    it(`should reset all inputs to their initial value`, () => {
      jest.useFakeTimers();
      this.component.loginForm.patchValue({
        email: 'foo',
        password: 'bar',
      });

      const emailValueBefore = this.component.loginForm.get('email').value;
      expect(emailValueBefore).toEqual('foo');

      const passwordValueBefore = this.component.loginForm.get('password').value;
      expect(passwordValueBefore).toEqual('bar');

      this.component.resetForm();
      jest.runAllTimers();

      const emailValueAfter = this.component.loginForm.get('email').value;
      expect(emailValueAfter).toEqual(null);

      const passwordValueAfter = this.component.loginForm.get('password').value;
      expect(passwordValueAfter).toEqual(null);
    });

  });

});
