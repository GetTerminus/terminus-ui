import { Injectable } from '@angular/core';

const windowMock: Window = <any>{
  getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
    getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('static'),
  }),
  open: jasmine.createSpy('open'),
  location: {
    href: 'foo/bar',
  },
  alert: jasmine.createSpy('alert'),
};

@Injectable()
export class TsWindowServiceMock {

  get nativeWindow(): any {
    return windowMock;
  }

}
