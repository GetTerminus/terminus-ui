import { Injectable } from '@angular/core';

@Injectable()
export class TsValidationMessagesServiceMock {
  public getValidatorErrorMessage = () => 'foo';
}
