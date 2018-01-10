import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { TsLoginFormResponse } from '@terminus/ui';

@Component({
  selector: 'demo-login-form',
  template: `
    <div>
      <label for="isRedirecting">
        Signal that the user is being redirected (form must be valid):
      </label>
      <input name="isRedirecting" type="checkbox" [(ngModel)]="isRedirecting">
    </div>

    <ts-login-form
      [inProgress]="progress"
      [isRedirecting]="isRedirecting"
      [triggerFormReset]="reset"
      (submit)="formSubmission($event)"
    ></ts-login-form>
  `,
})
export class LoginFormComponent {
  public progress = false;
  public link = '/reset';
  public reset = false;
  public isRedirecting = false;

  formSubmission(e: TsLoginFormResponse) {
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
