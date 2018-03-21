import {
  TsWindowServiceMock,
  TsDocumentServiceMock,
  ElementRefMock,
} from '@terminus/ngx-tools/testing';
import { noop } from '@terminus/ngx-tools';

import { TsCopyComponent } from './copy.component';


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


    it(`should select the text within the passed in element`, () => {
      this.component.window.getSelection = jest.fn().mockReturnValue({
        removeAllRanges: noop,
        addRange: noop,
      });

      this.component.document.createRange = jest.fn().mockReturnValue({selectNodeContents: noop});
      this.component.selectText(this.component.content.nativeElement, false, false);

      expect(this.component.window.getSelection).toHaveBeenCalled();
      expect(this.component.document.createRange).toHaveBeenCalled();
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
        focus: jest.fn(),
        remove: jest.fn(),
        setSelectionRange: jest.fn(),
      };
      this.component.document.createElement = jest.fn().mockReturnValue(MOCK_TEXTAREA);
    });


    it(`should set the text to the clipboard`, () => {
      this.component.document.body.appendChild = jest.fn();
      this.component.document.execCommand = jest.fn();
      this.component.copyToClipboard('foo');

      expect(this.component.document.createElement).toHaveBeenCalledWith('textarea');
      expect(this.component.document.body.appendChild).toHaveBeenCalled();
      expect(this.component.document.execCommand).toHaveBeenCalledWith('copy');
      expect(this.component.document.execCommand).toHaveBeenCalledWith('copy');
    });


    it(`should fall back to a prompt if execCommand fails`, () => {
      this.component.document.execCommand = () => {
        throw new Error('fake error');
      };
      this.component.window.prompt = jest.fn();

      this.component.copyToClipboard('foo');

      expect(this.component.window.prompt).toHaveBeenCalled();
    });

  });

});
