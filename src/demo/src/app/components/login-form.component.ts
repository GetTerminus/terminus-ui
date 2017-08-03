import { Component } from '@angular/core';

@Component({
  selector: 'demo-login-form',
  template: `
    <ts-login-form
      [inProgress]="progress"
      (submit)="formSubmission($event)"
    ></ts-login-form>
  `,
})
export class LoginFormComponent {
  public progress = false;

  formSubmission(e: any) {
    console.warn('Form value: ', e);
    this.progress = true;

    setTimeout(() => {
      this.progress = false;
    }, 1000);
  }

}
