import { Injectable } from '@angular/core';

const windowMock: Window = <any>{};

@Injectable()
export class WindowServiceMock {

  get nativeWindow(): any {
    return windowMock;
  }

}
