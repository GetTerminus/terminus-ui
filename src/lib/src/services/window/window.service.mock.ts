import { Injectable } from '@angular/core';

const windowMock: Window = <any>{};

@Injectable()
export class TsWindowServiceMock {

  get nativeWindow(): any {
    return windowMock;
  }

}
