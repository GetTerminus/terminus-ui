import { Injectable } from '@angular/core';


/**
 * Return the native window object
 *
 * @return {Object} window The native window object
 */
function _window(): Window {
  // return the native window object
  return window;
}

/**
 * Define a service that exposes the native window object
 */
@Injectable()
export class TsWindowService {

  /**
   * Return a function that returns the native window object
   *
   * @return {Object} _window The function that returns the native window object
   */
  get nativeWindow(): Window {
    return _window();
  }

}
