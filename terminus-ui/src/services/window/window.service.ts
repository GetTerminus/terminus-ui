import {
  Injectable,
  isDevMode,
} from '@angular/core';


/**
 * Return the native window object
 *
 * @deprecated
 * @deletion-target 7.0.0
 *
 * @return The native window object
 */
function _window(): Window {
  // return the native window object
  return window;
}

/**
 * Define a service that exposes the native window object
 *
 * @deprecated
 * @deletion-target 7.0.0
 */
@Injectable()
export class TsWindowService {

  /**
   * Return a function that returns the native window object
   *
   * @return The function that returns the native window object
   */
  get nativeWindow(): Window {
    if (isDevMode()) {
      console.warn(
        'TsWindowService has been deprecated and will be removed in `@terminus/ui@7.0.0`.\n' +
        'It can be imported from `@terminus/ngx-tools@^1.5.0`.',
      );
    }

    return _window();
  }

}
