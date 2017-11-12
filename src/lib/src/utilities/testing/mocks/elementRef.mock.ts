import { ElementRef } from '@angular/core';

export class ElementRefMock implements ElementRef {
  nativeElement = {
    innerText: 'foo',
  };
}
