import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


/**
 * Define a service that exposes the native window object
 */
@Injectable()
export class TsDocumentService {

  constructor(
    @Inject(DOCUMENT) public document: any,
  ) {}

}
