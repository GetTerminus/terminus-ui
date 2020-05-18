import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  TsValidationMessageFactory,
  TsValidationMessagesComponent,
  TsValidationMessagesModule,
} from '@terminus/ui/validation-messages';

@Component({
  template: `
    <ts-validation-messages
      [control]="controlForm"
      [validateOnChange]="validateOnChange"
      [messagesFactory]="myFactory"
    ></ts-validation-messages>
  `,
})
export class Basic {
  controlForm: FormControl | undefined;
  myFactory: TsValidationMessageFactory | undefined;
  validateOnChange = false;

  @ViewChild(TsValidationMessagesComponent, { static: true })
  public validationMessagesComponent!: TsValidationMessagesComponent;

  setFactory() {
    this.myFactory = (a, b) => 'My message.';
  }
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

@Component({
  template: `
    <ts-validation-messages
      [control]="controlForm"
    ></ts-validation-messages>
  `,
})
export class MessageFactory {
  public controlForm: FormControl | undefined;
  myFactory: TsValidationMessageFactory = (a, b) => 'My message.';

  @ViewChild(TsValidationMessagesComponent, { static: true })
  public validationMessagesComponent!: TsValidationMessagesComponent;
}

/**
 * NOTE: Currently all exported Components must belong to a module.
 * So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [TsValidationMessagesModule],
  declarations: [
    Basic,
    TestHostComponent,
    MessageFactory,
  ],
})
export class TsValidationMessagesTestComponentsModule {}
