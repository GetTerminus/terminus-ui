import { Injectable } from '@angular/core';


@Injectable()
export class TsValidationMessageServiceMock {

  getValidatorErrorMessage = jasmine.createSpy('getValidatorErrorMessage');

}
