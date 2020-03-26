import { Component, ViewChild } from '@angular/core';
import {
  TsLoginFormComponent,
  TsLoginFormResponse,
} from '@terminus/ui/login-form';

@Component({
  selector: 'demo-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  public progress = false;
  public link = '/reset';
  public reset = false;
  public isRedirecting = false;
  @ViewChild('loginForm', { static: false })
  public loginForm!: TsLoginFormComponent;


  formSubmission(e: TsLoginFormResponse): void {
    console.warn('Demo: Form value: ', e);
    this.progress = true;

    setTimeout(() => {
      this.reset = true;
      this.progress = false;

      setTimeout(() => {
        this.reset = false;
      }, 10);
    }, 1000);
  }

  resetForm() {
    this.loginForm.resetForm();
  }

}
