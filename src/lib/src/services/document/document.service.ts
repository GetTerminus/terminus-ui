import { Injectable } from '@angular/core';


/**
 * Return the native document object
 *
 * @return The native document object
 */
export function _document(): any {
  return document;
}

/**
 * Define a service that exposes the DOCUMENT object
 */
@Injectable()
export class TsDocumentService {

  /**
   * Return a function that returns the native document object
   *
   * @return The function that returns the native document object
   */
  get document() {
    return _document();
  }

}
