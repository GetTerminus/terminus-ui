import { Injectable } from '@angular/core';


@Injectable()
export class TsValidationMessagesServiceMock {
  getValidatorErrorMessage = () => 'foo';
}
