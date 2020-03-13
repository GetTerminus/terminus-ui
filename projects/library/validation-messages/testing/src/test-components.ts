import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  TsValidationMessagesComponent,
  TsValidationMessagesModule,
} from '@terminus/ui/validation-messages';

@Component({
  template: `
    <ts-validation-messages
      [control]="controlForm"
      [validateOnChange]="validateOnChange"
    ></ts-validation-messages>
  `,
})
export class Basic {
  public controlForm: FormControl | undefined;
  public validateOnChange = false;

  @ViewChild(TsValidationMessagesComponent, { static: true })
  public validationMessagesComponent!: TsValidationMessagesComponent;
}

@Component({
  template: `
    <ts-validation-messages
      [control]="controlForm"
      [id]="id"
      [validateImmediately]="validateImmediately"
      [validateOnChange]="validateOnChange"
    ></ts-validation-messages>
  `,
})
export class TestHostComponent {
  public controlForm: FormControl | undefined;
  public id!: string;
  public validateImmediately = false;
  public validateOnChange = false;

  @ViewChild(TsValidationMessagesComponent, { static: true })
  public validationMessagesComponent!: TsValidationMessagesComponent;
}

/**
 * NOTE: Currently all exported Components must belong to a module.
 * So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsValidationMessagesModule,
  ],
  declarations: [
    Basic,
    TestHostComponent,
  ],
})
export class TsValidationMessagesTestComponentsModule {}
