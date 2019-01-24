import { Component } from '@angular/core';
import { TsLoginFormResponse } from '@terminus/ui/login-form';


@Component({
  selector: 'demo-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  public progress = false;
  public link = '/reset';
  public reset = false;
  public isRedirecting = false;


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

}
