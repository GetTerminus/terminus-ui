import { Injectable } from '@angular/core';


@Injectable()
export class TsDocumentServiceMock {

  public document = {
    body: {
      createTextRange: jasmine.createSpy('createTextRange'),
      appendChild: jasmine.createSpy('appendChild'),
    },
    createRange: jasmine.createSpy('createRange').and.returnValue({
      selectNodeContents: jasmine.createSpy('selectNodeContents'),
    }),
    execCommand: jasmine.createSpy('execCommand'),
    createElement: jasmine.createSpy('createElement'),
  };

}
