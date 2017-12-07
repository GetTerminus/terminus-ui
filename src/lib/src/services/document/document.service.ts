import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


/**
 * Define a service that exposes the DOCUMENT object
 */
@Injectable()
export class TsDocumentService {

  /**
   * Inject the Angular DOCUMENT
   *
   * @param document The Angular document object
   */
  constructor(
    @Inject(DOCUMENT) public document: any,
  ) {}

}
