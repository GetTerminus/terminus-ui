import {
  Injectable,
  isDevMode,
} from '@angular/core';


/**
 * Return the native document object
 *
 * @deprecated
 * @deletion-target 7.0.0
 *
 * @return The native document object
 */
export function _document(): any {
  return document;
}

/**
 * Define a service that exposes the DOCUMENT object
 *
 * @deprecated
 * @deletion-target 7.0.0
 */
@Injectable()
export class TsDocumentService {

  /**
   * Return a function that returns the native document object
   *
   * @return The function that returns the native document object
   */
  get document() {
    if (isDevMode()) {
      console.warn(
        'TsDocumentService has been deprecated and will be removed in `@terminus/ui@7.0.0`.\n' +
        'It can be imported from `@terminus/ngx-tools@^1.5.0`.',
      );
    }

    return _document();
  }

}
