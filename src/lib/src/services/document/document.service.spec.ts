import { DOCUMENT } from '@angular/platform-browser';

import { TsDocumentService } from '@services/document/document.service';


describe(`TsDocumentService`, () => {

  it(`should return the window object`, () => {
    const service = new TsDocumentService();

    expect(service.document).toBeTruthy();
  });

});
