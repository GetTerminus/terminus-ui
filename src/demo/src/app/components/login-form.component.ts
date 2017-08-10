import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { TsLoginFormResponse } from '@terminus/ui';

@Component({
  selector: 'demo-login-form',
  template: `
    <ts-login-form
      [inProgress]="progress"
      [resetForm]="reset"
      (submit)="formSubmission($event)"
    ></ts-login-form>
  `,
})
export class LoginFormComponent {
  public progress = false;
  public link = '/reset';
  public reset = false;


  formSubmission(e: TsLoginFormResponse) {
    console.warn('Form value: ', e);
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
