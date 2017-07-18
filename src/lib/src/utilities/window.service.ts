import { Injectable } from '@angular/core';

function _window(): any {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowService {

  /**
   * Return the native window object
   */
  get nativeWindow(): any {
    return _window();
  }

}
