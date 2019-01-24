import { ElementRef } from '@angular/core';
import { ElementRefMock } from '@terminus/ngx-tools/testing';

import { TsIconButtonComponent } from './icon-button.component';


describe(`TsIconButtonComponent`, function() {
  let elRefMock: ElementRef;
  let component: TsIconButtonComponent;

  beforeEach(() => {
    elRefMock = new ElementRefMock();
    component = new TsIconButtonComponent(
      elRefMock,
    );
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`get hostElement`, () => {

    test(`should return the native element`, () => {
      expect(component.hostElement).toEqual(elRefMock.nativeElement);
    });

  });

});
