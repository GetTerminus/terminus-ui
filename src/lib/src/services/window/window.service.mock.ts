import { Injectable } from '@angular/core';

const windowMock: Window = <any>{
  getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
    getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('static'),
  }),
};

@Injectable()
export class TsWindowServiceMock {

  get nativeWindow(): any {
    return windowMock;
  }

}
