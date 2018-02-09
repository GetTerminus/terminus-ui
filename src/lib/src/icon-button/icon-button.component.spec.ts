import { ElementRef } from '@angular/core';
import { ElementRefMock } from './../utilities/testing/mocks/elementRef.mock';

import { TsIconButtonComponent } from './icon-button.component';


describe(`TsIconButtonComponent`, () => {
  let elRefMock: ElementRef;

  beforeEach(() => {
    elRefMock = new ElementRefMock();
    this.component = new TsIconButtonComponent(
      elRefMock,
    );
  });


  test(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`get hostElement`, () => {

    test(`should return the native element`, () => {
      expect(this.component.hostElement).toEqual(elRefMock.nativeElement);
    });

  });

});
