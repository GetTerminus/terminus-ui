import { Injectable } from '@angular/core';

const windowMock: Window = {
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
  // Note: mocking setTimeout/clearTimeout here makes it very hard to test items that use
  // setTimeout. It seems to be easier to add these two spies as needed.
} as any;

@Injectable()
export class TsWindowServiceMock {

  get nativeWindow(): Window {
    return windowMock;
  }

}
