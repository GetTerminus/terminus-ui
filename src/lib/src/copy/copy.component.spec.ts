import {
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TsCopyComponent } from './copy.component';
import { TsWindowServiceMock } from '../services/window/window.service.mock';
import { TsDocumentServiceMock } from '../services/document/document.service.mock';
import { ElementRefMock } from '../utilities/testing/mocks/elementRef.mock';


describe(`TsCopyComponent`, () => {

  beforeEach(() => {
    this.component = new TsCopyComponent(
      new TsDocumentServiceMock(),
      new TsWindowServiceMock(),
    );
    this.component.content = new ElementRefMock();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`get textContent()`, () => {

    it(`should return the content if accessible`, () => {
      this.component.content.nativeElement.innerText = 'foo';

      expect(this.component.textContent).toEqual('foo');
    });


    it(`should return an empty string if the content is not accessible`, () => {
      this.component.content.nativeElement.innerText = null;

      expect(this.component.textContent).toEqual('');
    });

  });


  describe(`selectText()`, () => {

    it(`should return false if disabled`, () => {
      expect(this.component.selectText(this.component.content, false, true)).toEqual(false);
    });


    it(`should return if already selected`, () => {
      expect(this.component.selectText(this.component.content, true, false)).toEqual(false);
    });


    // TODO: The integration test for this will actually test the functionality.
    it(`should select the text within the passed in element`, () => {
      this.component.selectText(this.component.content, false, false);

      const result = this.component.selectText(this.component.content.nativeElement, false, false);

      expect(this.component.window.getSelection).toHaveBeenCalled();
      expect(this.component.documentService.document.createRange).toHaveBeenCalled();
      expect(this.component.hasSelected).toEqual(true);
    });

  });


  describe(`resetSelection()`, () => {

    it(`should set the flag to false`, () => {
      this.component.hasSelected = true;

      expect(this.component.hasSelected).toEqual(true);

      this.component.resetSelection();
      expect(this.component.hasSelected).toEqual(false);
    });

  });


  describe(`copyToClipboard()`, () => {

    beforeEach(() => {
      // NOTE: I tried letting the mock return this value, but could not get the value returned for
      // some reason.
      const MOCK_TEXTAREA = {
        className: '',
        style: {},
        textContent: '',
        value: 'foo',
        focus: jasmine.createSpy('focus'),
        remove: jasmine.createSpy('remove'),
        setSelectionRange: jasmine.createSpy('setSelectionRange'),
      };
      this.component.documentService.document.createElement =
        jasmine.createSpy('createElement').and.callFake(() => {
          return MOCK_TEXTAREA;
        });
    });


    it(`should set the text to the clipboard`, () => {
      this.component.documentService.document.execCommand = jasmine.createSpy('execCommand');
      this.component.copyToClipboard('foo');

      expect(this.component.documentService.document.createElement).toHaveBeenCalledWith('textarea');
      expect(this.component.documentService.document.body.appendChild).toHaveBeenCalled();
      expect(this.component.documentService.document.execCommand).toHaveBeenCalledWith('copy');
      expect(this.component.documentService.document.execCommand).toHaveBeenCalledWith('copy');
    });


    it(`should fall back to a prompt if execCommand fails`, () => {
      this.component.documentService.document.execCommand = () => {
        throw new Error('fake error');
      }

      this.component.copyToClipboard('foo');

      expect(this.component.window.prompt).toHaveBeenCalled();
    });

  });

});
