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
  getSelection: jasmine.createSpy('getSelection').and.returnValue({
    removeAllRanges: jasmine.createSpy('removeAllRanges'),
    addRange: jasmine.createSpy('addRange'),
  }),
  prompt: jasmine.createSpy('prompt'),
};

@Injectable()
export class TsWindowServiceMock {

  get nativeWindow(): any {
    return windowMock;
  }

}
