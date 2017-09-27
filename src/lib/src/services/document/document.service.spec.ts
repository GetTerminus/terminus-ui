import { DOCUMENT } from '@angular/platform-browser';

import { TsDocumentService } from './document.service';


describe(`TsDocumentService`, () => {

  it(`should return the window object`, () => {
    const service = new TsDocumentService(DOCUMENT);

    expect(service.document).toBeTruthy();
  });

});
