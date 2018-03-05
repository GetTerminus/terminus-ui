
import { TsDocumentService } from './document.service';


describe(`TsDocumentService`, () => {

  it(`should return the window object`, () => {
    window.console.warn = jest.fn();
    const service = new TsDocumentService();

    expect(service.document).toBeTruthy();
    expect(window.console.warn).toHaveBeenCalled();
  });

});
