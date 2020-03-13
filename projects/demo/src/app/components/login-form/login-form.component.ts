import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TsLoginFormResponse,
  TsLoginFormComponent,
} from '@terminus/ui/login-form';


@Component({
  selector: 'demo-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  public progress = false;
  public link = '/reset';

  @ViewChild(TsLoginFormComponent, { static: true })
  loginFormComponent!: TsLoginFormComponent;

  formSubmission(e: TsLoginFormResponse): void {
    console.warn('DEMO: Form value: ', e);
    this.progress = true;

    setTimeout(() => {
      this.resetForm();
      this.progress = false;
    }, 1000);
  }

  resetForm() {
    console.log('DEMO: Reset form');
    this.loginFormComponent.resetForm();
  }

  logForm(): void {
    console.log('DEMO: Current form state: ', this.loginFormComponent.loginForm);
  }

}
